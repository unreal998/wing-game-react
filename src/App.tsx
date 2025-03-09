import React, { useEffect } from "react";
import { viewport, init, isTMA } from "@telegram-apps/sdk";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/referal";
import { Box } from "@mui/material";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Settings from "./modules/Settings";
import { Home } from "./modules/Home";
import { Route, Routes } from "react-router-dom";
import Missions from "./modules/Missions";
import Wallet from "./modules/Wallet";

const App = () => {
  useEffect(() => {
    const setupTelegram = async () => {
      try {
        if (await isTMA()) {
          init();
          console.log("✅ Telegram Mini App API доступен!");

          if (viewport.expand.isAvailable()) {
            viewport.expand(); // Разворачиваем Mini App
            console.log("🔹 Мини-приложение развернуто!");
          }

          if (viewport.requestFullscreen.isAvailable()) {
            viewport.requestFullscreen(); // Запрос на полноэкранный режим
            console.log("🔹 Включен полноэкранный режим!");
          }
        } else {
          console.warn("❌ Mini App не запущен в Telegram!");
        }
      } catch (error) {
        console.error("⚠ Ошибка при инициализации Telegram API:", error);
      }
    };

    setupTelegram(); // Вызываем асинхронную функцию внутри useEffect
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: MAIN_COLORS.mainBG,
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/referal" element={<Referal />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/shop" element={<Home />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
