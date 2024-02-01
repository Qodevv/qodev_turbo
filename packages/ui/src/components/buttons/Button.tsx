/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

// export interface ButtonProps 
//     extends Pick<

//     >

import { forwardRef } from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { useCustomAction } from '../../hooks/useCustomAction'

export interface ButtonProps
    extends Pick<
        MuiButtonProps,
        | 'className'
        | 'children'
        | 'fullWidth'
        | 'onClick'
        | 'sx'
        | 'onFocusVisible'
        | 'tabIndex'
        | 'variant'
        | 'role'
        | 'onKeyDown'
    > {
        width?: number | string
        id?: string
        loading?: boolean
        disabled?: boolean
        href?: string
        type?: any
        text?: string;
        buttonActionType?: MuiButtonProps['type']
        pageKey?: string
        linkKey?: string
        customActionKey?: string
        'data-testid'?: string
    }

const LOADER_SIZE = 26;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        children,
        text,
        loading,
        disabled,
        className,
        width,
        fullWidth,
        sx,
        id,
        type,
        variant,
        linkKey,
        pageKey,
        buttonActionType,
        href,
        onClick,
        customActionKey,
        ...props
    }, ref) => {
        const action = useCustomAction({
            actionKey: customActionKey,
            linkKey,
            pageKey,
            shouldNavigate: !onClick
        })
        // create custom request action if any
        const isLoading = loading || action?.loading;
        const isDisabled = disabled || action?.disabled
        const role = !href ? { role: 'button' } : {}

        const button = (
            <>
                <MuiButton
                ref={ref}
                id={id}
                data-testid={props['data-testid'] || id}
                custom-action-key={customActionKey}
                // create global classname for loading and disabled
                    className={[className, type, isLoading ? 'loading': null, isDisabled ? 'disabled' : null]
                .filter(Boolean)
                .join(' ')
                }
                sx={{
                    position: 'relative',
                    width: fullWidth ? '100%' : width,
                    minWidth: 140,
                    height: 'fit-content',
                    borderRadius: 0,
                    '& #loader': {
                        position: 'absolute',
                        left: `calc(50% - ${LOADER_SIZE / 2}px)`,
                        top: `calc(50% - ${LOADER_SIZE / 2}px)`
                    },
                    ...sx
                }}
                fullWidth={fullWidth}
                disabled={false}
                aria-label={text}
                variant={variantFromType(type)}
                onClick={() => {}}
                href={href}
                type={buttonActionType}
                {...role}
                {...props}
                >
                    {children || text}
                    {/* create a circular progress */}
                </MuiButton>
                {/* action node is a react node type */}
                {action?.node}
            </>
        )
        // create tooltip if button is disabled
        return button

        // create handleclick based on cms config
    }
)

const variantFromType = (type: ButtonProps['type']) : MuiButtonProps['variant'] => {
    switch(type){
        case 'Primary':
            return 'contained'
        default:
            return 'outlined'
    }
}