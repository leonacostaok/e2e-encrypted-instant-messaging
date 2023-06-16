import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TypeStateUserGroup {
  count: number
}
const initialState:TypeStateUserGroup = {
  count: 0
}
const userGroupSlice = createSlice({
  name: 'userGroupSlice',
  initialState,
  reducers:{
    updateCountUser: (state,action) => {
      const {payload} = action
       if(payload.type === 'DECREASE'){
         state.count -= 1
       }
       if(payload.type === 'INCREASE'){
         state.count += 1
       }
    },
    resetCountUser: (state) => {
      state.count = 0
    }
  }
})
export const {updateCountUser,resetCountUser} = userGroupSlice.actions
export default userGroupSlice.reducer
