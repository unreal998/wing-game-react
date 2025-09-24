import { Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { TableBox } from "../Referal_temp/components/TableBox";
import { StyledHeader } from "../Referal_temp/components/StyledHeader";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/components/MainBox";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { heightProportion } from "../../shared/utils";
import { StyledBasicBox } from "../Referal_temp/components/StyledBasicBox";
import { MAIN_COLORS } from "../../shared/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectScoreData } from "./selectors";
import { getScoreDataAction } from "./slice";
import { selectUserId } from "../Header/selectors";
import { NamedStyled } from "../../shared/components/NameStyled";

export const Scoreboard = () => {
  const { t } = useTranslation();
  const loading = useSelector(selectLoading());
  const scoreData = useSelector(selectScoreData());
  const dispatch = useDispatch();
  const uid = useSelector(selectUserId());

  useEffect(() => {
    if (uid) {
      dispatch(getScoreDataAction(uid));
    }
  }, [dispatch]);

  const tableHeight = useMemo(() => heightProportion - 100, []);

  const getScoreColor = (position: number) => {
    switch (position) {
      case 1:
        return "#FFD700";
      case 2:
        return "#C0C0C0";
      case 3:
        return "#CD7F32";
      default:
        return MAIN_COLORS.mainGreen;
    }
  };

  return (
    <MainBox height={heightProportion} position={"relative"}>
      <LoaderComponent loading={loading} />
      <Stack direction="column" gap={"10px"}>
        <NamedStyled
          sx={{
            "@media (max-height: 670px)": {
              paddingTop: "0px",
            },
          }}
        >
          {t("Scoreboard")}
        </NamedStyled>
        <StyledBasicBox
          height={`${tableHeight}px`}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: `${MAIN_COLORS.mainGreen} transparent`,
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: MAIN_COLORS.mainGreen,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          }}
        >
          <TableBox>
            {["#", "User", "kW"].map((item, index) => (
              <StyledHeader key={index} sx={{ flex: index === 0 ? 0.2 : 0.4 }}>
                <Typography sx={{ fontSize: "12px" }}>{t(item)}</Typography>
              </StyledHeader>
            ))}
          </TableBox>
          {scoreData && scoreData.length > 0 ? (
            scoreData.map((user) => (
              <Stack
                direction="row"
                key={user.position}
                sx={{
                  padding: "10px 12px",
                  border: `1px solid ${user.id === uid ? "#3f3ceaff" : getScoreColor(user.position)}`,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    flex: 0.2,
                    textAlign: "flex-start",
                    color:
                      user.id === uid
                        ? "#3f3ceaff"
                        : getScoreColor(user.position),
                    fontSize: "12px",
                  }}
                >
                  {user.position}
                </Typography>
                <Typography
                  sx={{
                    flex: 0.4,
                    textAlign: "flex-start",
                    color:
                      user.id === uid
                        ? "#3f3ceaff"
                        : getScoreColor(user.position),
                    fontSize: "12px",
                  }}
                >
                  {user.userName}
                </Typography>
                <Typography
                  sx={{
                    flex: 0.4,
                    textAlign: "flex-start",
                    color:
                      user.id === uid
                        ? "#3f3ceaff"
                        : getScoreColor(user.position),
                    fontSize: "12px",
                  }}
                >
                  {user.score.toFixed(3)}
                </Typography>
              </Stack>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", padding: "20px" }}>
              {t("No scoreboard yet")}
            </Typography>
          )}
        </StyledBasicBox>
      </Stack>
    </MainBox>
  );
};
