/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { PreloadedCmsType } from "@/core/context/ApplicationContext";
import { ParsedContent } from "@repo/utils/context";
import { LoginBlock } from "./blocks/Login/LoginBlock";
import { HomeBlock } from ".";

export const parseContents = (
  contentCms: PreloadedCmsType[],
  contentKey: string
) => {
  if (contentCms.length > 0) {
    const match: any =
      contentCms.length > 0 &&
      contentCms.map((item) => {
        return {
          content: JSON.parse(item.content),
        };
      });
    const deserializeContents: ParsedContent =
      match[0].content?.length > 0 &&
      match[0].content?.find((cms: ParsedContent) => {
        return cms.contentKey === contentKey;
      });
    if (match) {
      const { contentKey: matchedContentKey } = deserializeContents;
      switch (matchedContentKey) {
        case "home-block":
          const parseServices = deserializeContents.elements.data.services;
          return <HomeBlock services={parseServices} />;
        case "signin-block":
          return <LoginBlock />;
        default:
          return <div>Page not found</div>;
      }
    } else {
      // improve page not found page.
      return <div>Page not found or No content available</div>;
    }
  } else {
    return <div>Page not found or No content available</div>;
  }
};
