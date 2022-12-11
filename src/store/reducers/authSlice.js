


import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  user: {},
  loading: false,
  userLoggedIn: true,
  getProfileLoading: false,
  checkTokenLoading: false,
  setAvailable: false,
  setAvailableLoading: false,
  setUnavailable: false,
  setUnavailableLoading:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {


    loginData: (state, { payload }) => {
      return {
        ...state,
        loading: payload?.loginLoading,
        userLoggedIn: payload?.userLoggedIn
      }
    },

    getProfileData: (state, { payload }) => {
      return {
        ...state,
        user: payload?.user,
        getProfileLoading: payload?.loading,
        userLoggedIn: payload?.userLoggedIn

      }
    },

    setAvailableData: (state,{payload})=>{
      return{
        ...state,
        setAvailable: payload?.data,
        setAvailableLoading: payload?.loading
      }
    },

    setUnavailableData: (state,{payload})=>{
      return{
        ...state,
        setUnavailable: payload?.data,
        setUnavailableLoading: payload?.loading
      }
    },
    logoutData:(state,{payload})=>{
      return {
        ...state
      }
    }





  },
})

export const { loginData,getProfileData,setAvailableData, setUnavailableData ,logoutData } = authSlice.actions

export default authSlice.reducer

