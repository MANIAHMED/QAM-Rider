import Auth from "../constants/Auth";
import { _setDataToAsyncStorage, getTokenAndSetIntoHeaders, getValueIntoAsyncStorage } from '../../utils/asyncStorage/Functions';
import { loginData, logoutData, setAvailableData, setUnavailableData } from "../reducers/authSlice";
import { TOKEN } from "../../utils/asyncStorage/Constants";
import { post, get } from "../../utils/methods";


export const login = (payload, CB) => (dispatch) => {

    const dispatchType = Auth.LOGIN_USER_API;
    dispatch(loginData({ type: dispatchType, loginLoading: true, userLoggedIn: false }));
    post(`vehicles/login`, payload)
        .then(async ({ data }) => {
            if (!data.error) {
                if (!data?.data?.token) {
                    CB && CB({ email: payload?.email });
                    dispatch(loginData({ type: dispatchType, loginLoading: false, }));
                } else {
                    await _setDataToAsyncStorage(TOKEN, data?.data?.token);
                    await getTokenAndSetIntoHeaders(data?.data?.token);
                    dispatch(loginData({ type: dispatchType, user: data.data.user, loginLoading: false, userLoggedIn: true, }));
                }
            } else {
                handleError(data?.data?.message || 'Something went wrong!');
                dispatch(loginData({ type: dispatchType, loginLoading: false, userLoggedIn: false }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(loginData({ type: dispatchType, loginLoading: false, userLoggedIn: false }));
        });
};

export const checkAuth = (payload,CB) => async (dispatch) => {
    const dispatchType = Auth.GET_USER_PROFILE;
    let token = await getValueIntoAsyncStorage(TOKEN);
    if (token) {
        await getTokenAndSetIntoHeaders(token);
        dispatch(getProfileData({
            type: dispatchType,
            loading: true,
            userLoggedIn: false
        }));
        get(`vehicles/get`)
            .then(async ({ data }) => {
                if (!data.error) {
                    dispatch(getProfileData({
                        type: dispatchType,
                        loading: false,
                        user: data?.data,
                        userLoggedIn: true
                    }));
                } else {
                    handleError(data?.data?.message || 'Something went wrong!');
                    dispatch(getProfileData({
                        type: dispatchType,
                        loading: false,
                        userLoggedIn: false
                    }));
                }
            })
            .catch((error) => {
                dispatch(getProfileData({
                    type: dispatchType,
                    loading: false,
                    userLoggedIn: true
                }));
                console.log("error", error);
            });
    } else {
        dispatch(logout())
    }
};

export const setAvailable = (payload,CB) => async (dispatch) => {

    const dispatchType = Auth.SET_AVAILABLE;
    dispatch(setAvailableData({
        type: dispatchType,
        loading: true,
        data: []
      
    }));
    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
      get(`vehicles/setAvailablility${queryParams}`)
            .then(async ({ data }) => {
                if (!data.error) {
                    dispatch(setAvailableData({
                        type: dispatchType,
                        loading: false,
                        data: data?.data
                      
                    }));
                } 
            })
            .catch((error) => {
                dispatch(setAvailableData({
                    type: dispatchType,
                    loading: false,
                    data: []                  
                }));
                console.log("error", error);
            });
    
};

export const setUnavailable = (payload, CB) => async (dispatch) => {
    
    const dispatchType = Auth.SET_UNAVAILABLE;
    dispatch(setUnavailableData({
        type: dispatchType,
        loading: true,
        data: []
      
    }));
    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';
      get(`vehicles/setAvailablility${queryParams}`)
            .then(async ({ data }) => {
                if (!data.error) {
                    dispatch(setUnavailableData({
                        type: dispatchType,
                        loading: false,
                        data: data?.data
                      
                    }));
                } 
            })
            .catch((error) => {
                dispatch(setUnavailableData({
                    type: dispatchType,
                    loading: false,
                    data: []                  
                }));
                console.log("error", error);
            });
    

};

export const logout = (payload, CB) => (dispatch) => {

    const dispatchType = Auth.LOGOUT_USER_API;
    dispatch(logoutData({ type: dispatchType, loading: true, data: [] }));
    let queryParams = encodeQueryData(payload) ? `?${encodeQueryData(payload)}` : '';

    get(`vehicles/logout${queryParams}`,)
        .then(async ({ data }) => {
            if (!data.error) {

                dispatch(logoutData({ type: dispatchType, message: data?.data?.message, data: data?.data }));
            }
        })
        .catch((error) => {
            console.log('login catch', error);
            dispatch(logoutData({ type: dispatchType, loading: false, data: [] }));
        });
};
