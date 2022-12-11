


import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  data: [],
  loading: false,
 

}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {


    fetchServiceData:(state,{payload})=>{
        return{
            ...state,
            data:payload?.data,
            loading:payload?.loading
        }
    }

 


  },
})

export const { fetchServiceData  } = serviceSlice.actions

export default serviceSlice.reducer

