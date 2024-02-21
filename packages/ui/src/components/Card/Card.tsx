import { Box, Stack as MuiStack, StackProps } from "@mui/material";
import React from "react";

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MuiStack>
      <Box display={"flex"} justifyContent={"flex-end"}>
        {children}
      </Box>
    </MuiStack>
  );
};
