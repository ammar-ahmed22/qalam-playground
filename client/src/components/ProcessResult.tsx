import InfoBox from "./InfoBox";

export type ProcessResultProps = {
  stdout?: string;
  stderr?: string;
};

export default function ProcessResult({ stdout, stderr }: ProcessResultProps) {
  return (
    <div className="flex flex-col gap-4">
      {stderr && (
        <InfoBox
          as="pre"
          status="danger"
          className="whitespace-pre-wrap break-words"
        >
          <code>{stderr}</code>
        </InfoBox>
      )}
      {stdout && (
        <InfoBox
          as="pre"
          status="success"
          className="whitespace-pre-wrap break-words"
        >
          <code>{stdout}</code>
        </InfoBox>
      )}
    </div>
  );
}
