import { createContext, useContext, useReducer, useState } from "react";

type State = { enabled: boolean; cb?: AsyncFunction };

type Action =
  | { type: "init"; payload: State }
  | { type: "reset" | "enable" | "disable" };

const INITIAL_STATE: State = { enabled: false };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "reset":
      return INITIAL_STATE;
    case "init":
      return { ...state, ...action.payload };
    case "enable":
      return { ...state, enabled: true };
    case "disable":
      return { ...state, enabled: false };
    default:
      throw new Error();
  }
}

const context = createContext<{
  loading: boolean;
  enabled: boolean;
  submit: AsyncFunction;
  reset: VoidFunction;
  enable: VoidFunction;
  disable: VoidFunction;
  init: (payload: State) => void;
}>({} as any);

export const FormSubmissionContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const submitFn = async () => {
    if (!state.cb) {
      throw new Error("No form bound to form-submission-action found");
    }

    setLoading(true);
    await state.cb();
    setLoading(false);
  };

  return (
    <context.Provider
      value={{
        loading,
        enabled: state.enabled,
        submit: submitFn,
        reset: () => dispatch({ type: "reset" }),
        enable: () => dispatch({ type: "enable" }),
        disable: () => dispatch({ type: "disable" }),
        init: (payload: State) => dispatch({ type: "init", payload }),
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useFormSubmissionContext = () => {
  if (!context) {
    throw new Error("FormSubmissionContextProvider should be used");
  }
  return useContext(context);
};
