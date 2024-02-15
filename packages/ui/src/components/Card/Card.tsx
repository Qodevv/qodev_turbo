import {
  Card as MuiCard,
  CardContent,
  CardProps,
  CardActions,
} from "@mui/material";
import { ReactNode } from "react";

type Props = {
  hasActionButtons?: boolean;
  element?: ReactNode;
  elevation?: number;
  sx?: CardProps["sx"];
} & CardProps;

export const Card: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  sx,
  hasActionButtons,
  element,
  elevation = 5,
  ...rest
}) => {
  //  CMS data in the future

  return (
    <MuiCard
      elevation={elevation}
      sx={sx}
      {...rest}
      data-testid="Reusable-Card"
    >
      <CardContent>
        {/* The data should be in CMS */}
        {children}
      </CardContent>
      {hasActionButtons && (
        <CardActions data-testid="Action-Button">{element}</CardActions>
      )}
    </MuiCard>
  );
};
