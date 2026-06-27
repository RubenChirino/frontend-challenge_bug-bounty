import { Box, Container, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation, Trans } from "react-i18next";

const issues = [
  { id: "uniqueKey", icon: "🐞" },
  { id: "boldText", icon: "🐞" },
  { id: "missingAvatar", icon: "🐞" },
  { id: "countdown", icon: "🐞" },
  { id: "languageSwitch", icon: "⭐️" },
];

const Home = () => {
  const { t } = useTranslation("app");

  return (
    <Box p={2} maxHeight="calc(100vh - 110px)" overflow={["auto", "auto"]}>
      <Container>
        <Typography variant="h1" textAlign="center">
          {t("home.welcome")}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          <Trans i18nKey="home.intro" components={{ b: <b /> }} />
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          {t("home.sidenote")}
        </Typography>
        <List>
          {issues.map(({ id, icon }) => (
            <ListItem key={id}>
              <Typography variant="h5" sx={{ p: 2 }}>
                {icon}
              </Typography>
              <ListItemText
                primary={t(`home.issues.${id}.title`)}
                secondary={t(`home.issues.${id}.description`)}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default observer(Home);
