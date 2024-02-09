import { Box, Card as MuiCard, CardContent, CardProps } from "@mui/material";

type Props = {
  sx: CardProps["sx"];
} & CardProps;

export const Card: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  sx,
  ...rest
}) => {
  return (
    <MuiCard sx={sx} {...rest}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};
