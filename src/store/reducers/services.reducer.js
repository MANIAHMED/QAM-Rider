import { SERVICES } from "../actions/types";

export default function servicesReducer(state = [], action) {
    switch (action.type) {
        case SERVICES:
            return [...action.payload];
        default:
            return state;
    }
}