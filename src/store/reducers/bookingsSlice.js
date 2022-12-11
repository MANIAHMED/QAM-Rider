


import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    data: [],

    loading: false,
    getSingleBooking: [],
    getSingleBookingLoading: false,

    changeStatus: [],
    changeStatusLoading: false,
    cancelBookingsLoading: false,
    updateTestForBookingLoading: false,
    updatePaymentTypeLoading: false,

}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {


        getBookingsData: (state, { payload }) => {
            return {
                ...state,
                loading: payload?.loading,
                data: payload?.data
            }
        },

        changeStatusData: (state, { payload }) => {
            return {
                ...state,
                loading: payload?.loading,
                changeStatus: payload?.data

            }
        },

        cancelBookingsData: (state, { payload }) => {
            return {
                ...state,
                cancelBookingsLoading: payload?.loading
            }
        },

        updateTestForBookingData: (state, { payload }) => {
            return {
                ...state,
                updateTestForBookingLoading: payload?.loading

            }
        },

        updatePaymentTypesData: (state, { payload }) => {
            return {
                ...state,
                updatePaymentTypeLoading: payload?.loading

            }
        },

        getSingleBookingData: (state, { payload }) => {
            return {
                ...state,
                getSingleBooking: payload?.data,
                getSingleBookingLoading: payload?.loading
            }
        },
        updateTestForAppointmentsData: (state,{payload}) =>{
            return {
                ...state,
            }
        },

        updateVTMData:(state,{payload}) => {
            return {
                ...state,
            }
        },
        sendToLabData:(state,{payload}) => {
            return {
                ...state
            }
        },

        cancelAppointmentData:(state,{payload}) =>{
            return {
                ...state
            }
        }

    },
})

export const { getBookingsData, changeStatusData, cancelBookingsData, updateTestForBookingData, updatePaymentTypesData,getSingleBookingData,updateTestForAppointmentsData, updateVTMData,sendToLabData, cancelAppointmentData } = bookingsSlice.actions

export default bookingsSlice.reducer

