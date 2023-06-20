import {createSlice} from "@reduxjs/toolkit";
interface PropsTypeChatRoom{
  data:any[]
}
const initialState:PropsTypeChatRoom = {
  data: []
}
const chatRoomSlice = createSlice({
  initialState,
  name: 'chatRoomSlice',
  reducers:{
    updateContentForward:(state,action) => {
      const {data,type} = action.payload
      const cloneState = [...state.data]
      if(type === 'REMOVE'){
        const indexRemove = cloneState.findIndex((item:any) => item.id === data.id)
        cloneState.splice(indexRemove,1)
        state.data = [...cloneState]
      }
      if(type === 'ADD'){
        state.data = [...cloneState,data]
      }
    },
    resetContentForward:(state) => {
      state.data = []
    }
  }
})
export const {updateContentForward,resetContentForward} = chatRoomSlice.actions
export default chatRoomSlice.reducer
