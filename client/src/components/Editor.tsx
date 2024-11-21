import CodeEditor, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import qalam from "../utils/qalam/language";
import theme from "../utils/qalam/theme";

export type EditorProps = {
  value: string;
  onChange: (value: string) => void;
} & Omit<ReactCodeMirrorProps, "value" | "onChange" | "extensions" | "theme">;

export default function Editor({
  value,
  onChange,
  basicSetup,
  ...others
}: EditorProps) {
  return (
    <CodeEditor
      value={value}
      onChange={onChange}
      extensions={[qalam]}
      theme={theme}
      basicSetup={
        typeof basicSetup === "boolean"
          ? basicSetup
          : { highlightSelectionMatches: false, ...basicSetup }
      }
      {...others}
    />
  );
}
