import { 
    Box, Grid, Typography
} from '@mui/material'
import {  useEffect, useRef, useState } from 'react'
import { HeaderElements } from '@repo/utils/context'
import { uihooks } from '@repo/ui'
import { useRouter } from 'next/router'
import { HeaderLogoNavigation } from './HeaderLogoNavigation'
import { HeaderLogo } from './HeaderLogo'
import { ResponsiveAppBar } from './HeaderApp'

interface Props {
    menu: HeaderElements['menus']
    useRawLogoUrl?: boolean
    onLogout(): void
}

export const Header: React.FC<Props> = ({
    useRawLogoUrl,
    onLogout,
    menu
}) => {
    const router = useRouter()
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const [navigationMenuOpen, setNavigationMenuOpen] = useState(false)
    const accountMenuButtonRef = useRef<HTMLButtonElement>(null)
    const navigationMenuButtonRef = useRef<HTMLButtonElement>(null)
    // authentication context
    const { isMobile } = uihooks.useResolution()

    useEffect(() => {
        setAccountMenuOpen(false)
    }, [router.asPath])

    return (
        <>
            <Box
                role="banner"
                component="header"
                width="100%"
                display="flex"
                justifyContent="center"
                zIndex={999}
                sx={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'divider',
                    ...(isMobile ? { position: 'fixed', top: 0, left: 0, right: 0} : {})
                }}
            >
               
    <ResponsiveAppBar />
            </Box>
        </>
    )
}

