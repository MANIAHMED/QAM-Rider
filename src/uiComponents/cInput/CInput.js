import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as PropTypes from "prop-types";
import Theme from "../../utils/theme";

const CInput = React.forwardRef((props, ref) => {
    return(
        <View style={props.inputContainerStyle}>
            {props.inputLabel ? <Text style={props.inputLabelStyle}> {props.inputLabel} </Text> : null}
            <View style={props.inputInnerContainerStyle}>
                {props.iconName ?
                    <TouchableOpacity activeOpacity={props.iconActiveOpacity}
                                      onPress={props.toggleIconFunc}
                                      style={props.iconButtonStyle}>
                        <Icon name={props.iconName} style={props.iconStyle} />
                    </TouchableOpacity> : null}
                <TextInput ref={ref}
                           autoCorrect={false}
                           autoCapitalize="none"
                           value={props.value}
                           {...props} />
            </View>
            {props.error ? <Text style={props.inputErrorStyle}> {props.error} </Text>  : null}
        </View>
    )
});

CInput.propTypes = {
    inputContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    iconButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputInnerContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputErrorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    toggleIconFunc: PropTypes.func,
    error: PropTypes.string,
    iconName: PropTypes.string,
    inputLabel: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    iconActiveOpacity: PropTypes.number
};

CInput.defaultProps = {
    inputContainerStyle: {},
    inputLabelStyle: {},
    iconButtonStyle: {},
    inputInnerContainerStyle: {},
    iconStyle: {},
    inputErrorStyle: {},
    toggleIconFunc: () => null,
    iconActiveOpacity: 0,
    iconName: '',
    inputLabel: '',
    error: '',
    placeholderTextColor: Theme['light'].colors.lightenSecondary,
};

export default React.memo(CInput);