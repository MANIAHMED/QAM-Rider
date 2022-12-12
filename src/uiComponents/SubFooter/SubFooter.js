import React from 'react'
import { Footer as NBFooter } from 'native-base'
import { styles } from './SubFooterStyle'

const SubFooter = ({ handleBookingChange }) => {
    return (
        <NBFooter style={styles.footer} >
            <Tabs handleBookingChange={handleBookingChange} />
        </NBFooter>
    )
}

export default SubFooter