
import { ParsedContent } from "@repo/utils/context";
import { parseContents } from './parse-cms'
import { PreloadedCmsType } from "@/core/context/ApplicationContext";

interface Props {
    preloadedCms: PreloadedCmsType[];
}

export const PageContent: React.FC<Props> = ({
    preloadedCms = [],
}) => {
    if(preloadedCms.length > 0){
        const parsed: any = preloadedCms.length > 0 && preloadedCms.map((item) => {
            return {
                content: JSON.parse(item.content)
            }
        })
        const deserializedCms = parsed.length > 0 && parsed.map((i: any) => {
            return {
                content: i.content
            }
        })
        const key = deserializedCms[0].content?.length > 0 && deserializedCms[0].content.find((cms: ParsedContent) => {
            return cms.contentKey
        })
        const contentBlocks = parseContents(preloadedCms, key?.contentKey)
        return <>{contentBlocks}</>
    } else {
        const contentBlocks = parseContents(preloadedCms, "page-not-found")
        return <>{contentBlocks}</>
    }
}