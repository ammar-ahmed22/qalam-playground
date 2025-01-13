// UI Components
import { Card, Button, Input } from "@nextui-org/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

// Helpers
import { useRef, useState } from "react";
import domtoimage from "dom-to-image";

// Components
import Editor from "./Editor";

const defaultCode = `kaam salam(naam) {
    agar(nahi naam) {
        bolo("Salam, dost!")
    } warna {
        bolo("Salam, " + naam + "!")
    }
}

rakho naam = "Ammar";
salam(khali);
salam(naam);`;

export default function Picture() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [code, setCode] = useState(defaultCode);
  const [filename, setFilename] = useState("");
  const [scalingFactor, setScalingFactor] = useState(4);
  const handleDownload = async () => {
    if (ref.current) {
      const el = ref.current;
      const dataUrl = await domtoimage.toPng(el, {
        width: ref.current.clientWidth * scalingFactor,
        height: ref.current.clientHeight * scalingFactor,
        style: {
          transform: `scale(${scalingFactor})`,
          transformOrigin: "top left",
        },
      });
      const link = document.createElement("a");
      link.download =
        filename === ""
          ? "qalam.png"
          : filename.endsWith(".png")
            ? filename
            : filename + ".png";
      link.href = dataUrl;
      link.click();
    }
  };
  return (
    <div className="min-h-screen p-4 flex flex-col gap-4 w-full justify-center items-center">
      <Card ref={ref} className="p-4 gap-4 min-w-[600px]">
        <div className="flex gap-2">
          <div className="size-3 bg-danger rounded-full" />
          <div className="size-3 bg-warning rounded-full" />
          <div className="size-3 bg-success rounded-full" />
        </div>
        <Editor value={code} onChange={setCode} />
      </Card>
      <div className="flex items-end gap-4 ">
        <Input
          placeholder="qalam.png"
          label="File name"
          variant="underlined"
          value={filename}
          onValueChange={setFilename}
        />
        <Button isIconOnly variant="light" onPress={handleDownload}>
          <ArrowDownTrayIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
