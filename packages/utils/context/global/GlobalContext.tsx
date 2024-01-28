/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { createContext, useContext, useEffect, useState } from 'react'
import { NextRouter, useRouter as useNextRouter } from 'next/router';

type GlobalContextValue = {

}

const GlobalContext = createContext<GlobalContextValue>(undefined as any)

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    if(!GlobalContext) {
        throw new Error('Global Context must be used.')
    }
    return useContext(GlobalContext)
}