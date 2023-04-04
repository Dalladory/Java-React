import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import AcntionsCreators from "../store/action-creators";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(AcntionsCreators, dispatch);
};
