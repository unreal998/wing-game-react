import { useDispatch, useSelector } from "react-redux";
import { selectErrors } from "./selectors";
import { Alert, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { clearSelectedCountry } from "../../modules/Home/slices";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  console.log("Redux errors:", errors);

  const activeErrors = errors.filter((e) => e.trim() !== "");

  if (activeErrors.length === 0) {
    return null;
  }

  const open = true;

  const handleClose = () => {
    dispatch(clearSelectedCountry());
    navigate("/");
    window.location.reload();
  };

  if (activeErrors.length === 0) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
        Oops, something went wrong: {activeErrors}
      </StyledAlert>
    </Snackbar>
  );
};

export default ErrorPopup;
