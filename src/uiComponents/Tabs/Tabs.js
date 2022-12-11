import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './Tabs.style'
import { themeColor } from '../../constants'
import { connect } from 'react-redux'
import store from './../../store'

class Tabs extends Component {
    state = {
        selectedId: '',
        bookings: []
    }

    componentDidMount() {
        let { bookings = [] } = this.props
        let { selectedId } = this.state
        if (selectedId == '' && bookings.length) {
            this.handleBookingsSelect(bookings[0])
        }

        if (bookings.findIndex(a => a._id == selectedId) == -1) {
            if (bookings.length) {
                this.handleBookingsSelect(bookings[0])
            } else {
                this.handleBookingsSelect(null)
            }
        }
        this.setState({
            bookings
        })
    }

    componentDidUpdate(prevProps) {
        let { bookings } = this.props
        let { selectedId } = this.state
        if (this.state.bookings.length !== bookings.length) {
            if (selectedId == '' && bookings.length) {
                this.handleBookingsSelect(bookings[0])
            }

            if (bookings.findIndex(a => a._id == selectedId) == -1) {
                if (bookings.length) {
                    this.handleBookingsSelect(bookings[0])
                } else {
                    this.handleBookingsSelect(null)
                }
            }
            this.setState({
                bookings
            })
        }
    }

    handleBookingsSelect = (booking) => {
        let { bookings } = store.getState()
        this.props.handleBookingChange(bookings[bookings.findIndex(a => a._id == booking._id)])
        this.setState({
            selectedId: booking ? booking._id : ''
        })
    }

    render() {
        let { selectedId, bookings = [] } = this.state

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
                                bookings.map((booking, ind) => (
                                    booking.status !== 'completed' &&
                                    <TouchableOpacity
                                        key={ind}
                                        style={[styles.tab, { backgroundColor: selectedId == booking._id ? themeColor : themeColor + '8a' }]}
                                        onPress={() => this.handleBookingsSelect(booking)}
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
}

function mapStateToProps(states) {
    return {
        bookings: states.bookings
    }
}

export default connect(mapStateToProps, null)(Tabs)