import { useSelector } from "react-redux";
import { selectErrors } from "./selectors";
import { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: "#1a237e", // Dark blue background
  color: "#ffffff", // White text
  maxWidth: "300px",
  borderLeft: "4px solid #ff5252", // Red accent border
  "& .MuiAlert-icon": {
    color: "#ff5252", // Red icon
  },
  "& .MuiAlert-action": {
    paddingLeft: "16px",
  },
}));

const ErrorPopup = () => {
  const errors = useSelector(selectErrors);
  errors.push("5.44.33");
  const [open, setOpen] = useState(true);
  const activeErrors = errors.filter(
    (error: string) => error[0] === "5" || error[0] === "4",
  );
  const handleClose = () => setOpen(false);
  if (activeErrors.length === 0 || !open) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        marginTop: "30px",
        "& .MuiPaper-root": {
          borderRadius: "8px",
        },
      }}
    >
      <StyledAlert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleClose}
            sx={{
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              padding: "2px 8px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            OK
          </Button>
        }
      >
        Oops, something went wrong: {activeErrors[0]}
      </StyledAlert>
    </Snackbar>
  );
};

export default ErrorPopup;
