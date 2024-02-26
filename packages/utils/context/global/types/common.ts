export interface FileValue {
  asset: {
    altText: string;
    fileName: string;
    fileSize: number;
    height?: number;
    id: string;
    mediaType: string;
    resourceUri: string;
    width?: number;
  };
  link?: {
    target?: string;
    url?: string;
  };
  elementType: string;
  mode?: string;
  renditions?: {
    default?: {
      height?: number;
      source: string;
      url: string;
      width?: number;
    };
  };
  url: string;
  value?: string;
}
