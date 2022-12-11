


import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  data: [],
  loading: false,
  userAddress: [],
  userAddressLoading: false

}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {


    getAdministrationNumberData: (state, { payload }) => {
      return {
        ...state,
        loading: payload?.loading,
        data: payload?.data
      }
    },

    getUserAddressData: (state,{payload})=>{
      return {
        ...state,
        userAddress:payload?.data,
        userAddressLoading:payload?.loading
      }
    }


  },
})

export const { getAdministrationNumberData  } = commonSlice.actions

export default commonSlice.reducer

