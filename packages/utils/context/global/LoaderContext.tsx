import { createContext, useContext, useEffect, useState } from "react";

const context = createContext<{
  isLoading: boolean;
  setIsLoading(status: boolean): void;
}>(undefined as any);


export const usePageLoaderContext = () => {
    if (!context) {
        throw new Error("PageLoaderContextProvider should be used.");
    }
    return useContext(context);
};

export const PageLoaderContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <context.Provider
      value={{
        isLoading: isLoading,
        setIsLoading,
      }}
    >
      {children}
    </context.Provider>
  );
};