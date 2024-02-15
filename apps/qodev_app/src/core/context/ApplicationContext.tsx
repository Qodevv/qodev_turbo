/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MenuItems, ParsedContent } from "@repo/utils/context";
import { hooks } from "@repo/utils";
import { useRouter } from "../router";

type AppContextValue = {
  cms: PreloadedCmsType[];
  loading?: boolean;
  pageContents: ParsedContent[];
  setLoader: any;
  menus: MenuItems[];
};

export type PreloadedCmsType = {
  pageKey: string;
  content: string;
  path: string;
  access: number;
  isDisabled: number;
};

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const [cms, setCms] = useState<PreloadedCmsType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [contents, setContents] = useState<ParsedContent[]>([]);
  const [menus, setMenus] = useState<MenuItems[]>([]);
  const loadCms = hooks.useApiCallBack(
    async (
      api,
      args: {
        currentKey: string;
      }
    ) => await api.cms.filterCms(args)
  );

  const preloadCms = () => {
    if (router.asPath === "/") {
      const result = loadCms.execute({ currentKey: "/home" });
      result.then((res) => {
        if (res.data.length > 0) {
          res.data.map((item: any) => {
            const parsedContents: ParsedContent[] = JSON.parse(item.content);
            const deepParsedContents =
              parsedContents.length > 0 &&
              (parsedContents.map((item: ParsedContent) => {
                return {
                  header: item.header,
                };
              }) as any);
            const menuItems =
              deepParsedContents?.length > 0 &&
              deepParsedContents.map((i: ParsedContent) => {
                return {
                  menus: i.header.elements.menus,
                };
              });
            setMenus(menuItems[0].menus);
            setCms(res.data);
            setContents(parsedContents);
          });
        } else {
          setLoader(false);
          setContents([]);
          setCms([]);
        }
      });
    } else {
      const result = loadCms.execute({ currentKey: router.asPath });
      result.then((res) => {
        if (res.data.length > 0) {
          res.data.map((item: any) => {
            const parsedContents: ParsedContent[] = JSON.parse(item.content);
            const deepParsedContents =
              parsedContents.length > 0 &&
              (parsedContents.map((item: ParsedContent) => {
                return {
                  header: item.header,
                };
              }) as any);
            const menuItems =
              deepParsedContents?.length > 0 &&
              deepParsedContents.map((i: ParsedContent) => {
                return {
                  menus: i.header.elements.menus,
                };
              });
              console.log(parsedContents)
            setMenus(menuItems[0].menus);
            setCms(res.data);
            setContents(parsedContents);
          });
        } else {
          setContents([]);
          setCms([]);
        }
      });
    }
  };

  useEffect(() => {
    preloadCms();
  }, []);

  useEffect(() => {
    const changeCmsRouter = async () => {
      preloadCms();
    };
    router.events.on("routeChangeStart", changeCmsRouter);

    return () => {
      router.events.off("routeChangeStart", changeCmsRouter);
    };
  }, [router]);

  return (
    <ApplicationContext.Provider
      value={{
        cms,
        loading: loader,
        pageContents: contents,
        setLoader,
        menus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  if (!ApplicationContext) {
    throw new Error("Application context must used.");
  }
  return useContext(ApplicationContext);
};
