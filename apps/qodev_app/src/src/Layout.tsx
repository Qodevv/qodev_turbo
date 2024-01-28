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
import { Theme } from '@radix-ui/themes'
import { useRouter } from 'next/router'
import { hooks } from '@repo/utils'
import { useEffect, useState } from "react";


export const Layout: React.FC = () => {
    const { cms, pageContents, loading } = useApplicationContext()
    
    return (
        <>
            <Theme>
                {cms.length > 0 && <header>Header here</header>}
                <LoadableCmsProvider>
                    <PageContainer pageContents={pageContents}>
                        <LoadablePageContent loading={loading}>
                            <PageContent preloadedCms={cms} />
                        </LoadablePageContent>
                    </PageContainer>
                </LoadableCmsProvider>
            </Theme>
        </>
    )
}