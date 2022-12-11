import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import Styles from './TabBarStyle';
import CustomIcons from "../../assets/icons/CustomIcons";

const tabIcons = {
    'HomeStack': 'calendar',
    'BookedAppointmentsStack': 'home',
    'BookTestStack': 'home',

};

function MyTabBar({ state, descriptors, navigation }) {
    
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <SafeAreaView edges={['bottom', 'right', 'left']} >
            <View style={Styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={[Styles.tabButton, isFocused && Styles.tabButtonActive]}>
                            <CustomIcons style={[Styles.tabButtonIcon, isFocused && Styles.tabButtonIconActive]}
                                name={tabIcons[label]}/>
                            {/* <ProgressiveImage source={tabIcons[label]} style={Styles.leftButtonIcon} /> */}
                            <View style={[Styles.tabButtonBorder, isFocused && Styles.tabButtonBorderActive]} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

export default React.memo(MyTabBar)