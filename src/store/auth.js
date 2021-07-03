import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{signStatus:false ,id:'',userName:''},
    reducers:{
        loginHandler(state,action){
            state.id=action.payload.token;
            state.signStatus=true;
            state.userName=action.payload.username;
        },
        logoutHandler(state){
            state.signStatus=false;
            state.id='';
        }
    }
})

export const authActions=authSlice.actions;

export default authSlice;