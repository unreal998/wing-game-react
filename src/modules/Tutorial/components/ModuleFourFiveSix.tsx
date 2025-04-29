import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowModuleFour,
  selectShowModuleFive,
  selectShowModuleSix,
} from "../selectors";
import { setShowModuleFive, setShowModuleSix } from "../slices";
import { useEffect } from "react";

export const ModuleFourFiveSix = () => {
  const dispatch = useDispatch();
  const showModuleFour = useSelector(selectShowModuleFour());
  const showModuleFive = useSelector(selectShowModuleFive());
  const showModuleSix = useSelector(selectShowModuleSix());

  useEffect(() => {
    if (showModuleFive) {
      const timer = setTimeout(() => {
        dispatch(setShowModuleFive(false));
        dispatch(setShowModuleSix(true));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModuleFive, dispatch]);

  if (!showModuleFour && !showModuleFive && !showModuleSix) {
    return null;
  }

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
      {showModuleSix &&
        "Зайди в 'Миссии' — тут куча заданий, за которые платят!"}
    </Typography>
  );
};
