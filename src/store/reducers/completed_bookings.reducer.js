import { COMPLETED_BOOKINGS } from "../actions/types";

export default function completedBookingReducer(state = [], action) {
    switch (action.type) {
        case COMPLETED_BOOKINGS:
            return [...action.payload];
        default:
            return state;
    }
}