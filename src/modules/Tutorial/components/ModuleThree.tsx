import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../../shared/colors";

function ModuleThree({ showModule }: { showModule: boolean }) {
  const { t } = useTranslation();
  return (
    <Typography
      sx={{
        color: "white",
        fontSize: "20px",
        fontWeight: 700,
        textAlign: "center",
        margin: "0 10px",
        zIndex: 2,
      }}
    >
      {showModule ? (
        <>
          {t("tutorial.step3a.before")}{" "}
          <Box component="span" sx={{ color: MAIN_COLORS.mainGreen }}>
            Netherlands
          </Box>{" "}
          {t("tutorial.step3a.after")}
        </>
      ) : (
        t("tutorial.step3b")
      )}
    </Typography>
  );
}

export default ModuleThree;
