export type CmsReq = {
    pageKey: string
    content: string
    access: number
    isDisabled: number
    path: string
}



const stringifiedContent = JSON.stringify([
    {
        contentKey: 'about-block',
        hasAuthorizedBlock: false,
        hasForm: false,
        hasContainer: true,
        hasStepper: false,
        hasMultiForm: false,
        hasSidebar: false,
        header : {
            elements: {
                headerTitle: 'Qodev',
                stickyHeader: false,
                menus: []
            }
        },
        elements: {
            buttons: {
                elements: {
                    values: [
                        {
                            buttonType: 'link',
                            buttonKey: 'About',
                            pageUrl: '/about',
                            variant: 'primary',
                            size: '',
                            loading: false
                        },
                        {
                            buttonType: 'normal',
                            buttonKey: 'Login',
                            pageUrl: '',
                            variant: 'primary',
                            size: '',
                            loading: false 
                        }
                    ]
                }
            },
            alertMessageKey: {},
            typography: {
                elements: {
                    values: []
                }
            }
        },
        nonStepperform: {
            formKey: '',
            elements: {
                values: [
                    {
                        name: "email",
                        labelKey: 'Email',
                        shouldUnregister: false,
                        required: true,
                        type: "email"
                    }
                ]
            }
        },
        stepperForm: [],
        multiForm: []
    }
])
// don't let cmsData an empty object unless we have new validation on cms api
export const cmsData: CmsReq = {
    pageKey: 'about',
    access: 0,
    path: "/about",
    content: stringifiedContent,
    isDisabled: 0,
}