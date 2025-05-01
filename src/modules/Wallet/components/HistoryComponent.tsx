import HistoryItem from "./HistoryItem";
import { HistoryWrapperBox } from "./HistoryWrapperBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../Header/selectors";
import { selectWithdrawData } from "../selectors";
import { getWithdrawAction } from "../slices";

export const HistoryComponent = () => {
  const userData = useSelector(selectUserData());
  const withdrawData = useSelector(selectWithdrawData());
  const dispatch = useDispatch();
  const formatMinutes = (dateVal: any) => {
    const minutes = new Date(dateVal || 0).getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  };

  useEffect(() => {
    if (userData) dispatch(getWithdrawAction(userData.id));
  }, [dispatch, userData]);

  return (
    <HistoryWrapperBox sx={{ marginTop: "5px" }}>
      {withdrawData.map((withdraw, i) => (
        <HistoryItem
          key={i}
          date={new Date(withdraw.created_at || 0).toLocaleDateString()}
          time={`${new Date(withdraw.created_at || 0).getHours()}:${formatMinutes(withdraw.created_at)}`}
          amount={`${withdraw.sum} TON`}
          status={withdraw.status}
        />
      ))}
    </HistoryWrapperBox>
  );
};
