import React, { Component, Fragment } from 'react';
import Styles from './BottomSheetStyle'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import _ from 'lodash';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/dist/Entypo'
import { Menu } from 'react-native-paper';
import { Button } from 'native-base';
import { backgroundColor, themeColor } from '../../constants';
import { STATUS } from './../../constants'


function BottomSheet() {

    // constructor() {
    //     super()
    //     this.state = {
    //         visible: false
    //     }
    //     this.RBSheet = null
    // }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    componentDidMount() {
        this.RBSheet.open()
    }

    handleVTM = () => {
        const { handleInfoModal, appointment } = this.props
        this.RBSheet.close()
        handleInfoModal(true, appointment._id)
    }

    handleCancelAppointment = () => {
        const { handleCancelAppointment, appointment } = this.props
        handleCancelAppointment(appointment._id)
        this.RBSheet.close()
    }

    handleTestModal = () => {
        const { handleTestModal, appointment } = this.props
        this.RBSheet.close()
        handleTestModal(true, appointment._id)
    }

    handleSendToLab = () => {
        const { handleSendToLab, appointment } = this.props
        this.RBSheet.close()
        handleSendToLab(appointment._id)
    }

    handleConfirmation = () => {
        Alert.alert(
            "Are your sure?",
            "Are you sure you want to cancel this appointment?",
            [
                {
                    text: "Yes",
                    onPress: this.handleCancelAppointment,
                },
                {
                    text: "No",
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    _renderButtons = () => {
        const { appointment: { status, sendToLab, user }, testChangable = true } = this.props

        if (status == STATUS.BOOKED) {
            return (
                <Button style={styles.headerButton} onPress={this.handleConfirmation} >
                    <Text style={styles.headerButtonText} >Cancel Appointment</Text>
                </Button>
            )
        } else if (status == STATUS.EN_ROUTE) {
            return (
                <Button style={styles.headerButton} onPress={this.handleConfirmation} >
                    <Text style={styles.headerButtonText} >Cancel Appointment</Text>
                </Button>
            )
        } else if (status == STATUS.ARRIVED) {
            return (
                <>
                    {
                        user &&
                        <Button style={styles.headerButton} onPress={this.handleVTM} >
                            <Text style={styles.headerButtonText} >Add VTM & Lab</Text>
                        </Button>
                    }
                    {
                        testChangable &&
                        <Button style={styles.headerButton} onPress={this.handleTestModal} >
                            <Text style={styles.headerButtonText} >Change Service</Text>
                        </Button>
                    }
                    <Button style={styles.headerButton} onPress={this.handleConfirmation} >
                        <Text style={styles.headerButtonText} >Cancel Appointment</Text>
                    </Button>
                </>
            )
        } else if (status == STATUS.COMPLETED && !sendToLab) {
            return (
                <Button style={styles.headerButton} onPress={this.handleSendToLab} >
                    <Text style={styles.headerButtonText} >Send to Lab</Text>
                </Button>
            )
        } else {
            return null
        }
    }

    // render() {
    //     const { handleClose, appointment } = this.props

        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                closeOnDragDown={true}
                dragFromTopOnly={true}
                height={500}
                openDuration={250}
                onClose={handleClose}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Appointment Detail</Text>
                </View>
                <View>
                    <ScrollView contentContainerStyle={[styles.header, styles.headerButtons]} horizontal={true} showsHorizontalScrollIndicator={false} >
                        {this._renderButtons()}
                    </ScrollView>
                </View>

                <View style={styles.list}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 25 }} showsVerticalScrollIndicator={false} >
                        {appointment?.user?.mrNumber ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>QAM Id</Text>
                            <Text style={styles.listItemText}> {appointment?.user?.mrNumber || '-'} </Text>
                        </View> : null}
                        {appointment?.booking?.bookingId ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Booking Id</Text>
                            <Text style={styles.listItemText}> {appointment?.booking?.bookingId || '-'} </Text>
                        </View> : null}

                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Address</Text>
                            <Text style={styles.listItemText}> {appointment?.address || '-'} </Text>
                        </View>

                        {appointment.status ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Appointment Status</Text>
                            <Text style={styles.listItemText}> {_.capitalize(appointment.status).replace('_', ' ') || ' - '} </Text>
                        </View> : null}

                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Appointment Name</Text>
                            <Text style={styles.listItemText}> {appointment?.subService?.name || '-'} </Text>
                        </View>

                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Customer Type</Text>
                            <Text style={styles.listItemText}> {_.capitalize(appointment?.customerType).replace('_', ' ') || '-'} </Text>
                        </View>

                        {appointment?.user ? <Fragment>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemTitle}>User Name</Text>
                                <Text style={styles.listItemText}>
                                    {appointment?.user?.firstName || ''}
                                </Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemTitle}>Passport</Text>
                                <Text style={styles.listItemText}>
                                    {appointment?.user?.passportNumber || '-'}
                                </Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemTitle}>EID</Text>
                                <Text style={styles.listItemText}>
                                    {appointment?.user?.eid || '-'}
                                </Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemTitle}>User Phone</Text>
                                <Text style={styles.listItemText}>{appointment?.user?.phone || '-'}</Text>
                            </View>
                        </Fragment> : null}

                        {appointment?.time ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Appointment Date</Text>
                            <Text style={styles.listItemText}>{moment(appointment?.time).format("DD-MM-YYYY") || '-'}</Text>
                        </View> : null}

                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Appointment Timing</Text>
                            <Text style={styles.listItemText}>
                                {moment(appointment?.startTime).format("hh:mm a") || '-'}
                                {' - '}
                                {moment(appointment?.endTime).format("hh:mm a") || '-'}
                            </Text>
                        </View>

                        {appointment?.covidTestCause ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Covid Test Cause</Text>
                            <Text style={styles.listItemText}>{_.lowerCase(appointment?.covidTestCause) || '-'}</Text>
                        </View> : null}

                        {appointment?.hosanId ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Hosan Id</Text>
                            <Text style={styles.listItemText}>{_.lowerCase(appointment?.hosanId) || '-'}</Text>
                        </View> : null}

                        {appointment?.symptoms?.length ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Symptoms</Text>
                            <Text style={styles.listItemText}>{_.chain(appointment?.symptoms)
                                .map(n => _.capitalize(n).replace('_', ' '))
                                .join(', ')
                                .value() || '-'}</Text>
                        </View> : null}

                        {/*flight details start here*/}
                        {appointment?.airlineName ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Airline Name</Text>
                            <Text style={styles.listItemText}>{appointment?.airlineName || '-'}</Text>
                        </View> : null}
                        {appointment?.flightDate ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Flight Date</Text>
                            <Text style={styles.listItemText}>{moment(appointment?.flightDate).format('DD-MM-YYYY') || '-'}</Text>
                        </View> : null}

                        {appointment?.destination ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Destination</Text>
                            <Text style={styles.listItemText}>{appointment?.destination || '-'}</Text>
                        </View> : null}
                        {/*flight details end here*/}

                        {appointment?.vehicle ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Vehicle Name</Text>
                            <Text style={styles.listItemText}>{appointment?.vehicle?.firstName || ''} {appointment?.vehicle?.lastName || ''} ({appointment?.vehicle?.licencePlate})</Text>
                        </View> : null}

                        {appointment?.members ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Members</Text>
                            <Text style={styles.listItemText}>{_.chain(appointment?.members)
                                .map(n => _.capitalize(`${n?.firstName} ${n?.lastName}`).replace('_', ' '))
                                .join(', ')
                                .value() || '-'}</Text>
                        </View> : null}


                        {appointment?.vendor ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Vendor Name</Text>
                            <Text style={styles.listItemText}>{appointment?.vendor?.name || '-'}</Text>
                        </View> : null}

                        {appointment?.vendorId ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Vendor Id</Text>
                            <Text style={styles.listItemText}>{appointment?.vendorId || '-'}</Text>
                        </View> : null}

                        {appointment?.travelHistory ? <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Travel History</Text>
                            <Text style={styles.listItemText}>{appointment?.travelHistory || '-'}</Text>
                        </View> : null}
                    </ScrollView>
                </View>
            </RBSheet>
        );
    }
// }
// ref

export default BottomSheet;