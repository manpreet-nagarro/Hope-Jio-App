import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@store/store";
import { showToast } from "@store/toastSlice/toastSlice";
import type { ShowToastPayload } from "@store/toastSlice/toastSlice";

export const useToast = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useSelector((state: RootState) => state.toast);

  const show = (payload: ShowToastPayload) => {
    dispatch(showToast(payload));
  };

  return {
    ...toast,
    show,
  };
};
