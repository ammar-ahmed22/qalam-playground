// UI Components
import { Card, Button } from "@nextui-org/react";
import { PlayIcon, CommandLineIcon } from "@heroicons/react/24/solid";

// Types
import type { Run, ProcessOutput } from "./utils/types";

// Helpers
import { useState, useEffect } from "react";
import { useLazyFetch } from "./hooks/fetch";

// Components
import Editor from "./components/Editor";
import Runs from "./components/Runs";

// Constants
const defaultCode = `shai name = "Ammar";\nqul("Assalamu alaikum, " + name + "!");`;

export default function App() {
  const [code, setCode] = useState(defaultCode);
  const [runs, setRuns] = useState<Run[]>([]);
  // TODO handle errors and loading
  const [runCode, { data }] = useLazyFetch<ProcessOutput>({
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
  }, [data]);

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 h-full gap-4">
          <div className="flex justify-start">
            <Button
              endContent={<PlayIcon className="size-4" />}
              variant="faded"
              color="success"
              size="sm"
              onPress={handleRun}
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
          <Runs runs={runs} onlyLatest />
        </Card>
      </div>
    </div>
  );
}
