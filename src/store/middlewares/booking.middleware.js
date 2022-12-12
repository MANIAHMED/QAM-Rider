import { bookings as bookingsAction, completedBookings as completedBookingsAction, users } from "../actions";
import { updateExtra } from './extra.middleware'
import {
    GetBookings,
    ChangeStatus,
    GetUserAddress,
    UpdateTestForBooking,
    UpdateTestForAppointment,
    UpdateVTM,
    CancelAppointment,
    GetSingleBooking,
    UpdatePaymentTypes
} from "../../helpers/apis";

import { fetchCompletedBookingData } from "./completed_bookings.middleware";
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { updateUserData } from "./user.middleware";
import io from 'socket.io-client'
import { baseUrl, getUniqueArray, sortByDate } from './../../helpers/index'
import { PAYMENT_TYPE, STATUS } from "../../utils/constant";


export const fetchBookingData = (initial, currentBooking = null, callback = () => { }) => {
    return async (dispatch, getStates) => {
        dispatch(updateExtra({ loading: true, error: '' }))
        if (initial) {
            dispatch(bookingsAction([]));
        }
        try {
            let { user } = getStates()
            let bookings = []

            if (user._id) {
                const response = await GetBookings({ status: [STATUS.BOOKED, STATUS.EN_ROUTE, STATUS.ARRIVED, STATUS.SAMPLE_COLLECTED] })
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
            dispatch(updateExtra({ loading: false, error: '' }))
            dispatch(fetchCompletedBookingData())
            dispatch(bookingsAction(sortByDate(getUniqueArray(bookings, ['_id']))));
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
            dispatch(bookingsAction([]));
        }
    };
};

export const updateLocalBooking = (booking) => {
    return async (dispatch, getStates) => {
        let { bookings } = getStates()
        try {
            let bookingInd = bookings.findIndex(a => a._id == booking._id)
            bookings[bookingInd] = booking

            dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

export const UpdateBookingData = (booking, callback) => {
    return async (dispatch, getStates) => {
        dispatch(updateExtra({ loading: true, error: '' }))
        try {
            let { bookings, completedBookings, user } = getStates()
            
            let additionalBody = {}

            if (booking.status == STATUS.COMPLETED) {
                additionalBody.remarks = booking.remarks
            }

            await ChangeStatus({ _id: booking._id, status: booking.status, ...additionalBody })

            if (booking.status == STATUS.COMPLETED) {
                bookings.splice(bookings.findIndex((a) => a._id == booking._id), 1)
                dispatch(completedBookingsAction(sortByDate([booking, ...completedBookings])))
                BackgroundGeolocation.checkStatus(status => {
                    if (status.isRunning && !bookings.length && !user.isAvailable) {
                        BackgroundGeolocation.stop()
                    }
                });
                dispatch(updateUserData())
            } else {
                bookings[bookings.findIndex((a) => a._id == booking._id)] = booking
            }

            if (booking.status == STATUS.EN_ROUTE) {
                user.address = await GetUserAddress(user.location.coordinates[1], user.location.coordinates[0])
                socket.emit('bookings', { booking: booking._id, vehicle: user._id, status: STATUS.EN_ROUTE })
            } else if (booking.status == STATUS.ARRIVED) {
                socket.emit('bookings', { booking: booking._id, status: STATUS.ARRIVED })
            } else if (booking.status == STATUS.COMPLETED) {
                user.address = booking.address
                socket.emit('bookings', { booking: booking._id, status: STATUS.COMPLETED })
            }

            let res = await GetSingleBooking(booking._id)
            bookings[bookings.findIndex((a) => a._id == booking._id)] = res.data.data

            dispatch(users({ ...user }))
            dispatch(updateExtra({ loading: false, error: '' }))
            dispatch(bookingsAction(sortByDate(getUniqueArray(bookings, ['_id']))));
            callback({ data: res.data.data, error: false })
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
            callback({ error: true })
        }
    };
};

export const UpdateBookingToCancel = (bookingId) => {
    return async (dispatch, getStates) => {
        let { bookings } = getStates()
        let ind = bookings.findIndex(a => a._id == bookingId)
        if (ind == -1) {
            return
        }
        bookings.splice(ind, 1)
        dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
    };
};

export const UpdateAppointmentToCancel = (appointmentId, bookingId, callback = () => { }) => {
    return async (dispatch, getStates) => {
        dispatch(updateExtra({ loading: true, error: '' }))
        try {
            let { bookings } = getStates()

            await CancelAppointment({ _id: appointmentId })
            let res = await GetSingleBooking(bookingId)

            let bookingInd = bookings.findIndex(a => a._id == bookingId)
            bookings[bookingInd] = res.data.data

            dispatch(updateExtra({ loading: false, error: '' }))
            dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
            callback(res.data.data)
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

export const updateAppointmentTest = (appointmentId, testId, bookingId, price, callback = () => { }) => {
    return async (dispatch, getStates) => {
        let { bookings, user } = getStates()
        try {
            dispatch(updateExtra({ loading: true, error: '' }))
            let resp = await UpdateTestForAppointment({ _id: appointmentId, subService: testId, price })

            if (!resp.data.data.greater) {
                let bookingInd = bookings.findIndex(a => a._id == bookingId)
                bookings[bookingInd] = resp.data.data.data
            }
            callback({ data: resp.data.data.data, greater: resp.data.data.greater })
            dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
            dispatch(updateExtra({ loading: false, error: '' }))
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

export const updateBookingTest = (bookingId, testId, price, callback = () => { }) => {
    return async (dispatch, getStates) => {
        let { bookings, user } = getStates()
        try {
            dispatch(updateExtra({ loading: true, error: '' }))
            let resp = await UpdateTestForBooking({ _id: bookingId, subService: testId, price })

            if (!resp.data.data.greater) {
                let bookingInd = bookings.findIndex(a => a._id == bookingId)
                bookings[bookingInd] = resp.data.data.data
            }

            callback({ data: resp.data.data.data, greater: resp.data.data.greater })
            dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
            dispatch(updateExtra({ loading: false, error: '' }))
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

export const updatePaymentTypes = (body, callback = () => { }) => {
    return async (dispatch, getStates) => {
        let { bookings, user } = getStates()
        try {
            let bookingId = body._id
            dispatch(updateExtra({ loading: true, error: '' }))
            let resp = await UpdatePaymentTypes(body)

            let bookingInd = bookings.findIndex(a => a._id == bookingId)
            bookings[bookingInd] = resp.data.data

            callback(resp.data.data)
            dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
            dispatch(updateExtra({ loading: false, error: '' }))
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

export const updateVTMAndLab = ({ appointmentId, vtmNo, labId, labName, images = [], bookingId }, callback) => {
    return async (dispatch, getStates) => {
        let { bookings } = getStates()
        try {
            dispatch(updateExtra({ loading: true, error: '' }))
            let body = new FormData()
            body.append('_id', appointmentId)
            body.append('vtmNumber', vtmNo)
            body.append('labId', labId)
            body.append('lab', labName)

            images.forEach((image) => {
                body.append('consentForm', {
                    name: image.fileName,
                    uri: image.uri,
                    type: image.type,
                })
            })

            await UpdateVTM(body)
            let bookingInd = bookings.findIndex(a => a._id == bookingId)
            let appointmentInd = bookings[bookingInd].appointments.findIndex(a => a._id == appointmentId)
            bookings[bookingInd].appointments[appointmentInd].status = STATUS.SAMPLE_COLLECTED

            let res = await GetSingleBooking(bookingId)

            callback(res.data.data)
            dispatch(bookingsAction(sortByDate(getUniqueArray([...bookings], ['_id']))));
            dispatch(updateExtra({ loading: false, error: '' }))
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

