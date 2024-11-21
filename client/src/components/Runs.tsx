import { useEffect, useState } from "react";
import type { ProcessOutput, Run } from "../utils/types";
import { Accordion, AccordionItem, Chip, Selection } from "@nextui-org/react";
import { format } from "date-fns";
import ProcessResult from "./ProcessResult";

export type RunsProps = {
  runs: Run[];
  onlyLatest?: boolean;
};

const formatString = "@ hh:mm:ss:SS aa yyyy/MM/dd";

type StatusColor = "success" | "danger" | "warning";

type StatusDisplay = "Success" | "Error" | "Runtime Error";

export default function Runs({ runs, onlyLatest }: RunsProps) {
  const genKey = (run: Run, idx: number) => {
    return `qalampg-run-result-${run.receivedAt.getTime()}-${idx}`;
  };

  const allKeys = runs.map((r, i) => genKey(r, i));
  const [keys, setKeys] = useState<Selection>(new Set(allKeys));

  useEffect(() => {
    setKeys(new Set(runs.map((r, i) => genKey(r, i))));
  }, [runs]);

  const status = (output: ProcessOutput): [StatusColor, StatusDisplay] => {
    const { stderr, stdout } = output;
    if (!stderr && !stdout) {
      return ["success", "Success"];
    }

    if (!stderr && stdout) {
      return ["success", "Success"];
    }

    if (stderr && !stdout) {
      return ["danger", "Error"];
    }

    if (stderr && stdout) {
      return ["warning", "Runtime Error"];
    }
    return ["warning", "Runtime Error"];
  };

  if (runs.length === 0) {
    return <></>;
  }

  if (onlyLatest || runs.length === 1) {
    const [run] = runs;
    const { receivedAt, output } = run;
    const { stderr, stdout } = output;
    const [color, statusDisplay] = status(output);
    return (
      <div className="border-medium border-divider px-4 rounded-medium ">
        <div className="py-2">
          <div className="flex py-4 gap-3 items-center">
            <Chip color={color} variant="flat" size="sm">
              {statusDisplay}
            </Chip>
            <span className="text-default-500 text-sm">
              {format(receivedAt, formatString)}
            </span>
          </div>
          <div className="py-2">
            <ProcessResult stdout={stdout} stderr={stderr} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <Accordion
      selectionMode="multiple"
      variant="bordered"
      itemClasses={{
        title: "text-default-500 text-md",
      }}
      selectedKeys={keys}
      onSelectionChange={setKeys}
    >
      {runs.map((run, idx) => {
        const { receivedAt, output } = run;
        const { stdout, stderr } = output;
        const [color, statusDisplay] = status(output);
        return (
          <AccordionItem
            key={genKey(run, idx)}
            subtitle={format(receivedAt, formatString)}
            className="py-2"
            startContent={
              <Chip color={color} variant="flat" size="sm">
                {statusDisplay}
              </Chip>
            }
          >
            <ProcessResult stdout={stdout} stderr={stderr} />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
