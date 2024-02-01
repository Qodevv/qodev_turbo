
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