/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { hooks } from '@repo/utils'


const LoadableContext = createContext<{}>(undefined as any)

export const LoadableCmsProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children
}) => { 
    const router = useRouter()
    const findUrlKey = hooks.useApiCallBack(async (api, contentKey: string) => await api.cms.filterMechanism(contentKey))
    const getCmsCurrentScreen = hooks.useApiCallBack(api => api.cms.cmsCurrentScreen())
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
        await getCmsCurrentScreen.execute()
        .then(async (screen) => {
            const res = await findUrlKey.execute(screen.data)
            const urlPath = res.data
            if (urlPath !== router.asPath) {
                router.push(urlPath);
            }
        })
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