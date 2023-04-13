import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
    phone: "",
    image: "",
  
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.image = action.payload.image;
          } 
    }
})

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;