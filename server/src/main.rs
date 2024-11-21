#[macro_use]
extern crate rocket;

use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Request;
use rocket_cors::{AllowedOrigins, Cors, CorsOptions};
use std::process::Command;

#[derive(Serialize, Deserialize, Debug)]
struct Code {
    raw: String,
}

#[derive(Serialize, Deserialize)]
struct ProcessOutput {
    stdout: Option<String>,
    stderr: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct ErrorResponse {
    error: String,
    details: Option<String>,
}

#[get("/health")]
fn health() -> Json<serde_json::Value> {
    return Json(serde_json::json!({
        "status": "ok"
    }));
}

#[post("/run", format = "json", data = "<code>")]
fn run_code(code: Json<Code>) -> Json<ProcessOutput> {
    let code = code.into_inner();
    let output = Command::new("qalam")
        .arg("--raw")
        .arg(&code.raw)
        .output()
        .expect("Failed to execute command"); // NOTE may want to handle this explicitly if the server its running doesn't have qalam for example
    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);

    return Json(ProcessOutput {
        stdout: Some(stdout.to_string()),
        stderr: Some(stderr.to_string()),
    });
}

#[catch(404)]
fn not_found(req: &Request) -> Json<ErrorResponse> {
    return Json(ErrorResponse {
        error: "Resource not found".to_string(),
        details: Some(format!("No route found for {}", req.uri())),
    });
}

#[catch(422)]
fn unprocessable(_: &Request) -> Json<ErrorResponse> {
    return Json(ErrorResponse {
        error: "The request was well-formed but was unable to be followed due to semantic errors"
            .to_string(),
        details: None,
    });
}

fn cors_midlleware() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&["http://localhost:3000"]);
    CorsOptions {
        allowed_origins,
        allowed_methods: ["GET", "POST", "PUT", "DELETE"]
            .iter()
            .map(|s| s.parse().unwrap())
            .collect(),
        allowed_headers: rocket_cors::AllowedHeaders::some(&["Authorization", "Content-Type"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("Error generating CORS middleware")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![health, run_code])
        .register("/", catchers![not_found, unprocessable])
        .attach(cors_midlleware())
}
