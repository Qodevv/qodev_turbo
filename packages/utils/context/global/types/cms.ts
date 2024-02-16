export type CmsDto = {
  path: string;
  contentKey: string;
  access: number;
  hasLoading: number;
  isAccountSetup: number;
};

export interface CmsGlobals {
  contentBlocks?: ContentBlocks[] | null | undefined;
  appSetup: boolean | undefined;
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
  htmlBlockId: number;
  htmlBlock: any;
  htmlBlockType: string;
}

export interface UnauthorizedBlock {
  htmlBlockId: number;
  htmlBlock: any;
  htmlBlockType: string;
}

export type NonStepperCmsFields = {
  fieldId: number;
  labelKey: string;
  name: string;
  isRequired: boolean;
  shouldUnregister: boolean;
};


export type MenuItems = {
  link: string;
  name: string;
  relatedLinks: string;
  subMenuItems: Array<[]>;
};

export type HeaderElements = {
  headerTitle: string;
  stickyHeader: boolean;
  menus: MenuItems[];
  imageSrc: string;
  floatRightButtons: ButtonsValues[]
};
export type HeaderProps = {
  elements: HeaderElements;
};

type ButtonKeyValues = {
  key: string;
  value: string;
};

export interface ButtonsValues {
  buttonType: string;
  buttonElement: ButtonKeyValues;
  pageUrl: string;
  variant: string;
  size: string;
  loading: boolean;
  actionKey: string
  shouldNavigate: boolean;
  href: string
  shouldHide: boolean
}

type AlertMessageKeyProps = {};

export type Labels = {
  key: string;
  value: string;
};

type ServicesElementEntity = {
  name: string
  description: string
  icon: string
}

export type ImageSourceEntity = {
  key: string;
  value: string;
}

type DataElements = {
  services: ServicesElementEntity[]
  imageSource: ImageSourceEntity[]
}

export type Elements = {
  buttons: ButtonsValues[];
  alertMessageKey: AlertMessageKeyProps;
  labels: Labels[];
  data: DataElements
};

export type ParsedContent = {
  contentKey: string;
  hasAuthorizedBlock: number;
  hasForm: boolean;
  hasContainer: boolean;
  hasStepper: boolean;
  hasMultiForm: boolean;
  hasSidebar: boolean;
  header: HeaderProps;
  elements: Elements;
  stepperForm: Array<[]>;
  multiForm: Array<[]>;
};

export type PreloadedGlobals = CmsGlobals;
