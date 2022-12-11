import React, { Component } from 'react';
import { Text, Modal, View, ScrollView, TouchableOpacity, Share } from 'react-native';
import { styles } from './BookingDetails.style';
import { Button, Container, Content, Footer } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { STATUS, textColor, themeColor } from '../../constants';
import BottomSheet from '../BottomSheet/BottomSheet';
import Appointment from '../Appointment/Appointment';
import Loader from '../../components/Loader/Loader';
import GetInfo from '../GetInfo/GetInfo';
import CustomToast from '../Toast/Toast';
import TestList from '../TestList/TestList';
import socket from 'socket.io-client/lib/socket';
import { consentUrl, makeCall, numberFix } from '../../helpers';
import { GetUserAddress } from '../../helpers/apis';

function BookingDetails() {



    handleSelection = (appointment) => {
        this.setState({
            selected: appointment
        })
    }

    handleClose = () => {
        this.setState({
            selected: null
        })
    }

    handleInfoModal = (state, id = null) => {
        this.setState({
            showInfoModal: state,
            id
        })
    }

    handleTestModal = (state, id = null) => {
        this.setState({
            showTestModal: state,
            id
        })
    }

    shareLocation = async (currentBooking) => {
        let location = await GetUserAddress(currentBooking?.lat, currentBooking?.lng)
        location = location.split(' ').join('+')
        Share.share({ url: `https://www.google.com/maps/place/${location}`, message: `https://www.google.com/maps/place/${location}` })
    }

    handleTestChange = (testId, price) => {
        const { id } = this.state
        const { handleAppointmentTestChange } = this.props
        handleAppointmentTestChange(testId, id, price)
        this.handleTestModal(false)
    }

    createSlot = (startTime, endTime) => {
        startTime = new Date(startTime)
        endTime = new Date(endTime)

        return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
    }

    createDate = (date) => {
        date = new Date(date)

        return `${numberFix(date.getDate())}-${numberFix(date.getMonth() + 1)}-${date.getFullYear()}`
    }

    _renderButtons = () => {
        const { currentBooking, handleAppointmentModal, handleTestModal, showButtons = true, handleAmountModal, testChangable = true } = this.props

        if (!showButtons) {
            return null
        }

        return (
            <>
                <Button style={styles.headerButton} onPress={() => handleAppointmentModal(true)} >
                    <Text style={styles.headerButtonText} >View Appointments</Text>
                </Button>
                {
                    currentBooking.status === STATUS.ARRIVED && testChangable && 
                    <Button style={styles.headerButton} onPress={() => handleTestModal(true)} >
                        <Text style={styles.headerButtonText} >Change Services For All</Text>
                    </Button>
                }
                <Button style={styles.headerButton} onPress={() => handleAmountModal(true)} >
                    <Text style={styles.headerButtonText} >View Bill</Text>
                </Button>
                <Button style={styles.headerButton} onPress={() => makeCall(currentBooking.phone)} >
                    <Text style={styles.headerButtonText} >Call Customer</Text>
                </Button>
                <Button style={styles.headerButton} onPress={() => this.shareLocation(currentBooking)} >
                    <Text style={styles.headerButtonText} >Share Location</Text>
                </Button>
            </>
        )
    }

    // render() {
    //     const {
    //         visible = false,
    //         handleBookingDetailsModal,
    //         loading,
    //         error,
    //         handleToastClose,
    //         currentBooking,
    //         handleQRModal,
    //         user
    //     } = this.props;

        return (
            <>
                <Modal
                    transparent={false}
                    animationType="slide"
                    onRequestClose={() => handleBookingDetailsModal(false)}
                    visible={visible}
                >
                    <Container>
                        {
                            error !== '' &&
                            <CustomToast text={error} duration={3000} onClose={handleToastClose} />
                        }
                        <Loader loading={loading} />

                        <Content scrollEnabled={true} showsVerticalScrollIndicator={false}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Booking Detail</Text>
                            </View>

                            <View>
                                <ScrollView contentContainerStyle={[styles.header, styles.headerButtons]} horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this._renderButtons()}
                                </ScrollView>
                            </View>

                            <View style={styles.list}>
                                <ScrollView contentContainerStyle={{ paddingBottom: 25 }} showsVerticalScrollIndicator={false} >
                                    {currentBooking?.bookingId ? <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>Booking Id</Text>
                                        <Text style={styles.listItemText}>{currentBooking?.bookingId || '-'}</Text>
                                    </View> : null}

                                    {currentBooking?.password ? <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>Password</Text>
                                        <Text style={styles.listItemText}>{currentBooking?.password || '-'}</Text>
                                    </View> : null}

                                    <TouchableOpacity onPress={() => handleQRModal(true)}>
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemTitle}>Consent Form</Text>
                                            <Text style={styles.listItemText}>{consentUrl}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {currentBooking?.time ? <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>Date</Text>
                                        <Text style={styles.listItemText}>{this.createDate(currentBooking.time)}</Text>
                                    </View> : null}

                                    {currentBooking?.startTime ? <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>Slot</Text>
                                        <Text style={styles.listItemText}>{this.createSlot(currentBooking.startTime, currentBooking.endTime)}</Text>
                                    </View> : null}

                                    {currentBooking?.firstName ? <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>Name</Text>
                                        <Text style={styles.listItemText}>{currentBooking.firstName || ''} {currentBooking.lastName || ''}</Text>
                                    </View> : null}

                                    {currentBooking?.phone ? <TouchableOpacity onPress={() => makeCall(currentBooking.phone)} >
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemTitle}>Phone Number</Text>
                                            <Text style={styles.listItemText}>{currentBooking.phone}</Text>
                                        </View>
                                    </TouchableOpacity> : null}

                                    <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>From</Text>
                                        <Text style={styles.listItemText}>{user.address || ''}</Text>
                                    </View>

                                    <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>To (Google)</Text>
                                        <Text style={styles.listItemText}>{currentBooking.address}</Text>
                                    </View>

                                    <View style={styles.listItem}>
                                        <Text style={styles.listItemTitle}>To</Text>
                                        <Text style={styles.listItemText}>{currentBooking.addressTwo}</Text>
                                    </View>

                                </ScrollView>
                            </View>
                        </Content>
                        <Footer style={styles.footer}>
                            <Button style={styles.footerButton} onPress={() => handleBookingDetailsModal(false)}>
                                <Text style={styles.footerButtonText}>Close</Text>
                            </Button>
                        </Footer>
                    </Container>
                </Modal>
            </>
        )
    }

export default BookingDetails