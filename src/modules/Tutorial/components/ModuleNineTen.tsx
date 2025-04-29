import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectShowModuleNine, selectShowModuleTen } from "../selectors";

export const ModuleNineTen = () => {
  const setShowModuleNine = useSelector(selectShowModuleNine());
  const showModuleTen = useSelector(selectShowModuleTen());

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
      {setShowModuleNine && (
        <>
          1 - Копируешь ссылку-приглашение
          <br />
          2 - Кидаешь друзьям.
          <br />3 - Получаешь бонусы за каждого!
        </>
      )}
      {showModuleTen && "Вкладывайся в энергетику!"}
    </Typography>
  );
};
