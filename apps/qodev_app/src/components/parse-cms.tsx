/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { PreloadedCmsType } from "@/core/context/ApplicationContext";
import { Button } from "@repo/ui";
import { ParsedContent, useCmsElementsContext } from "@repo/utils/context";


export const parseContents = (
    contentCms: PreloadedCmsType[],
    contentKey: string
) => {
    const { buttonByKey } = useCmsElementsContext()
    const buttonCms = buttonByKey('About')

    if(contentCms.length > 0) {
        const match: any = contentCms.length > 0 && contentCms.map((item) => {
            return {
                content: JSON.parse(item.content)
            }
        })
        const deserializeContents = match[0].content?.length > 0 && match[0].content?.find((cms: ParsedContent) => {
            return cms.contentKey === contentKey
        })
        if(match) {
            const { contentKey: matchedContentKey } = deserializeContents;
            switch(matchedContentKey) {
                case "home-block":
                    return (
                        <>
                            <h3>Home</h3>
                            <Button variant="contained">
                                {buttonCms.key}
                            </Button>
                        </>
                    )
                default:
                    return <div>Page not found</div>
            }
        } else {
            // improve page not found page.
            return <div>Page not found or No content available</div>
        }
    } else {
        return <div>Page not found or No content available</div>
    }
}