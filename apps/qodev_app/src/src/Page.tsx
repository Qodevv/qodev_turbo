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
         <Layout />
       </ApplicationProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const autoEnroll = await cmsInit.cmsInitEnroll()
        return {
            props: {
                data: {
                    autoEnroll
                }
            }
        }
    } catch (error) {
        return { props: { error }}
    }
}