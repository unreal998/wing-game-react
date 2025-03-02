import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { TableBox } from "./components/TableBox";
import Male from "../../assets/Male.svg";
import { TableBoxHead } from "./components/TableBoxHead";
import { StyledHeader } from "./components/StyledHeader";
import { StyledMain } from "./components/StyledMain";
import { StyledMainColumn } from "./components/StyledMainColumn";
import { StyledMainTypography } from "./components/StyledMainTypography";
import { StyledMainJpg } from "./components/StyledMainJpg";
import Copy from "../../assets/copy.svg";
import { StyledCopy } from "./components/StyledCopy";

const Referal = () => {
  const [inviteText, setInviteText] = useState("Invite a friend");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(inviteText)
      .then(() => {
        console.log("Copied:", inviteText);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return (
    <Box sx={{ padding: "25px 15px 0 15px" }}>
      <Box>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 700, paddingBottom: "8px" }}
        >
          Referal
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              backgroundColor: MAIN_COLORS.referalBox,
              border: `1px solid  ${MAIN_COLORS.contentYellow}`,
              display: "flex",
              flexDirection: "column",
              borderRadius: "9px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                padding: "9px 45px 0px 45px",
              }}
            >
              234
            </Typography>
            <Typography
              sx={{ fontSize: "17px", fontWeight: 700, paddingBottom: "9px" }}
            >
              Your bonus
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: MAIN_COLORS.referalBox,
              border: `1px solid  ${MAIN_COLORS.contentYellow}`,
              display: "flex",
              flexDirection: "column",
              borderRadius: "9px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                padding: "9px 41px 0px 41px",
              }}
            >
              10%
            </Typography>
            <Typography
              sx={{ fontSize: "17px", fontWeight: 700, paddingBottom: "9px" }}
            >
              Your bonus
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginTop: "17px",
            border: `1px solid ${MAIN_COLORS.contentYellow}`,
            borderRadius: "5px",
            flexDirection: "column",
            overflowY: "scroll",
            scrollbarGutter: "stable",
            maxHeight: "374px",
            scrollbarWidth: "thin",
            scrollbarColor: `${MAIN_COLORS.contentYellow} #FFFFFF0F`,
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: MAIN_COLORS.contentYellow,
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "#FFFFFFF" },
          }}
        >
          <TableBox>
            <StyledHeader sx={{ flex: 1.6, paddingLeft: "5px" }}>
              <TableBoxHead>User</TableBoxHead>
            </StyledHeader>
            <StyledHeader sx={{ flex: 0.7 }}>
              <TableBoxHead>Level</TableBoxHead>
            </StyledHeader>
            <StyledHeader sx={{ flex: 0.7 }}>
              <TableBoxHead>Coin</TableBoxHead>
            </StyledHeader>
          </TableBox>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <TableBox key={index}>
                <StyledMain>
                  <StyledMainJpg>
                    <img
                      src={Male}
                      alt="male"
                      style={{
                        width: "33px",
                        height: "33px",
                        borderRadius: "52px",
                      }}
                    />
                    <StyledMainTypography>Name User</StyledMainTypography>
                  </StyledMainJpg>
                </StyledMain>
                {[10, 234].map((value, idx) => (
                  <StyledMainColumn key={idx}>
                    <StyledMainTypography
                      sx={idx === 1 ? { color: MAIN_COLORS.gold } : {}}
                    >
                      {value} {idx === 0 ? "%" : ""}
                    </StyledMainTypography>
                  </StyledMainColumn>
                ))}
              </TableBox>
            ))}
        </Box>
      </Box>
      <Box sx={{ paddingTop: "24px" }}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 600, paddingBottom: "9px" }}
        >
          Your Invite Link
        </Typography>
        <Box sx={{ display: "flex", gap: "11px" }}>
          <Box
            sx={{
              width: "100%",
              border: `1px solid ${MAIN_COLORS.contentYellow}`,
              borderRadius: "9px",
              backgroundColor: "rgba(217, 217, 217, 0.12)",
              padding: "19px 21px",
            }}
          >
            <input
              type="text"
              value={inviteText}
              onChange={(e) => setInviteText(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
              }}
            />
          </Box>
          <StyledCopy onClick={copyToClipboard}>
            <img
              src={Copy}
              alt="Copy"
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
          </StyledCopy>
        </Box>
      </Box>
    </Box>
  );
};
export default Referal;
