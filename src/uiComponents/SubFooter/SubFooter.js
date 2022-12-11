import React, { Component } from 'react'
import { Footer as NBFooter } from 'native-base'
import { styles } from './SubFooterStyle'
import i18n from './../Tabs/Tabs'
import { connect } from 'react-redux';

const SubFooter = ({ handleBookingChange }) => {
    return (
        <NBFooter style={styles.footer} >
            <Tabs handleBookingChange={handleBookingChange} />
        </NBFooter>
    )
}

export default SubFooter