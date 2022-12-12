import React, { Component, useEffect, useState } from 'react';
import { View, TouchableOpacity, UIManager, Platform, LayoutAnimation } from 'react-native';
import styles from './CollapsibleViewStyle'
import { SafeAreaView } from 'react-navigation';

function CollapsibleView({ isOpen,  children, header, footer }) {

    const [expanded, setExpanded] = useState(true)

    useEffect(()=>{
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    },[])

    const changeLayout = (type = 'button') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (type == 'user') {
            isOpen(expanded)
        } else {
            isOpen(!expanded)
        }
    };

    useEffect(() => {
        changeLayout('user')
    }, [expanded])

    return (
        <View>
            {header}
            <View style={styles.collapseContainer}>
                <SafeAreaView forceInset={{ top: 'never' }}>
                    <TouchableOpacity style={styles.collapseButton} onPress={changeLayout}>
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


export default CollapsibleView;