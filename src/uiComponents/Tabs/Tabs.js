import React, { Component, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './TabsStyle'
// import { themeColor } from '../../constants'
import { connect } from 'react-redux'
import store from '../../store';

function Tabs({ handleBookingChange, bookings }) {


    const [selectedId, setSelectedId] = useState('')
    const [bookings, setBookings] = useState([]);


    const reduxState = useSelector((states) => {
        return {
            bookings: states.bookings

        }
    });

    useEffect(() => {
        if (selectedId == '' && bookings.length) {
            handleBookingsSelect(bookings[0])
        }
        if (bookings.findIndex(a => a._id == selectedId) == -1) {
            if (bookings.length) {
                handleBookingsSelect(bookings[0])
            } else {
                handleBookingsSelect(null)
            }
        }
        setBookings(bookings)

    }, [bookings])





    const handleBookingsSelect = (booking) => {
        let { bookings } = store.getState()
        handleBookingChange(bookings[bookings.findIndex(a => a._id == booking._id)])


        setSelectedId(booking ? booking._id : '')
    }



    return (
        <>
            {
                bookings.length ?
                    <ScrollView
                        contentContainerStyle={styles.tabs}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            bookings?.map((booking, ind) => (
                                booking.status !== 'completed' &&
                                <TouchableOpacity
                                    key={ind}
                                    style={[styles.tab, { backgroundColor: selectedId == booking._id ? themeColor : themeColor + '8a' }]}
                                    onPress={() => handleBookingsSelect(booking)}
                                >
                                    <View>
                                        <Text style={styles.tabText} >{`Booking# ${booking.bookingId}`}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView> :
                    <View style={styles.noBookingContainer} >
                        <Text style={styles.noBookingText}>There is no booking for you right now.</Text>
                    </View>
            }
        </>
    )
}




export default Tabs