import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectShowModuleSeven, selectShowModuleEight } from "../selectors";

export const ModuleSevenEight = () => {
  const showModuleSeven = useSelector(selectShowModuleSeven());
  const showModuleEight = useSelector(selectShowModuleEight());

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
      {showModuleSeven &&
        "Сначала выполняй простые задания — быстрый старт гарантирован!"}
      {showModuleEight && "Друзья = деньги! "}
    </Typography>
  );
};
