import { useState } from "react";
import CodeEditor from "@uiw/react-codemirror";
import qalam from "./utils/qalam/language";
import theme from "./utils/qalam/theme";
import { Card, Button } from "@nextui-org/react";
import { PlayIcon } from "@heroicons/react/24/solid";

const defaultCode = `
kitab Greeter {
  khalaq(name) {
    nafs.name = name;
  }

  greet(times) {
    tawaf(shai i = 0; i < times; i++) {
      qul("Hello " + nafs.name);
    }
  }
}

shai greeter = Greeter("Ammar");
greeter.greet(5);
`;

export default function App() {
  const [code, setCode] = useState(defaultCode);

  return (
    <div className="App h-screen p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 h-full gap-4">
          <div>
            <Button
              endContent={<PlayIcon className="size-4" />}
              variant="faded"
              color="success"
              size="sm"
            >
              Run
            </Button>
          </div>
          <CodeEditor
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
            extensions={[qalam]}
            theme={theme}
            basicSetup={{
              highlightSelectionMatches: false,
            }}
            height="calc(100vh - 7rem)"
          />
        </Card>
        <Card className="p-4 h-full">
          <h2 className="font-bold text-2xl">Output</h2>
        </Card>
      </div>
    </div>
  );
}
