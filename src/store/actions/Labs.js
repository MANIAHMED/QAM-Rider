import Labs from "../constants/Labs";
import { _setDataToAsyncStorage, getTokenAndSetIntoHeaders } from '../../utils/asyncStorage/Functions';
import { fetchServiceData } from "../reducers/serviceSlice";
import { post, get } from "../../utils/methods";

export const getLabs = (payload, CB) => (dispatch) => {

    const dispatchType = Labs.GET_LABS;

    dispatch(getLabsData({ type: dispatchType, loading: true, data: [] }));

    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
    get(`labs/getAll${queryParams}`,)
        .then(async ({ data }) => {
            if (!data.error) {

                dispatch(getLabsData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(getLabsData({ type: dispatchType, loading: false, data: [] }));
        });
};