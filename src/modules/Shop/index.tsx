import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";

const Shop = () => {
  const [value, setValue] = useState<number>(30);

  const handleGeneratorsSlide = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ padding: "5px 15px 0 15px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>Market</Typography>
      <Stack
        sx={{
          justifyContent: "space-between",
          paddingTop: "8px",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack gap="5px" direction="row">
            <Typography
              bgcolor={MAIN_COLORS.mainGreyBG}
              borderRadius="4px"
              padding="8px 14px"
              fontWeight="800"
            >
              TON
            </Typography>
            <Typography
              bgcolor={MAIN_COLORS.mainGreyBG}
              borderRadius="4px"
              padding="8px 14px"
              fontWeight="800"
            >
              USD
            </Typography>
          </Stack>
          <TextField
            sx={{
              width: "45%",
              borderRadius: "4px",
              backgroundColor: MAIN_COLORS.mainGreyBG,
              "& .MuiOutlinedInput-root": {
                color: MAIN_COLORS.walletButton,
              },
            }}
            variant="outlined"
            placeholder="Your Amount"
          ></TextField>
        </Stack>
        <Slider
          aria-label="Volume"
          value={value}
          sx={{
            color: MAIN_COLORS.activeTabColor,
            "& .MuiSlider-rail": {
              color: MAIN_COLORS.referalBox,
            },
          }}
          onChange={handleGeneratorsSlide}
        />
      </Stack>
    </Box>
  );
};
export default Shop;
