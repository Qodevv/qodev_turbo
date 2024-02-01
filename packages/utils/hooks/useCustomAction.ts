import { useRouter } from "next/router"
import { CustomActionHook } from "../context/global/types/types"

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