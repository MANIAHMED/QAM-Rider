import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as PropTypes from 'prop-types';
import ButtonStyle from './CButtonStyle';
import Theme from "../../utils/theme";

const CButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[(props.disabled) && {opacity: 0.5}, props.buttonStyle]}>
      {props.loading ? (
        <ActivityIndicator {...props.loaderProps} />
      ) : props.title ? (
        <Text style={props.buttonText}>
          {props.title}
        </Text>
        ) : props.children}
    </TouchableOpacity>
  );
};

CButton.propTypes = {
  buttonStyle: PropTypes.object,
  buttonText: PropTypes.object,
  title: PropTypes.string,
  activeOpacity: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  loaderProps: PropTypes.object,
};

CButton.defaultProps = {
  title: '',
  buttonStyle: ButtonStyle.buttonStyle,
  buttonText: ButtonStyle.buttonText,
  activeOpacity: 0.5,
  loading: false,
  disabled: false,
  loaderProps: {
    size: 20,
    color: Theme['light'].colors.tertiary,
  },
};

export default CButton;