export type Rule = {
  validate: (value: string) => string | undefined;
  message: string;
  name: string;
};
