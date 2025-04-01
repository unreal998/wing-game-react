import { useSelector } from "react-redux";
import { selectErrors } from "./selectors";
import { useState } from "react";

const ErrorPopup = () => {
  const errors = useSelector(selectErrors);
  const [toggle, setToggle] = useState(true);
  const activeErrors = errors.filter(
    (error: string) => error[0] === "5" || error[0] === "4",
  );
  if (activeErrors.length === 0 || !toggle) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        top: "30px",
        right: "20px",
        border: "1px solid #ef9a9a",
        padding: "15px",
        borderRadius: "4px",
        maxWidth: "300px",
      }}
    >
      Opps, something went wrong {activeErrors[0]}
      <button onClick={() => setToggle(false)}>OK</button>
    </div>
  );
};

export default ErrorPopup;
