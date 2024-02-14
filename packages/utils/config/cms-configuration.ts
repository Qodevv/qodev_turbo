export type CmsReq = {
  pageKey: string;
  content: string;
  access: number;
  isDisabled: number;
  path: string;
};

const stringifiedContent = JSON.stringify([]);
// don't let cmsData an empty object unless we have new validation on cms api
export const cmsData: CmsReq = {
  pageKey: "about",
  access: 0,
  path: "/about",
  content: stringifiedContent,
  isDisabled: 0,
};
