import Bookings from "../constants/Bookings";
import { cancelAppointmentData, cancelBookingsData, changeStatusData, getBookingsData, getSingleBookingData, sendToLabData, updatePaymentTypesData, updateTestForAppointmentsData, updateTestForBookingData, updateVTMData } from "../reducers/bookingsSlice";
import { post, get } from "../../utils/methods";
import { post, get } from "../../utils/methods";
import { sortByDate, getUniqueArray } from '../../utils/helpers';


export const getBookings = (payload, CB) => (dispatch) => {
    const dispatchType = Bookings.GET_BOOKINGS;
    dispatch(getBookingsData({ type: dispatchType, loading: true, data: [] }));
    post(`bookings/getBookingsForVehicles`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(getBookingsData({ type: dispatchType, loading: false, data: data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(getBookingsData({ type: dispatchType, loading: true, data: [] }));
        });
};

export  function bookings(data) {

    return dispatch => {
        dispatch({type : Bookings.GET_BOOKINGS, payload: data})
    }

}

export const fetchBookingData = (initial, currentBooking = null, callback = () => { }) => {
    return async (dispatch, getStates) => {
        // dispatch(updateExtra({ loading: true, error: '' }))
        if (initial) {
            dispatch(bookings([]));
        }
        try {
            let { user } = getStates()
            let bookings = []

            if (user._id) {
                const response = await getBookings({ status: [STATUS.BOOKED, STATUS.EN_ROUTE, STATUS.ARRIVED, STATUS.SAMPLE_COLLECTED] })
                bookings = response.data.data
            }

            if (initial) {
                socket.on(user._id + ',bookings', (data) => {
                    console.log('bookings socket')
                    let { bookings } = getStates()
                    dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings, data], ['_id']))));
                })
            }

            let callbackData = null

            if (currentBooking) {
                let bookingInd = bookings.findIndex(a => a._id == currentBooking)
                if (bookingInd != -1) {
                    callbackData = bookings[bookingInd]
                }
            }

            callback(callbackData)
            // dispatch(updateExtra({ loading: false, error: '' }))
            dispatch(fetchCompletedBookingData())
            dispatch(bookingsAction(sortByDate(getUniqueArray(bookings, ['_id']))));
        } catch (error) {
            // dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
            dispatch(bookingsAction([]));
        }
    };
};

export const changeStatus = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.CHANGE_STATUS;
    dispatch(changeStatusData({ type: dispatchType, loading: true, data: [] }));
    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
    get(`bookings/changeStatus${queryParams}`)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(changeStatusData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(changeStatusData({ type: dispatchType, loading: false, data: [] }));
        });
};


export const cancelBookings = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.CANCEL_BOOKINGS;
    dispatch(cancelBookingsData({ type: dispatchType, loading: true,  }));
    post(`bookings/cancel`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(cancelBookingsData({ type: dispatchType, loading: false,  }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(cancelBookingsData({ type: dispatchType, loading: true,  }));
        });
};

export const updateTestForBooking = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.UPDATE_TEST_FOR_BOOKING;
    dispatch(updateTestForBookingData({ type: dispatchType, loading: true, data:[]  }));
    post(`bookings/changeBookedService`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(updateTestForBookingData({ type: dispatchType, loading: false, data:data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(updateTestForBookingData({ type: dispatchType, loading: true, data: []  }));
        });
};

export const updatePaymentTypes = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.UPDATE_PAYMENT_TYPE;
    dispatch(updatePaymentTypesData({ type: dispatchType, loading: true, data:[]  }));
    post(`bookings/updateGreaterAppointments`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(updatePaymentTypesData({ type: dispatchType, loading: false, data:data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(updatePaymentTypesData({ type: dispatchType, loading: true, data: []  }));
        });
};

export const getSingleBooking = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.GET_SINGLE_BOOKING;
    dispatch(getSingleBookingData({ type: dispatchType, loading: true, data: [] }));
    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
    get(`bookings/getBookingsById${queryParams}`,)
        .then(async ({ data }) => {
            if (!data.error) {

                dispatch(getSingleBookingData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(getSingleBookingData({ type: dispatchType, loading: false, data: [] }));
        });
};

export const updateTestForAppointments = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.UPDATE_TEST_FOR_APPOINTMENT;
    dispatch(updateTestForAppointmentsData({ type: dispatchType, loading: true, data: [] }));
    post(`appointments/subServiceUpdate`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(updateTestForAppointmentsData({ type: dispatchType, loading: false, data: data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(updateTestForAppointmentsData({ type: dispatchType, loading: true, data: [] }));
        });
};

export const updateVTM = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.UPDATE_VTM;
    dispatch(updateVTMData({ type: dispatchType, loading: true, data: [] }));
    post(`appointments/updateVTMandLab`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(updateVTMData({ type: dispatchType, loading: false, data: data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(updateVTMData({ type: dispatchType, loading: true, data: [] }));
        });
};

export const sendToLab = (payload, CB) => (dispatch) => {

    const dispatchType = Bookings.SEND_TO_LAB;
    dispatch(sendToLabData({ type: dispatchType, loading: true, data: [] }));
    post(`appointments/sendToLab`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(sendToLabData({ type: dispatchType, loading: false, data: data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(sendToLabData({ type: dispatchType, loading: true, data: [] }));
        });
};

export const cancelAppointment = (payload, CB) => (dispatch) => {
    
    const dispatchType = Bookings.CANCEL_APPOINTMENT;
    dispatch(cancelAppointmentData({ type: dispatchType, loading: true, data: [] }));
    post(`appointments/cancel`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                dispatch(cancelAppointmentData({ type: dispatchType, loading: false, data: data?.data }));
            } 
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(cancelAppointmentData({ type: dispatchType, loading: true, data: [] }));
        });
};