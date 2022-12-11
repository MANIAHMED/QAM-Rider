import { EXTRAS, COMPLETED_BOOKINGS, USERS, BOOKINGS, LABS, SERVICES } from './types';

export function completedBookings(data) {
    return dispatch => {
        dispatch({
            type: COMPLETED_BOOKINGS,
            payload: data
        })
    }
}

export function services(data) {
    return dispatch => {
        dispatch({
            type: SERVICES,
            payload: data
        })
    }
}

export function labs(data) {
    return dispatch => {
        dispatch({
            type: LABS,
            payload: data
        })
    }
}

export function bookings(data) {
    return dispatch => {
        dispatch({
            type: BOOKINGS,
            payload: data
        })
    }
}

export function users(data) {
    return dispatch => {
        dispatch({
            type: USERS,
            payload: data
        })
    }
}

export function extras(data) {
    return dispatch => {
        dispatch({
            type: EXTRAS,
            payload: data
        })
    }
}