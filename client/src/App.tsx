// UI Components
import { Card, Button, Checkbox, Kbd } from "@nextui-org/react";
import {
  PlayIcon,
  CommandLineIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

// Types
import type { Run, ProcessOutput } from "./utils/types";

// Helpers
import { useState, useEffect } from "react";
import { useLazyFetch } from "./hooks/fetch";

// Components
import Editor from "./components/Editor";
import Runs from "./components/Runs";

// Assets
import logo from "./assets/QalamLogo.png";

// Constants
const defaultCode = `shai name = "Ammar";\nqul("Assalamu alaikum, " + name + "!");`;

export default function App() {
  const [code, setCode] = useState(defaultCode);
  const [runs, setRuns] = useState<Run[]>([]);
  const [onlyLatest, setOnlyLatest] = useState(false);

  const [runCode, { data, loading, error }] = useLazyFetch<ProcessOutput>({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:8000/run",
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
      if (ev.metaKey && ev.key === "Enter") {
        ev.preventDefault();
        if (!loading) handleRun();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [loading, handleRun]);

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 h-full gap-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="size-8">
                <img
                  src={logo}
                  alt="Example"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="font-bold">Qalam Playground</span>
            </div>
            <Button
              endContent={<p>⌘↵</p>}
              variant="faded"
              color="success"
              size="sm"
              onPress={handleRun}
              isLoading={loading}
            >
              Run
            </Button>
          </div>
          <Editor value={code} onChange={setCode} height="calc(100vh - 7rem)" />
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
              Show Only latest
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
