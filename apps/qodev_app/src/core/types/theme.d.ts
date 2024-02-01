import '@mui/material'



interface ThemeSizes {
    contentWidth: number | string
    contentPaddingX: number | string
    mobileContentPaddingX: number | string;
    errorsTooltip: number | string
    fieldTooltip: number | string
    headerHeight: number | string
    mobileHeaderHeight: number | string
    stickOutPageWidth: number | string
}

declare module '@mui/material' {
    interface ThemeOptions extends ThemeOptions {
        sizes: ThemeSizes
        palette: {}
    }

    interface Theme extends Theme {
        sizes: ThemeSizes,
        palette: {}
    }
}