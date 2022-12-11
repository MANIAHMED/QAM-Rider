import Common from "../constants/Common";
import { _setDataToAsyncStorage, getTokenAndSetIntoHeaders } from '../../utils/asyncStorage/Functions';
import { getAdministrationNumberData } from "../reducers/authSlice";
import { googleApiKey } from "../../utils/constant";
import { post, get } from "../../utils/methods";


export const getAdministrationNumber = (payload, CB) => (dispatch) => {

    const dispatchType = Common.GET_ADMINISTRATION_NUMBER;

    dispatch(getAdministrationNumberData({ type: dispatchType, loading: true, data: [] }));
    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
    get(`masters/getAdministratorNumber${queryParams}`,)
        .then(async ({ data }) => {
            console.log("oooo", data)
            if (!data.error) {

                dispatch(getAdministrationNumberData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(getAdministrationNumberData({ type: dispatchType, loading: false, data: [] }));
        });
};


export const getUserAddress = (lat,lng, CB) => (dispatch) => {
    const dispatchType = Common.GET_LOCATION;


    dispatch(getUserAddressData({ type: dispatchType, loading: true, data: [] }));

    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';


    get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`)
        .then(async ({ data }) => {
            if (!data.error) {

                dispatch(getUserAddressData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(getUserAddressData({ type: dispatchType, loading: false, data: [] }));
        });
};

