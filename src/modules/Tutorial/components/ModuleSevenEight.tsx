import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";

export const ModuleSevenEight = () => {
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule !== 7 && currentModule !== 8) return null;

  const text =
    currentModule === 7
      ? "Сначала выполняй простые задания — быстрый старт гарантирован!"
      : "Друзья = деньги! ";

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: "66%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: 700,
        color: "white",
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
};
