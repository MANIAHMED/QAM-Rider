import {StyleSheet} from 'react-native';
import Theme from "../../utils/theme";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Theme['light'].colors.backgroundColorLighten,
    zIndex: 5,
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
  },
  loading: {
    color: Theme['light'].colors.primary,
  },
});