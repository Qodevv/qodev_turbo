import { createContext, useCallback, useContext, useEffect, useMemo } from "react";

import { ButtonsValues, Elements, ParsedContent } from "..";

type CmsValue = {
    buttonByKey(key: string): any
}

const CmsElementsContext = createContext<CmsValue>({
    buttonByKey: () => undefined
})

type PreloadedCmsType = {
    pageKey: string
    content: string
    path: string
    access: number
    isDisabled: number
};

interface Props {
    globals: PreloadedCmsType[]
}

export const CmsElementProvider: React.FC<React.PropsWithChildren<Props>> = ({
    children, globals
}) => {
    const parsedCms: ParsedContent[] = globals.length > 0 && globals.map((item) => {
        return JSON.parse(item.content || '[]')
    }).flat() as any

    const parsedGlobals = useMemo(
        () => {
            if(parsedCms.length > 0) {
                const cms = parsedCms[0]
                if(cms?.elements && cms.elements.buttons) {
                    return {
                        buttons: parseContentButtons(cms.elements.buttons)
                    }
                }
            }
            return {
                buttons: []
            }
        },
        [parsedCms]
    );

    const buttonByKey = useCallback(
        (key: string) =>
        parsedGlobals.buttons?.find(b => b.key?.toLowerCase() === key.toLowerCase()) || { text: `${key}`}
        ,
        [parsedGlobals.buttons])

    return (
        <CmsElementsContext.Provider
        value={{
            buttonByKey
        }}
        >{children}</CmsElementsContext.Provider>
    )
}

export const useCmsElementsContext = () => {
    if(!CmsElementsContext){
        throw new Error('Cms element must be used.')
    }
    return useContext(CmsElementsContext)
}

const parseContentButtons = (buttons: Elements['buttons']) =>
        buttons?.map(button => ({
            text: button.buttonKey,
            linkKey: button.pageUrl,
            type: button.buttonType,
            size: button.size,
            variant: button.variant,
            loading: button.loading,
            key: button.buttonKey
        }))