import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'
import { useRouter } from 'next/router'

const Anchor = styled('a')({})

interface NextLinkComposedProps
 extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onMouseEnter' | 'onTouchStart' | 'onClick'>,
  Omit<NextLinkProps, 'href' | 'as'> {
    to: NextLinkProps['href']
    linkAs?: NextLinkProps['as']
    href?: NextLinkProps['href']
}

const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed({
    to, linkAs, href: _, replace, scroll: __, shallow, prefetch, locale, ...other
}, ref) {
    return (
        <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={false}
        shallow={shallow}
        passHref
        locale={locale}
        >
            <Anchor ref={ref} {...other} />
        </NextLink>
    )
})

export type LinkProps = {
    activeClassName?: string
    as?: NextLinkProps['as']
    href?: NextLinkProps['href']
    naked?: boolean
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> & Omit<MuiLinkProps, 'href'>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    naked,
    role: _,
    ...other
}, ref) {
    const router = useRouter()
    const pathname = typeof href === 'string' ? href : href?.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName
    })

    return (
        <MuiLink 
            component={NextLinkComposed}
            linkAs={linkAs}
            className={className}
            ref={ref}
            to={href}
            {...other}
        />
    )
})