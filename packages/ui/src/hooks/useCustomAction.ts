import { useRouter } from "next/router"


type CustomActionArgument = {
    linkKey?: string
    pageKey?: string
    actionParam?: string
    shouldNavigate?: boolean
}

export type CustomActionHook = (args?: CustomActionArgument) => {
    execute(): void | Promise<unknown>
    loading: boolean;
    disabled?: boolean;
    node?: React.ReactNode
}

interface Props {
    linkKey?: string
    pageKey?: string
    actionKey?: string
    shouldNavigate?: boolean
}

export const useCustomAction = ({
    actionKey,
    linkKey,
    pageKey,
    shouldNavigate
}: Props): ReturnType<CustomActionHook> | undefined => {
    const [actionName, actionParam] = actionKey?.split(':') || []

    switch(actionName){
        case 'form-saving-action':
            return;
        default:
            break;
    }
    if(shouldNavigate && linkKey){
        const router = useRouter()
        return {
            execute: () => router.push(linkKey), loading: true
        }
    }
    return undefined;
}