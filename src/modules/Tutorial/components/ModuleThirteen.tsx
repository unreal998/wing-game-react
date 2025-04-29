import { Typography } from "@mui/material";

export const ModuleThirteen = () => {
  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: "120%",
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
      Твой личный TON-кошелёк уже создан!
      <br />
      <br />
      Что можно делать?
      <br />
      - Пополнять → чтобы покупать улучшения.
      <br />- Выводить → после заработка на модах свои кровные TON.
    </Typography>
  );
};
