import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { googleApiKey } from '../utils/constant'

export const GetAdminitrationNumber = async () => {
    try {
        let res = await axios.get('/masters/getAdministratorNumber')

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const LoginUser = async (body) => {
    try {
        let res = await axios.post('/vehicles/login', body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const CheckAuth = async () => {
    try {
        let res = await axios.get('/vehicles/get')

        if (res.data.error) {
            await AsyncStorage.removeItem('ACCESS_TOKEN')
            axios.defaults.headers.common['Authorization'] = null;
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const SetAvailable = async (params) => {
    try {
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let res = await axios.get('/vehicles/setAvailibility?' + queryString)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const GetBookings = async (body) => {
    try {

        let res = await axios.post('/bookings/getBokingsForVehicle', body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const GetServices = async (params) => {
    try {
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let res = await axios.get('/vendors/getAllSubservices?' + queryString)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const GetLabs = async () => {
    try {

        let res = await axios.get('/labs/getAll')

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const ChangeStatus = async (params) => {
    try {
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let res = await axios.get(`/bookings/changeStatus?${queryString}`)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const UpdateTestForAppointment = async (body) => {
    try {
        let res = await axios.post(`/appointments/subServiceUpdate`, body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const UpdateTestForBooking = async (body) => {
    try {
        let res = await axios.post(`/bookings/changeBookedService`, body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const UpdatePaymentTypes = async (body) => {
    try {
        let res = await axios.post(`/bookings/updateGreaterAppointments`, body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const UpdateVTM = async (body) => {
    try {
        let res = await axios.post(`/appointments/updateVTMandLab`, body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const SendToLab = async (body) => {
    try {
        let res = await axios.post(`/appointments/sendToLab`, { ...body, sendToLab: true })

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const CancelBooking = async (body) => {
    try {
        let res = await axios.post(`/bookings/cancel`, body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const CancelAppointment = async (body) => {
    try {
        let res = await axios.post(`/appointments/cancel`, body)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const LogoutUser = async (params) => {
    try {
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let res = await axios.get(`/vehicles/logout?${queryString}`)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const SendChat = async (body) => {
    try {
        let res = await axios.post('/chatsent', body)

        if (!res.data.status) {
            throw new Error(res.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const GetChats = async (id) => {
    try {
        let res = await axios.get('/chatsview/' + id)

        if (!res.data.status) {
            throw new Error(res.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const GetSingleBooking = async (id) => {
    try {
        let res = await axios.get('/bookings/getBookingById?_id=' + id)

        if (res.data.error) {
            throw new Error(res.data.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}

export const GetUserAddress = async (lat, lng) => {
    try {
        let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`)

        if (!Array.isArray(res.data.results) || !res.data.results.length) {
            return ''
        }

        return res.data.results[0].formatted_address
    } catch (error) {
        return ''
    }
}