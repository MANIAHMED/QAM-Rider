import { completedBookings as completedBookingsAction } from "../actions";
import { GetBookings, SendToLab } from "../../helpers/apis";
import { STATUS } from "../../utils/constant";
import { getUniqueArray, sortByDate } from "../../helpers";
import { updateExtra } from './extra.middleware'

export const fetchCompletedBookingData = () => {
    return async (dispatch) => {
        dispatch(completedBookingsAction([]));
        try {
            const response = await GetBookings({ status: [STATUS.COMPLETED] })
            dispatch(completedBookingsAction(sortByDate(response.data.data)));
        } catch (error) {
            dispatch(completedBookingsAction([]));
        }
    };
};

export const sendToLab = (appointmentId, bookingId) => {
    return async (dispatch, getStates) => {
        let { completedBookings } = getStates()
        try {
            dispatch(updateExtra({ loading: true, error: '' }))
            await SendToLab({ _id: appointmentId })

            let completedBookingInd = completedBookings.findIndex(a => a._id == bookingId)
            let appointmentInd = completedBookings[completedBookingInd].appointments.findIndex(a => a._id == appointmentId)
            completedBookings[completedBookingInd].appointments[appointmentInd].sendToLab = true

            dispatch(completedBookingsAction(sortByDate(getUniqueArray([...completedBookings], ['_id']))));
            dispatch(updateExtra({ loading: false, error: '' }))
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

