import {AppState, useAppDispatch, useAppSelector} from "../store/store";
import {resetCountUser, updateCountUser} from "../store/userGroupSlice";
import {useCallback} from "react";

export const useCreateGroup = () => {
    const dispatch = useAppDispatch()
    const {count} = useAppSelector((state: AppState) => state.userGroupReducer);
    const updateCountUserFnc = useCallback(({type}:{type:string}) => {
      dispatch(updateCountUser({type}))
    },[dispatch])
    const resetCountUserFnc = useCallback(() => {
      dispatch(resetCountUser())
    },[dispatch])
    return {
      count,
      updateCountUserFnc,
      resetCountUserFnc
    }
}
