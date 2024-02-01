/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'
import { hooks } from '@repo/utils'
import { Elements, ParsedContent } from "@repo/utils/context";
import { PreloadedCmsType } from "./ApplicationContext";


const LoadableContext = createContext<{}>(undefined as any)

export const LoadableCmsProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children
}) => { 
    const router = useRouter()
    const findUrlKey = hooks.useApiCallBack(async (api, args: { currentKey: string }) => await api.cms.filterMechanism(args))
        
    const consumeRouter = async () => {
        try {
             await reuseScreenInit()
        } catch (error) {
             console.log(error)
        }
     }
    useEffect(() => {
        consumeRouter()
    }, [])
    async function reuseScreenInit() {
        if(router.asPath === "/") {
            const res = await findUrlKey.execute({ currentKey: "/home"})
            const urlPath = res.data
            if(!urlPath) {
                return;
            }
            else{
                if (urlPath !== router.asPath) {
                    router.push(urlPath);
                }
            }
        }else {
            const res = await findUrlKey.execute({ currentKey: router.asPath})
            const urlPath = res.data
            if(!urlPath) {
                return;
            }
            else{
                if (urlPath !== router.asPath) {
                    router.push(urlPath);
                }
            }
        }
    }

    
    return (
        <LoadableContext.Provider
        value={{}}
        >
            {children}
        </LoadableContext.Provider>
    )
}

export const useLoadableCmsContext = () => {
    if(!LoadableContext){
        throw new Error('Loadable cms must be used here.')
    }
    return useContext(LoadableContext)
}