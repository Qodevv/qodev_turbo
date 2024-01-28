import { useApplicationContext } from '@/core/context/ApplicationContext';
import { usePageLoaderContext } from '@repo/utils/context'
import { useEffect, useState } from 'react'

interface Props {
    loading?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    loading
}) => {
    const { setLoader } = useApplicationContext()
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 3000)
    }, [])
    return (
        <>
            {loading ? (
                <span>Loading...</span>
                // improve loading here > make a component
            ) : <> {children} </>}
        </>
    )
}

