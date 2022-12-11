import * as Yup from 'yup';
import {phoneRegExp} from "../../../utils/helpers";


const scheme = Yup.object().shape({
    phone:  Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string()
        .required('Please enter your password.')
});

export default scheme;