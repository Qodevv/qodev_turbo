import { Container, Grid } from '@radix-ui/themes'
import { parseContents } from './parse-cms'
import { CmsDto } from '@/core/types/cms'
import { PreloadedCmsType, useApplicationContext } from "@/core/context/ApplicationContext";
import { useRouter } from "@/core/router";

interface Props {
    preloadedCms: PreloadedCmsType[];
}

export const PageContent: React.FC<Props> = ({
    preloadedCms = [],
}) => {
    const key: any = preloadedCms.length > 0 && preloadedCms.find((item) => {
        return item.contentKey
    })
    const contentBlocks = parseContents(preloadedCms, key?.contentKey)

    return <>{contentBlocks}</>
}