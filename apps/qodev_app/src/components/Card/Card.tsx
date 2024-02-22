import { Box, Stack } from "@mui/material";
import React from "react";
import { EvaIcon } from "@/components/EvaIcon";
import { FileValue } from "@repo/utils/context";

interface props {
  titleIcon: FileValue;
}

export const Card: React.FC<props> = ({ titleIcon }) => {
  return (
    <Stack
      flexDirection={"row"}
      flexWrap={"wrap"}
      height={400}
      gap={4}
      p={4}
      borderRadius={8}
      bgcolor="appColors.support80.transparentLight"
    >
      <Stack direction={"row"}>
        {titleIcon && (
          <Box mr={4} pt={1} alignItems={"center"}>
            <EvaIcon
              name={titleIcon.value || ""}
              className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
              aria-hidden="true"
            />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
