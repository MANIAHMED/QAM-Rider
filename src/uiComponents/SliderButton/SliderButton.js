import React from 'react'
import { Text, View } from 'react-native'
import RNSwipeVerify from 'react-native-swipe-verify'
import { SW } from '../../utils/constant'
import LottieView from 'lottie-react-native';
import { styles } from './SliderButtonStyle';
import Theme from '../../utils/theme';

const SliderButton = ({ handleSliderCompleted, buttonText }) => {
    var swipeVerify2 = null
    return (
        <View style={styles.buttonContainer}>
            <RNSwipeVerify
                ref={ref => swipeVerify2 = ref}
                width={SW}
                height={50}
                buttonSize={50}
                buttonColor={'transparent'}
                backgroundColor={Theme['light'].colors.background}
                borderRadius={0}
                okButton={{ visible: true, duration: 400 }}
                onVerified={() => {
                    swipeVerify2.reset()
                    handleSliderCompleted()
                }}
                icon={
                    <View style={styles.animationIconContainer}>
                        <LottieView
                            source={require('./../../assets/images/arrow-right.json')}
                            autoPlay
                            speed={1.5}
                            style={styles.animationIcon}
                            resizeMode='contain'
                            loop={true}
                            colorFilters={[
                                {
                                    keypath: "scroll_up",
                                    color: Theme['light'].colors.primary
                                }
                            ]}
                        />
                    </View>
                }
            >
                <Text style={styles.buttonText} >{buttonText}</Text>
            </RNSwipeVerify>
        </View>
    )
}

export default SliderButton