import { Typography } from "@mui/material";

interface Props {
  messageKey: string;
  bolded?: boolean;
}

export const FieldError: React.FC<Props> = ({ messageKey, bolded = true }) => {
  return (
    <Typography color="error" fontWeight={bolded ? "bold" : "normal"}>
      {/* use errorByKey function if any */}
      {messageKey}
    </Typography>
  );
};
