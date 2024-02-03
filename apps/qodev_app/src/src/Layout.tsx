/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { LoadablePageContent } from "@/components/LoadableContent"
import { PageContainer } from "@/components/PageContainer"
import { PageContent } from "@/components/PageContent"
import { useApplicationContext } from "@/core/context/ApplicationContext"
import { LoadableCmsProvider } from "@/core/context/LoadableCmsContext"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import { CmsElementProvider } from '@repo/utils/context'
import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"

export const Layout: React.FC = () => {
    const { cms, pageContents, loading, menus } = useApplicationContext()
    const theme = createTheme()
    const queryClient = new QueryClient({})
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
               <QueryClientProvider client={queryClient}>
               <Header onLogout={() => {}} menu={menus} />
                   <CmsElementProvider globals={cms}>
                    <LoadableCmsProvider>
                            <PageContainer pageContents={pageContents}>
                                <LoadablePageContent loading={loading}>
                                    <PageContent preloadedCms={cms} />
                                </LoadablePageContent>
                            </PageContainer>
                        </LoadableCmsProvider>
                   </CmsElementProvider>
                   <Footer />
               </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}