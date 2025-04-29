import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectShowModuleEleven, selectShowModuleTwelve } from "../selectors";

export const ModuleElevenTwelve = () => {
  const setShowModuleEleven = useSelector(selectShowModuleEleven());
  const showModuleTwelve = useSelector(selectShowModuleTwelve());

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: setShowModuleEleven ? "100%" : "115%",
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
      {setShowModuleEleven && (
        <>
          Тут можно купить улучшения (за TON), которые увеличат доход
          <br />
          <br />
          - Энергитический поток → больше Kw за клик.
          <br />
          - Моды → пассивный доход как и в Kw так и TON!
          <br />
          <br />
          Через 21 день улучшения начинают приносить прибиль в TON!
        </>
      )}
      {showModuleTwelve && "Где хранить и выводить TON"}
    </Typography>
  );
};
