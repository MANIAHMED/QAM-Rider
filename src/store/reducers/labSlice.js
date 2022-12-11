


import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  data: [],
  loading: false,
 

}

export const labSlice = createSlice({
  name: 'labs',
  initialState,
  reducers: {


    getLabsData:(state,{payload})=>{
        return{
            ...state,
            data:payload?.data,
            loading:payload?.loading
        }
    }

 


  },
})

export const { getLabsData  } = labSlice.actions

export default labSlice.reducer

