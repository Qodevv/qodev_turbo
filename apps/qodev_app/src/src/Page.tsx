/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { Layout as LayoutComponent } from './Layout'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import {
    cmsInit, context, hooks
} from '@repo/utils'
import { ApplicationProvider } from '@/core/context/ApplicationContext'
import { useRouter } from "next/router"
import { useEffect } from "react"

interface Props {
    data?: any;
    error?: any
}

export const Page: NextPage<Props> = ({ data, error }) => {
    const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(
        () => import('./Layout').then((c) => c.Layout),
        {
            ssr: false
        }
    )
    return (
       <ApplicationProvider>
        <context.PageLoaderContextProvider>
           <Layout  />
        </context.PageLoaderContextProvider>
       </ApplicationProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        //change stringifiedContent data accordingly
        const stringifiedContent = JSON.stringify([
            {
                matchKey: 'about-block',
                hasAuthorizedBlock: 0,
                authorizedBlock: [],
                unauthorizedBlock: [
                    {
                        htmlBlockId: 1,
                        htmlBlock: '',
                        htmlBlockType: 'root'
                    }
                ],
                hasLoading: 1,
                hasContainer: 1
            }
        ])
        // don't let cmsData an empty object unless we have new validation on cms api
        const cmsData = {
            contentKey: 'about-block',
            access: 0,
            path: "/about",
            content: stringifiedContent,
            isDisabled: 0,
            currentScreen: 0
        }
        const initEnrollCms = await cmsInit.enrollCms(cmsData as any)
        return {
            props: {
                data: {
                    initEnrollCms
                }
            }
        }
    } catch (error) {
        return { props: { error }}
    }
}