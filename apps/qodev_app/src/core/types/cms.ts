import { ReactElement } from "react"

export type CmsDto = {
    path: string
    contentKey: string
    access: number
    hasLoading: number
    isAccountSetup: number
}

export interface CmsGlobals {
    contentBlocks?: ContentBlocks[] | null | undefined
    appSetup: boolean | undefined
}

export interface ContentBlocks {
    access: number;
    contentKey: string;
    hasLoading: number;
    id: number;
    isAccountSetup: number;
    path: string;
    created_at: Date;
    updated_at: Date;
}

export interface AuthorizedBlock {
    htmlBlockId: number
    htmlBlock: any 
    htmlBlockType: string
}

export interface UnauthorizedBlock {
    htmlBlockId: number
    htmlBlock: any 
    htmlBlockType: string
}

export type PreloadedGlobals = CmsGlobals