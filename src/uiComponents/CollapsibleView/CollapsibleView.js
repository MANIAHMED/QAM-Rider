import React, { Component } from 'react';
import { View, TouchableOpacity, UIManager, Platform, LayoutAnimation } from 'react-native';
import { styles } from './CollapsibleView.style';
import { SafeAreaView } from 'react-navigation';

function CollapsibleView() {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         expanded: true
    //     };

    //     if (Platform.OS === 'android') {
    //         UIManager.setLayoutAnimationEnabledExperimental(true);
    //     }
    // }

    changeLayout = (type = 'button') => {
        // const { expanded } = this.state;
        const { isOpen, expanded } = this.props;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (type == 'user') {
            isOpen(expanded)
        } else {
            isOpen(!expanded)
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.expanded != this.props.expanded) {
            this.changeLayout('user')
        }
    }

    // render() {
    //     const { children, header, footer, expanded } = this.props;
        return (
            <View>

                {header}

                <View style={styles.collapseContainer}>
                    <SafeAreaView forceInset={{ top: 'never' }}>
                        <TouchableOpacity style={styles.collapseButton} onPress={this.changeLayout}>
                            <View style={styles.collapseButtonIcon} />
                        </TouchableOpacity>
                        <View style={[{ height: expanded ? 150 : 0, overflow: 'hidden' }]}>

                            {children}

                        </View>
                    </SafeAreaView>
                </View>

                {footer}
            </View>
        )
    }
 export default CollapsibleView