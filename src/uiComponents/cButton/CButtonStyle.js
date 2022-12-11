import {StyleSheet} from 'react-native';
import Theme from "../../utils/theme";

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: Theme['light'].colors.primary,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'relative',
    minHeight: 45,
    shadowColor: Theme['light'].colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: .50,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: Theme['light'].colors.tertiary,
    fontSize: 14,
    fontFamily: Theme.font.semiBold
  },
});
