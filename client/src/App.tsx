// UI Components
import { Card, Button, Checkbox } from "@nextui-org/react";
import { CommandLineIcon, TrashIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaRust } from "react-icons/fa6";

// Types
import type { Run, ProcessOutput } from "./utils/types";

// Helpers
import { useState, useEffect } from "react";
import { useLazyFetch } from "./hooks/fetch";

// Components
import Editor from "./components/Editor";
import Runs from "./components/Runs";
import ExampleLoader from "./components/ExampleLoader";

// Assets
import fullLogo from "./assets/QalamFullLogo.png";

// Constants
// eslint-disable-next-line
import defaultCode from "!!raw-loader!./examples/hello.qlm";

export default function App() {
  const [code, setCode] = useState(defaultCode);
  const [runs, setRuns] = useState<Run[]>([]);
  const [onlyLatest, setOnlyLatest] = useState(false);

  const [runCode, { data, loading, error }] = useLazyFetch<ProcessOutput>({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://server-purple-silence-4345.fly.dev"}/run`,
  });

  const handleRun = () => {
    runCode({
      data: {
        raw: code,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setRuns((prev) => {
        let copy = [...prev];
        copy.unshift({
          receivedAt: new Date(),
          output: data,
        });
        return copy;
      });
    }
    if (error) {
      setRuns((prev) => {
        let copy = [...prev];
        copy.unshift({
          receivedAt: new Date(),
          output: {
            stderr: error.message,
          },
        });
        return copy;
      });
    }
  }, [data, error]);

  useEffect(() => {
    const handleKeydown = (ev: KeyboardEvent) => {
      if (ev.metaKey && ev.key === "r") {
        ev.preventDefault();
        if (!loading) handleRun();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="h-screen p-4 flex flex-col gap-4 w-full">
      <div className="w-full h-10 flex items-center gap-1 justify-between">
        <div className="flex gap-2 items-center">
          <div className="size-8">
            <img
              src={fullLogo}
              alt="Example"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-0">
            <span className="font-bold">Qalam Playground</span>
            <span className="text-xs">
              Made with 🧠 by{" "}
              <a
                href="https://ammarahmed.ca"
                target="_blank"
                className="hover:underline text-[#6A7864]"
              >
                Ammar
              </a>
            </span>
          </div>
        </div>
        <div className="flex">
          <Button
            variant="light"
            isIconOnly
            size="sm"
            as="a"
            href="https://github.com/ammar-ahmed22/qalam"
            target="_blank"
          >
            <FaGithub className="size-4" />
          </Button>
          <Button
            variant="light"
            isIconOnly
            size="sm"
            as="a"
            href="https://crates.io/crates/qalam"
            target="_blank"
          >
            <FaRust className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 h-full gap-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <ExampleLoader onSelect={setCode} />
            </div>
            <Button
              endContent={<p>⌘ R</p>}
              variant="faded"
              color="success"
              size="sm"
              onPress={handleRun}
              isLoading={loading}
            >
              Run
            </Button>
          </div>
          <Editor
            value={code}
            onChange={setCode}
            height="calc(100vh - 11rem)"
          />
        </Card>
        <Card className="p-4 h-full gap-4">
          <h2 className="text-lg flex items-center gap-2">
            <CommandLineIcon className="size-5" />
            <span>Result</span>
          </h2>
          <div className="flex justify-end gap-2">
            <Checkbox
              size="sm"
              classNames={{
                label: "font-bold text-tiny",
              }}
              isSelected={onlyLatest}
              onValueChange={setOnlyLatest}
            >
              Show Only Latest
            </Checkbox>
            <Button
              size="sm"
              variant="light"
              startContent={<TrashIcon className="size-4" />}
              onPress={() => setRuns([])}
            >
              Clear History
            </Button>
          </div>
          <Runs runs={runs} onlyLatest={onlyLatest} />
        </Card>
      </div>
    </div>
  );
}
