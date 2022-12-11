import { services as servicesAction } from "../actions";
import { GetServices } from "../../helpers/apis";
import { updateExtra } from './extra.middleware'

export const fetchServicesData = (vendor) => {
    return async (dispatch) => {
        dispatch(updateExtra({ loading: true, error: '' }))
        dispatch(servicesAction([]));
        try {
            const response = await GetServices({ vendor })
            dispatch(servicesAction(response.data.data));
            dispatch(updateExtra({ loading: false, error: '' }))
        } catch (error) {
            dispatch(servicesAction([]));
            dispatch(updateExtra({ loading: false, error: '' }))
        }
    };
};