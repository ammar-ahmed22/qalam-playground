# Stage 1: Use cargo-chef to prepare the build environment
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
WORKDIR /app

# Stage 2: Create a dependency recipe for caching
FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

# Stage 3: Build the application and dependencies
FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
# Build dependencies (caching layer)
RUN cargo chef cook --release --recipe-path recipe.json
# Build the application
COPY . .
RUN cargo build --release --bin server
# Install the qalam binary
RUN cargo install qalam

# Stage 4: Runtime image
FROM debian:bookworm-slim AS runtime
WORKDIR /app
# Copy the compiled server binary
COPY --from=builder /app/target/release/server /usr/local/bin
# Copy the qalam binary
COPY --from=builder /usr/local/cargo/bin/qalam /usr/local/bin
# Ensure the PATH includes /usr/local/bin
ENV PATH="/usr/local/bin:${PATH}"
# Set the entry point to the server binary
ENTRYPOINT ["/usr/local/bin/server"]

