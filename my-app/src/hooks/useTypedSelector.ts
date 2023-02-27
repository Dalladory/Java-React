import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer } from "../store/reducers/rootReducer";

type rootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;
