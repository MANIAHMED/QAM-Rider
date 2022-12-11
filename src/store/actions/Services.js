import Service from "../constants/Services";
import { _setDataToAsyncStorage, getTokenAndSetIntoHeaders } from '../../utils/asyncStorage/Functions';
import { fetchServiceData } from "../reducers/serviceSlice";
import { post, get } from "../../utils/methods";



export const getService = (payload, CB) => (dispatch) => {

    const dispatchType = Service.FETCH_SERVICE;

    dispatch(fetchServiceData({ type: dispatchType, loading: true, data: [] }));

    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
    
    get(`vendors/getAllSubservices${queryParams}`,)
        .then(async ({ data }) => {
            if (!data.error) {

                dispatch(fetchServiceData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(fetchServiceData({ type: dispatchType, loading: false, data: [] }));
        });
};