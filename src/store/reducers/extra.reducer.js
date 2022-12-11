import { EXTRAS } from "../actions/types";

export default function extraReducer(state = { error: '', loading: false, administration_number: '+971 4355 6643' }, action) {
    switch (action.type) {
        case EXTRAS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}