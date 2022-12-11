import Toast from 'react-native-toast-message';

export const handleError = (message, otherOptions) => {
    let title = 'Error';
    let description = message || 'Something went wrong!';
    Toast.show({
        type: 'error',
        text1: title,
        text2: description,
        ...otherOptions
    });
};

export const handleSuccess = (message, defaultDescription = '', otherOptions) => {
    let title = 'Successfully';
    let description = message || defaultDescription;
    Toast.show({
        type: 'success',
        text1: title,
        text2: description,
        ...otherOptions
    });
};