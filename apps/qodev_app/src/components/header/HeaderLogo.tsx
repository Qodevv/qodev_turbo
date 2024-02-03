import {
    Box, Typography
} from '@mui/material'
import Image from 'next/image'
import { useResolution } from '@repo/ui/src/hooks'
import { externalImageLoader } from '@repo/ui/src/hooks'
import { MenuItems } from '@repo/utils/context'
import React from 'react'

interface Props {
    menuItems?: MenuItems
    useRawLogoUrl?: boolean;
}

export const HeaderLogo: React.FC<Props> = ({
    menuItems,
    useRawLogoUrl
}) => {
    const { isMobile } = useResolution()
    
    return (
        <Box position="relative" sx={{ cursor: 'pointer'}} width={30} height={30}>
            {useRawLogoUrl ? (
                <Image 
                    data-testid="header_logo_image"
                    src={menuItems?.imageSrc || ""}
                    loader={externalImageLoader}
                    key={`${isMobile ? 'mobile': 'desktop'}-logo`}
                    height={46}
                    width={100}
                    style={{ objectFit: 'contain', objectPosition: 'center', width: 'auto'}}
                    alt=""
                />
            ) : (
                <Typography
                variant="button"
                component="span"
                fontWeight="bold"
                color="primary"
                >
                    QODEV
                </Typography>
            )}
        </Box>
    )
}
