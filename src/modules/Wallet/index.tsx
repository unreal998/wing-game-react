import { Box, Button, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import USDT from "../../assets/usdt.svg";
import { StyledBasicBox } from "./components/StyledBasicBox";
import Mask from "../../assets/Mask.svg";
import { ButtonStyled } from "./components/ButtonStyled";
import { StyledTableBox } from "./components/StyledTableBox";

const Wallet = () => {
  return (
    <Box sx={{ padding: "0px 15px 0 15px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>Wallet</Typography>
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
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              padding: "0px 15px 9px 15px",
            }}
          >
            Your name coin
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: MAIN_COLORS.referalBox,
            border: `1px solid  ${MAIN_COLORS.contentYellow}`,
            display: "flex",
            borderRadius: "9px",
            alignItems: "center",
          }}
        >
          <Box sx={{ paddingLeft: "14px" }}>
            <img src={USDT} alt="usdt" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                padding: "9px 26px 0px 26px",
              }}
            >
              234
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 700, paddingBottom: "9px" }}
            >
              TON
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
        }}
      >
        <Typography
          sx={{
            color: MAIN_COLORS.textColor,
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Auto payout
        </Typography>
        <Switch
          sx={{
            alignItems: "center",
            display: "flex",
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: MAIN_COLORS.contentYellow,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: MAIN_COLORS.checkboxTrack,
              height: "21px",
            },
          }}
        />
      </Box>
      <StyledBasicBox sx={{ marginTop: "0" }}>
        <img
          src={Mask}
          alt="mask"
          style={{ paddingTop: "5px", width: "88px" }}
        />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            paddingLeft: "28px",
            paddingRight: "28px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          Connect your wallet to access <br />
          upcoming crypto features. Our team is working <br /> hard to bring
          them to you soon!
        </Typography>
        <ButtonStyled>
          <Typography
            sx={{
              color: "inherit",
              fontSize: "12px",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            Connect wallet
          </Typography>
        </ButtonStyled>
      </StyledBasicBox>
      <StyledTableBox sx={{ marginTop: "5px" }}>
        <Box
          sx={{
            width: "100hv",
            marginRight: "15px",
            paddingLeft: "18px",
            paddingTop: "5px",
            paddingBottom: "5px",
            display: "flex",
            borderBottom: `1px solid ${MAIN_COLORS.referalBottom}`,
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 900 }}>
            History
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100hv",
            marginRight: "15px",
            paddingLeft: "18px",
            paddingTop: "4px",
            paddingBottom: "4px",
            display: "flex",
            borderBottom: `1px solid ${MAIN_COLORS.referalBottom}`,
          }}
        >
          <Box sx={{ flex: 1.2 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              2024.06.04{" "}
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              18:02
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.8,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Typography
              sx={{
                color: MAIN_COLORS.contentYellow,
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              5,000
            </Typography>
            <Typography
              sx={{
                color: MAIN_COLORS.textColor,
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              BONUS
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100hv",
            marginRight: "15px",
            paddingLeft: "18px",
            paddingTop: "4px",
            paddingBottom: "4px",
            display: "flex",
            borderBottom: `1px solid ${MAIN_COLORS.referalBottom}`,
          }}
        >
          <Box sx={{ flex: 1.2 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              2024.06.04{" "}
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              18:02
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.8,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Typography
              sx={{
                color: MAIN_COLORS.contentYellow,
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              5,000
            </Typography>
            <Typography
              sx={{
                color: MAIN_COLORS.textColor,
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              BONUS
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100hv",
            marginRight: "15px",
            paddingLeft: "18px",
            paddingTop: "4px",
            paddingBottom: "4px",
            display: "flex",
            borderBottom: `1px solid ${MAIN_COLORS.referalBottom}`,
          }}
        >
          <Box sx={{ flex: 1.2 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              2024.06.04{" "}
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              18:02
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.8,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Typography
              sx={{
                color: MAIN_COLORS.contentYellow,
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              5,000
            </Typography>
            <Typography
              sx={{
                color: MAIN_COLORS.textColor,
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              BONUS
            </Typography>
          </Box>
        </Box>
      </StyledTableBox>
    </Box>
  );
};
export default Wallet;
