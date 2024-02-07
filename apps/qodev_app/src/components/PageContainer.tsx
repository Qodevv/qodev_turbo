import { ParsedContent } from "@repo/utils/context";
import React from "react";
import { Box, Container } from "@mui/material";

interface Props {
  pageContents: ParsedContent[];
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  pageContents,
}) => {
  const hasContainer =
    pageContents.length > 0 && pageContents.some((item) => item.hasContainer);
  return (
    <>
      {hasContainer ? (
        <Container
          sx={{
            pt: 2,
            pb: 2,
            height: "100%",
          }}
        >
          {children}
        </Container>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
