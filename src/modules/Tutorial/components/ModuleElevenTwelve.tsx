import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";

export const ModuleElevenTwelve = () => {
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule !== 11 && currentModule !== 12) return null;

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: currentModule === 11 ? "100%" : "115%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: 700,
        color: "white",
        textAlign: "center",
      }}
    >
      {currentModule === 11 ? (
        <>
          Тут можно купить улучшения (за TON), которые увеличат доход
          <br />
          <br />
          - Энергетический поток → больше Kw за клик.
          <br />
          - Моды → пассивный доход как в Kw, так и в TON!
          <br />
          <br />
          Через 21 день улучшения начинают приносить прибыль в TON!
        </>
      ) : (
        "Где хранить и выводить TON"
      )}
    </Typography>
  );
};
