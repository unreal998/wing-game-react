import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";

export const ModuleNineTen = () => {
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule !== 9 && currentModule !== 10) return null;

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: "75%",
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
      {currentModule === 9 ? (
        <>
          1 - Копируешь ссылку-приглашение
          <br />
          2 - Кидаешь друзьям.
          <br />3 - Получаешь бонусы за каждого!
        </>
      ) : (
        "Вкладывайся в энергетику!"
      )}
    </Typography>
  );
};
