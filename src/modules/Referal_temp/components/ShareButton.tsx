import IosShareIcon from "@mui/icons-material/IosShare";
import { IconButton } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";
import WebApp from "@twa-dev/sdk";
import { useTranslation } from "react-i18next";

export const ShareButton = ({ shareLink }: { shareLink: string }) => {
  const { t } = useTranslation();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("shareTitle"),
          text: t("shareText"),
          url: shareLink,
        });
        console.log("Shared via Web Share API");
        return;
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    }

    if (
      WebApp?.platform === "tdesktop" ||
      WebApp?.platform === "weba" ||
      WebApp?.platform === "webk"
    ) {
      const encodedText = encodeURIComponent(`${shareLink}`);
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodedText}`,
        "_blank",
      );
      return;
    }
  };
  return (
    <IconButton
      onClick={handleShare}
      sx={{
        paddingTop: "5px",
      }}
    >
      <IosShareIcon sx={{ color: MAIN_COLORS.mainGreen }} />
    </IconButton>
  );
};
