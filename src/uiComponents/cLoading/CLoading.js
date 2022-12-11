import * as React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Style from './CLoadingStyle';
import Theme from "../../utils/theme";

const CLoading = ({style}) => {
  return (
    <View style={[Style.wrapper, style]}>
      <ActivityIndicator style={Style.loading} color={Theme['light'].colors.primary} size="large" />
    </View>
  );
};

export default CLoading;