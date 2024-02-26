type CustomActionArgument = {
  linkKey?: string;
  pageKey?: string;
};

export type CustomActionHook = (args?: CustomActionArgument) => {
  execute(): void | Promise<unknown>;
  loading: boolean;
  disabled?: boolean;
  disableFurtherActions?: boolean;
  node?: React.ReactNode;
};
