import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectShowModuleFour,
  selectShowModuleFive,
} from "../../Tutorial/selectors";

export const ModuleFourFive = () => {
  const showModuleFour = useSelector(selectShowModuleFour());
  const showModuleFive = useSelector(selectShowModuleFive());

  if (!showModuleFour && !showModuleFive) return null;

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: showModuleFour ? "60%" : "50%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: showModuleFour ? "24px" : "16px",
        fontWeight: 700,
        color: "white",
        textAlign: showModuleFour ? "center" : "left",
      }}
    >
      {showModuleFour && "Эта кнопка - твой главный источник энергии!"}
      {showModuleFive && (
        <>
          - Жмёшь раз в 12 часов → получаешь Kw (это внутренняя валюта,
          "киловатты").
          <br />- Чем больше улучшений купишь в магазине → тем больше Kw за
          клик!
        </>
      )}
    </Typography>
  );
};
