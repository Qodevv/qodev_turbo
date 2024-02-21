import {
  CheckCircleOutlineOutlined,
  ErrorOutlineRounded,
  InfoOutlined,
  WarningAmberRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { ButtonsValues, useCmsElementsContext } from "@repo/utils/context";
import { MessageType } from "@/core/types/types";
import { messageRole } from "@/core/types/types";
import React from "react";
import { useResolution } from "@repo/ui/src/hooks";

interface Props {
  type: MessageType;
  buttons?: ButtonsValues[];
  loading?: boolean;
  buttonKey: string;
}

export const AlertMessage: React.FC<Props> = ({
  type,
  buttons,
  loading,
  buttonKey,
}) => {
  // router > This alert message should have the capability to navigate on the next page or custom url by clicking the button.
  const theme = useTheme(); //this theme should be using our custom theme config
  // const parseUrlCb => useApiCallback => this only applies if we have custom url, we should have a DB and store urls on it. and it should fetch url based by button pagekey
  const { isMobile } = useResolution();
  const { buttonByKey } = useCmsElementsContext();
  const button_text = buttonByKey(buttonKey); // empty fo
  return (
    <Grid
      role={messageRole(type)}
      data-testid="message-component"
      container
      p={4}
      justifyContent="center"
      alignItems="center"
      sx={{
        borderStyle: "none",
        color: type === MessageType.Warning ? "black" : "white",
        "& a": { color: "inherit" },
        backgroundColor: hoveredTextColor(),
      }}
    >
      <Grid
        item
        xs={12}
        container
        spacing={4}
        alignItems="center"
        px={isMobile ? 0 : 8}
        maxWidth={(theme) => theme.sizes.contentWidth + "!important"}
      >
        <Grid item flex={1} display="flex" alignItems="center" gap={4}>
          {!isMobile && (
            <Typography color={textColor()}>
              {
                {
                  [MessageType.Info]: (
                    <CheckCircleOutlineOutlined
                      fontSize="large"
                      color="inherit"
                    />
                  ),
                  [MessageType.Success]: (
                    <CheckCircleOutlineOutlined
                      fontSize="large"
                      color="inherit"
                    />
                  ),
                  [MessageType.Problem]: (
                    <ErrorOutlineRounded fontSize="large" color="inherit" />
                  ),
                  [MessageType.Warning]: (
                    <WarningAmberRounded fontSize="large" color="inherit" />
                  ),
                  [MessageType.Note]: (
                    <InfoOutlined fontSize="large" color="inherit" />
                  ),
                }[type]
              }
            </Typography>
          )}
          {loading && (
            <CircularProgress size={30} sx={{ color: textColor() }} />
          )}
          <Typography variant="caption">Hello world</Typography>
          {/* alert message from CMS should be here. marked to modify in cms v2*/}
        </Grid>
        {!!buttons?.length && (
          <Grid
            item
            xs={12}
            md="auto"
            display="flex"
            gap={4}
            justifyContent="flex-end"
            flexWrap="nowrap"
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                size="small"
                fullWidth={isMobile}
                sx={{
                  border: "2px solid",
                  lineHeight: 1,
                  borderColor: (theme) =>
                    button.buttonType === "Primary"
                      ? type === MessageType.Warning
                        ? theme.palette.common.black
                        : theme.palette.common.white
                      : "transparent",
                  color: loading ? "transparent !important" : textColor(),
                  "&:hover": {
                    backgroundColor: textColor(),
                    color: hoveredTextColor(),
                    "& #icon": {
                      backgroundColor: hoveredTextColor(),
                    },
                  },
                  "& #loader": {
                    position: "absolute",
                    color: textColor(),
                  },
                }}
                // href => getHrefLink
                onClick={() => {}} // create a function with api call that calls a url from DB, but we can also use it for additional functionality excluding the navigation of page to custom url or page.
                disabled={loading}
              >
                {/* button icon but not evaicon we should develop a image parsing for svg as icon */}
                {button_text.text}
                {loading && <CircularProgress size={20} id="loader" />}
              </Button>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
  function textColor() {
    return {
      [MessageType.Info]: theme.palette.common.white,
      [MessageType.Success]: theme.palette.common.white,
      [MessageType.Problem]: theme.palette.common.white,
      [MessageType.Warning]: theme.palette.common.black,
      [MessageType.Note]: theme.palette.common.white,
    }[type];
  }

  function hoveredTextColor() {
    return {
      [MessageType.Info]: theme.palette.success.main,
      [MessageType.Success]: theme.palette.success.main,
      [MessageType.Problem]: theme.palette.error.main,
      [MessageType.Warning]: theme.palette.warning.main,
      [MessageType.Note]: theme.palette.warning.light,
    }[type];
  }
};
