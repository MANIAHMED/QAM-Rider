import { labs as labsAction } from "../actions";
import { GetLabs } from "../../helpers/apis";
import { STATUS } from "../../constants";

export const fetchLabData = () => {
    return async (dispatch) => {
        dispatch(labsAction([]));
        try {
            const response = await GetLabs()
            dispatch(labsAction(response.data.data));
        } catch (error) {
            dispatch(labsAction([]));
        }
    };
};