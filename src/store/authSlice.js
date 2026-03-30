import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null|| JSON.parse(  window.localStorage.getItem("user"))

    },
    reducers:{
        setUser: (state,action)=>{


            state.user = action.payload;

            window.localStorage.setItem('user',JSON.stringify(action.payload));

        },
        removeUser: (state)=>{
            state.user = null;

            window.localStorage.setItem('user', 'null');

        },
    }
});
export const {setUser, removeUser} = authSlice.actions
export default authSlice.reducer;