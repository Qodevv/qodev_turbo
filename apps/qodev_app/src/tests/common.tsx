import { ThemeProvider, createTheme } from "@mui/material";
import { RenderOptions, render as rtlRender } from '@testing-library/react'
import rtlEvent from '@testing-library/user-event'
import { ReactElement } from "react";
import { ApplicationProvider } from "@/core/context/ApplicationContext";

export * from '@testing-library/react'

export function noTranslation(t: string) {
    return t;
}

export function submittedResult() {
    return {
        loading: false,
        called: true
    }
}



jest.mock('../core/context/ApplicationContext', () => ({
    useApplicationContext: jest.fn().mockReturnValue({ cms: [], pageContents: [], loading: false, menus: [] })
}))

const theme = createTheme()

export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
    rtlRender(ui, {
        wrapper: ({ children }) => (
            <ApplicationProvider>
               <ThemeProvider theme={theme}>
                    {children}
               </ThemeProvider>
            </ApplicationProvider>
        ),
        ...options
    })

export const userEvent = rtlEvent

