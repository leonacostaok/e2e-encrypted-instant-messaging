import {AppState, useAppDispatch, useAppSelector} from "../store/store";
import {resetContentForward, updateContentForward} from "../store/chatRoomSlice";

export const useChatRoom = () => {
  const dispatch = useAppDispatch()
  const {data} = useAppSelector((state: AppState) => state.chatRoomReducer);
  const updateContentForwardFnc = (data:any) =>{
    dispatch(updateContentForward(data))
  }
  const resetContentForwardFnc = () => {
    dispatch(resetContentForward())
  }
  return {
    data,
    updateContentForwardFnc,
    resetContentForwardFnc
  }
}
