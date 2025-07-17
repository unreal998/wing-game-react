import HistoryItem from "./HistoryItem";
import { HistoryWrapperBox } from "./HistoryWrapperBox";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../Header/selectors";
import { selectHistoryData } from "../selectors";
import { getHistoryAction } from "../slices";
import { heightProportion } from "../../../shared/utils";

export const HistoryComponent = () => {
  const userData = useSelector(selectUserData());
  const historyData = useSelector(selectHistoryData());
  const dispatch = useDispatch();
  const formatMinutes = (dateVal: any) => {
    const minutes = new Date(dateVal || 0).getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  };

  useEffect(() => {
    if (userData) dispatch(getHistoryAction(userData.id));
  }, [dispatch, userData]);

  const wrapperHeight = useMemo(() => {
    return heightProportion - 200;
  }, []);

  return (
    <HistoryWrapperBox sx={{ marginTop: "5px", height: `${wrapperHeight}px` }}>
      {historyData?.map((withdraw, i) => (
        <HistoryItem
          key={i}
          date={new Date(withdraw.created_at || 0).toLocaleDateString()}
          time={`${new Date(withdraw.created_at || 0).getHours()}:${formatMinutes(withdraw.created_at)}`}
          amount={` ${withdraw.type === "transaction" ? "+" : "-"} ${withdraw.sum} TON`}
          status={withdraw.status}
        />
      ))}
    </HistoryWrapperBox>
  );
};
