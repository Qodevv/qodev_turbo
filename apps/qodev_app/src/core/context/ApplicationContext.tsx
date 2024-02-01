/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthorizedBlock, Elements, ParsedContent, UnauthorizedBlock } from "@repo/utils/context";
import { hooks } from '@repo/utils'
import { useRouter } from "next/router";

type AppContextValue = {
    cms: PreloadedCmsType[];
    loading?: boolean
    pageContents: ParsedContent[]
    setLoader: any
};



export type PreloadedCmsType = {
    pageKey: string
    content: string
    path: string
    access: number
    isDisabled: number
};
  

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const router = useRouter()
    const [cms, setCms] = useState<PreloadedCmsType[]>([]);
    const [loader, setLoader] = useState<boolean>(true)
    const [contents, setContents] = useState<ParsedContent[]>([])
    const loadCms = hooks.useApiCallBack(async (api, args: {
        currentKey: string
    }) => await api.cms.filterCms(args))

    

    const preloadCms = () => {
        if(router.asPath === "/") {
            const result = loadCms.execute({ currentKey: "/home" })
            result.then(res => {
                if(res.data.length > 0){
                    res.data.map((item: any) => {
                        const parsedContents: ParsedContent[] = JSON.parse(item.content)
                        
                        setCms(res.data)
                        setContents(parsedContents)
                    })
                } else {
                    setLoader(false)
                    setContents([])
                    setCms([])
                }
        })
        } else {
            const result = loadCms.execute({ currentKey: router.asPath })
            result.then(res => {
                if(res.data.length > 0){
                    res.data.map((item: any) => {
                        const parsedContents: ParsedContent[] = JSON.parse(item.content)
                        setCms(res.data)
                        setContents(parsedContents)
                    })
                } else {
                    setContents([])
                    setCms([])
                }
        })
        }
    }

    useEffect(() => {
        preloadCms()
    }, [])

    useEffect(() => {
        const changeCmsRouter = async () => {
            preloadCms()
        }
        router.events.on('routeChangeStart', changeCmsRouter)

        return () => {
            router.events.off('routeChangeStart', changeCmsRouter)
        }
    }, [router])

    

    return (
        <ApplicationContext.Provider value={{
             cms, loading: loader, pageContents: contents, setLoader
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const useApplicationContext = () => {
    if (!ApplicationContext) {
      throw new Error("Application context must used.");
    }
    return useContext(ApplicationContext);
};