export type ProcessOutput = {
  stdout?: string;
  stderr?: string;
};

export type Run = {
  receivedAt: Date;
  output: ProcessOutput;
};
