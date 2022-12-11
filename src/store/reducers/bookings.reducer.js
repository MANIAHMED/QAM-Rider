import { BOOKINGS } from "../actions/types";

export default function bookingReducer(state = [], action) {
    switch (action.type) {
        case BOOKINGS:
            return [...action.payload];
        default:
            return state;
    }
}