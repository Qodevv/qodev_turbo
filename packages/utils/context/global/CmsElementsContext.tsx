import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { Elements, Labels, ParsedContent } from "..";

type CmsValue = {
  buttonByKey(key: string): any;
  labelByKey(key: string): any;
};

const CmsElementsContext = createContext<CmsValue>({
  buttonByKey: () => undefined,
  labelByKey: () => undefined,
});

type PreloadedCmsType = {
  pageKey: string;
  content: string;
  path: string;
  access: number;
  isDisabled: number;
};

interface Props {
  globals: PreloadedCmsType[];
}

export const CmsElementProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  globals,
}) => {
  const parsedCms: ParsedContent[] =
    globals.length > 0 &&
    (globals
      .map((item) => {
        return JSON.parse(item.content || "[]");
      })
      .flat() as any);

  const parsedGlobals = useMemo(() => {
    if (parsedCms.length > 0) {
      const cms = parsedCms[0];
      if (cms?.elements) {
        return {
          buttons: parseContentButtons(cms.elements.buttons),
          labels: parseContentLabels(cms.elements.labels),
        };
      }
    }
    return {
      buttons: [],
      labels: [],
    };
  }, [parsedCms]);

  const buttonByKey = useCallback(
    (key: string) =>
      parsedGlobals.buttons?.find(
        (b) => b.key?.toLowerCase() === key.toLowerCase()
      ) || { text: `${key}` },
    [parsedGlobals.buttons]
  );

  const labelByKey = useCallback(
    (key: string) => {
      const label = parsedGlobals.labels?.find(
        (l) => l.key?.toLowerCase() === key.toLowerCase()
      )?.value;
      if (label === undefined || label === null) {
        return `[[${key}]]`;
      }
      return `${label}`;
    },
    [parsedGlobals.labels]
  );

  return (
    <CmsElementsContext.Provider
      value={{
        buttonByKey,
        labelByKey,
      }}
    >
      {children}
    </CmsElementsContext.Provider>
  );
};

export const useCmsElementsContext = () => {
  if (!CmsElementsContext) {
    throw new Error("Cms element must be used.");
  }
  return useContext(CmsElementsContext);
};

const parseContentButtons = (buttons: Elements["buttons"]) =>
  buttons?.map((button) => ({
    text: button.buttonElement.value,
    linkKey: button.pageUrl,
    type: button.buttonType,
    size: button.size,
    variant: button.variant,
    loading: button.loading,
    key: button.buttonElement.key,
  }));

const parseContentLabels = (labels: Elements["labels"]) =>
  labels?.map<Labels>((label) => ({
    key: label.key,
    value: label.value,
  }));
