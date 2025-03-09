import { Box, Switch, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import USDT from "../../assets/usdt.svg";
import { StyledBasicBox } from "./components/StyledBasicBox";
import Mask from "../../assets/Mask.svg";
import { ButtonStyled } from "./components/ButtonStyled";
import { StyledTableBox } from "./components/StyledTableBox";
import { InfoBox } from "../../shared/components/InfoBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Wallet = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ padding: "5px 15px 0 15px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>Wallet</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
        }}
      >
        <InfoBox value={"234"} subtitle={"Your name coin"} />
        <Box
          sx={{
            backgroundColor: MAIN_COLORS.referalBox,
            border: `1px solid  ${MAIN_COLORS.activeTabColor}`,
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
          paddingTop: "15px",
          paddingBottom: "15px",
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
              color: MAIN_COLORS.activeTabColor,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: MAIN_COLORS.checkboxTrack,
              height: "21px",
            },
          }}
        />
      </Box>
      <TabContext value={value}>
        <TabList
          sx={{
            display: "flex",
            minHeight: "0px",
            "& .MuiTabs-list": {
              gap: "10px",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
          onChange={handleTabChange}
        >
          <Tab
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              padding: "0 10px",
              color: MAIN_COLORS.textColor,
              border: MAIN_COLORS.dailyBorder,
              borderRadius: "5px",
              minHeight: "35px",
              "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
                color: MAIN_COLORS.activeTabColor,
              },
            }}
            label={"Wallet"}
            value={0}
            key={0}
          />
          <Tab
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              padding: "0 10px",
              color: MAIN_COLORS.textColor,
              border: MAIN_COLORS.dailyBorder,
              borderRadius: "5px",
              minHeight: "35px",
              "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
                color: MAIN_COLORS.activeTabColor,
              },
            }}
            label={"History"}
            value={1}
            key={1}
          />
        </TabList>
        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={0}>
          <StyledBasicBox>
            <img
              src={Mask}
              alt="mask"
              style={{ paddingTop: "15px", width: "88px" }}
            />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                paddingLeft: "28px",
                paddingRight: "28px",
                paddingTop: "15px",
                paddingBottom: "15px",
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
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
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
                    color: MAIN_COLORS.activeTabColor,
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
                    color: MAIN_COLORS.activeTabColor,
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
                    color: MAIN_COLORS.activeTabColor,
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
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default Wallet;
