import {
  Box,
  FormControl,
  Grow,
  MenuItem,
  Select,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";
import { defaultLanguages, Locale } from "../../i18n";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const LANG_LABELS: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

const languageSelectSx = (theme: Theme) => ({
  color: theme.palette.common.white,
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },
  ".MuiSvgIcon-root": { color: theme.palette.common.white },
});

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
  justifyContent: "center",
}));

const AppHeader = React.forwardRef((props: AppHeaderProps, ref) => {
  const { user, pageTitle } = props;
  const { t, i18n } = useTranslation("app");
  const theme = useTheme();

  const [count, setCount] = useState(0);
  const hours = 1;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const countdown = Math.max(seconds - count, 0);
  const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
  const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
      <Toolbar
        sx={{
          background: "#08140C 0% 0% no-repeat padding-box",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {countdownMinutes}:{countdownSeconds}
            </Typography>
          </Box>
          <Box sx={{ width: 20, height: 20, flex: 1 }} />
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5),
              }}
              variant="h6"
              component="div"
            >
              {t("appTitle").toLocaleUpperCase()}
            </Typography>
            <Typography
              sx={{ ...typoStyle }}
              variant="overline"
              component="div"
              noWrap
            >
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
            {user && user.eMail && (
              <Grow in={Boolean(user && user.eMail)}>
                <AvatarMenu user={user} />
              </Grow>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            mt: 0.5,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <Select
              value={i18n.resolvedLanguage ?? i18n.language}
              inputProps={{ "aria-label": t("language") }}
              sx={languageSelectSx}
              onChange={(e) =>
                i18n
                  .changeLanguage(e.target.value)
                  .catch((error) =>
                    console.error("Failed to change language", error)
                  )
              }
            >
              {defaultLanguages.map((lng) => (
                <MenuItem key={lng} value={lng}>
                  {LANG_LABELS[lng]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
