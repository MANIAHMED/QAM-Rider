import { extras as extrasAction } from '../actions/index'
import { GetAdminitrationNumber } from '../../helpers/apis';

export const updateExtra = (extra) => {
    return (dispatch, getState) => {
        console.log(extra, 'ERROR')
        let { extras } = getState()
        dispatch(extrasAction({ ...extras, ...extra }));
    };
}

export const FetchAdminitrationNumber = () => {
    return async (dispatch, getState) => {
        let { extras } = getState()
        try {
            let resp = await GetAdminitrationNumber()
            dispatch(extrasAction({ ...extras, administration_number: resp.data.data.administrationNumber }));
        } catch (error) {
            dispatch(extrasAction(extras));
        }
    };
}