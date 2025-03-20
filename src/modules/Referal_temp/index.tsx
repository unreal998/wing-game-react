import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
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
import { StyledBasicBox } from "./components/StyledBasicBox";
import { StyledInputBox } from "./components/StyledInputBox";
import { StyledInput } from "./components/StyledInput";
import { heightProportion } from "../../shared/utils";
import { InfoBox } from "../../shared/components/InfoBox";

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

  const tableHeight = useMemo(() => {
    return heightProportion - 285;
  }, []);

  return (
    <Box sx={{ padding: "5px 15px 0 15px", height: `${heightProportion}px` }}>
      <Box>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 700, paddingBottom: "8px" }}
        >
          Referal
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InfoBox value={"234"} subtitle={"Your bonus"}></InfoBox>
          <InfoBox value={"10 %"} subtitle={"Your bonus"}></InfoBox>
        </Box>
        <StyledBasicBox height={`${tableHeight}px`}>
          <TableBox>
            <StyledHeader sx={{ flex: 1.6, paddingLeft: "5px" }}>
              <TableBoxHead>
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  User
                </Typography>
              </TableBoxHead>
            </StyledHeader>
            <StyledHeader sx={{ flex: 0.7 }}>
              <TableBoxHead>
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  Level
                </Typography>
              </TableBoxHead>
            </StyledHeader>
            <StyledHeader sx={{ flex: 0.7 }}>
              <TableBoxHead>
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  Coin
                </Typography>
              </TableBoxHead>
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
        </StyledBasicBox>
        <Box sx={{ paddingTop: "24px" }}>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, paddingBottom: "9px" }}
          >
            Your Invite Link
          </Typography>
          <Box sx={{ display: "flex", gap: "11px" }}>
            <StyledInputBox>
              <StyledInput
                type="text"
                value={inviteText}
                onChange={(e) => setInviteText(e.target.value)}
              />
            </StyledInputBox>
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
    </Box>
  );
};

export default Referal;
