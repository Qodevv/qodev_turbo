/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { PreloadedCmsType } from "@/core/context/ApplicationContext";

export const parseContents = (
    contentCms: PreloadedCmsType[],
    contentKey: string
) => {
    const match = contentCms.find(
        (item) => item.contentKey === contentKey
    )
    if(match) {
        const { contentKey: matchedContentKey } = match;
        switch(matchedContentKey) {
            case "home-block":
                return <h3>Home</h3>
            case "about-block":
                return <h3>About</h3>
            case "page-not-found-block":
                return <h3>404 page not found</h3>
            default:
                return <div>Unknown content</div>
        }
    } else {
        // spill design here. implement loading for 1 to 2 seconds only
        return <div>Accessing...</div>
    }
}