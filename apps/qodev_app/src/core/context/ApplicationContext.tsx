/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { createContext, useContext, useEffect, useState } from "react";
import { AuthorizedBlock, UnauthorizedBlock } from "../types/cms";
import { hooks } from '@repo/utils'
import { useRouter } from "next/router";

type AppContextValue = {
    cms: PreloadedCmsType[];
    loading?: boolean
    pageContents: ParsedContent[]
    setLoader: any
};

export type ParsedContent = {
    matchKey: string
    path: string
    hasAuthorizedBlock: number
    authorizedBlock: AuthorizedBlock[]
    unauthorizedBlock: UnauthorizedBlock[]
    hasLoading: number
    hasContainer: number
}

export type PreloadedCmsType = {
    contentKey: string
    content: string
    path: string
    access: number
    currentScreen: number
    isDisabled: number
};
  

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const router = useRouter()
    const [cms, setCms] = useState<PreloadedCmsType[]>([]);
    const [loader, setLoader] = useState<boolean>(false)
    const [contents, setContents] = useState<ParsedContent[]>([])
    const proceedPageNotFound = hooks.useApiCallBack(api => api.cms.updateToPageNotFound())
    const lookCmsPaths = hooks.useApiCallBack(
        async (api, args: { currentKey: string }) => await api.cms.findCmsPaths(args)
    )
    const loadCms = hooks.useApiCallBack(async (api, contentKey: string) => await api.cms.filterCms(contentKey))
    const getCmsCurrentScreen = hooks.useApiCallBack(api => api.cms.cmsCurrentScreen())
    const changeCmsScreen = hooks.useApiCallBack(
        async (api, args:{ currentKey: string }) => await api.cms.cmsChangeScreen(args)
    )
    const preloadCms = () => {
        getCmsCurrentScreen.execute()
        .then(screen => {
            const result = loadCms.execute(screen.data)
            result.then(res => {
                setCms(res.data)
                res.data.length > 0 && res.data.map((item: any) => {
                    const parsedContents: ParsedContent[] = JSON.parse(item.content)
                    parsedContents.length > 0 && parsedContents.map((pcms) => {
                        if(pcms.hasLoading === 1) {
                            setLoader(!loader)
                        }
                    })
                    setContents(parsedContents)
                })
            })
        })
    }

    useEffect(() => {
        const changeCmsRouter = async () => {
            try {
                console.log(router.asPath)
                lookCmsPaths.execute({ currentKey: router.asPath })
                .then(async (res) => {
                    if(!res.data) {
                        proceedPageNotFound.execute()
                        preloadCms()
                    } else {
                       console.log(res.data)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        router.events.on('routeChangeStart', changeCmsRouter)

        return () => {
            router.events.off('routeChangeStart', changeCmsRouter)
        }
    }, [router])
    
    useEffect(() => {
        preloadCms()
    }, [])

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