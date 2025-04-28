import { Typography } from "@mui/material";

function ModuleTopText({ showModule }: { showModule: boolean }) {
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
      {showModule
        ? "Нажми на Netherlands и загляни на свою первую электростанцию!"
        : "Перед тобой 4 страны, но пока открыта только Нидерланды (остальные ждут, когда ты их разблокируешь)."}
    </Typography>
  );
}

export default ModuleTopText;
