import { ParsedContent } from '@/core/context/ApplicationContext';
import { Container } from '@radix-ui/themes'
import React from "react";

interface Props {
  pageContents: ParsedContent[]
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({children, pageContents }) => {
    const hasContainer = pageContents.length > 0 && pageContents.some((item) => item.hasContainer === 1)
    return (
        <>
            {hasContainer && 
            <Container size="4">
                {children}
            </Container>}
            {children}
        </>
    )
}