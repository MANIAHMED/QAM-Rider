import { LABS } from "../actions/types";

export default function labReducer(state = [], action) {
    switch (action.type) {
        case LABS:
            return [...action.payload];
        default:
            return state;
    }
}