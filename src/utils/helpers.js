

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const encodeQueryData = (data) => {
    const ret = [];
    for (const d in data) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
};

export const MappedElement = ({ data, renderElement, empty }) => {
    if (data && data.length) {
        return data.map((obj, index, array) => renderElement(obj, index, array));
    }
    return empty ? empty() : null;
};


export const sortByDate = (array = []) => {
    array = array.sort((a, b) => {
        return new Date(a.time) - new Date(b.time) || new Date(a.startTime) - new Date(b.startTime);
    });

    return array
}


export const makeCall = (number) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
};


export const SendChat = async (body) => {
    try {
        // let res = await axios.post('/chatsent', body)

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
        // let res = await axios.get('/chatsview/' + id)

        if (!res.data.status) {
            throw new Error(res.data.message)
        }

        return res
    } catch (error) {
        throw error
    }
}