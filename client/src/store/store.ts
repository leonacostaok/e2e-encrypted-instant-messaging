import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import userGroupReducer from "./userGroupSlice";
//import {setupListeners} from '@reduxjs/toolkit/query/react';

const store = configureStore({
  reducer: {
    userGroupReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat()
});
//setupListeners(store.dispatch);
export default store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
