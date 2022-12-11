import { USERS } from "../actions/types";

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case USERS:
            return { ...action.payload }
        default:
            return state;
    }
}