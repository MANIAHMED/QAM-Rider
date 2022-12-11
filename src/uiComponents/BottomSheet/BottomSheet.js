import React, { Component, Fragment, useEffect } from 'react';
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


function BottomSheet({ handleInfoModal, appointment: { status, sendToLab, user }, handleCancelAppointment, handleTestModal, handleSendToLab, testChangable, handleClose }) {

    const [visible, setVisible] = useState(false)
    const [RBSheet, setRBSheet] = useState(null);


    const _openMenu = () => setVisible(true);

    const _closeMenu = () => setVisible(false)


    useEffect(() => {
        RBSheet.open()

    }, [])

    const handleVTM = () => {
        RBSheet.close()
        handleInfoModal(true, appointment._id)
    }

    const handleCancelAppointment = () => {
        handleCancelAppointment(appointment._id)
        RBSheet.close()
    }

    const handleTestModal = () => {
        RBSheet.close()
        handleTestModal(true, appointment._id)
    }

    const handleSendToLab = () => {
        RBSheet.close()
        handleSendToLab(appointment._id)
    }

    const handleConfirmation = () => {
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

    const _renderButtons = () => {

        if (status == STATUS.BOOKED) {
            return (
                <Button style={Styles.headerButton} onPress={this.handleConfirmation} >
                    <Text style={Styles.headerButtonText} >Cancel Appointment</Text>
                </Button>
            )
        } else if (status == STATUS.EN_ROUTE) {
            return (
                <Button style={Styles.headerButton} onPress={this.handleConfirmation} >
                    <Text style={Styles.headerButtonText} >Cancel Appointment</Text>
                </Button>
            )
        } else if (status == STATUS.ARRIVED) {
            return (
                <>
                    {
                        user &&
                        <Button style={Styles.headerButton} onPress={this.handleVTM} >
                            <Text style={Styles.headerButtonText} >Add VTM & Lab</Text>
                        </Button>
                    }
                    {
                        testChangable &&
                        <Button style={Styles.headerButton} onPress={this.handleTestModal} >
                            <Text style={Styles.headerButtonText} >Change Service</Text>
                        </Button>
                    }
                    <Button style={Styles.headerButton} onPress={this.handleConfirmation} >
                        <Text style={Styles.headerButtonText} >Cancel Appointment</Text>
                    </Button>
                </>
            )
        } else if (status == STATUS.COMPLETED && !sendToLab) {
            return (
                <Button style={Styles.headerButton} onPress={this.handleSendToLab} >
                    <Text style={Styles.headerButtonText} >Send to Lab</Text>
                </Button>
            )
        } else {
            return null
        }
    }
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
            <View style={Styles.header}>
                <Text style={Styles.headerTitle}>Appointment Detail</Text>
            </View>
            <View>
                <ScrollView contentContainerStyle={[Styles.header, Styles.headerButtons]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {_renderButtons()}
                </ScrollView>
            </View>

            <View style={Styles.list}>
                <ScrollView contentContainerStyle={{ paddingBottom: 25 }} showsVerticalScrollIndicator={false} >
                    {appointment?.user?.mrNumber ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>QAM Id</Text>
                        <Text style={Styles.listItemText}> {appointment?.user?.mrNumber || '-'} </Text>
                    </View> : null}
                    {appointment?.booking?.bookingId ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Booking Id</Text>
                        <Text style={Styles.listItemText}> {appointment?.booking?.bookingId || '-'} </Text>
                    </View> : null}

                    <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Address</Text>
                        <Text style={Styles.listItemText}> {appointment?.address || '-'} </Text>
                    </View>

                    {appointment.status ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Appointment Status</Text>
                        <Text style={Styles.listItemText}> {_.capitalize(appointment.status).replace('_', ' ') || ' - '} </Text>
                    </View> : null}

                    <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Appointment Name</Text>
                        <Text style={Styles.listItemText}> {appointment?.subService?.name || '-'} </Text>
                    </View>

                    <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Customer Type</Text>
                        <Text style={Styles.listItemText}> {_.capitalize(appointment?.customerType).replace('_', ' ') || '-'} </Text>
                    </View>

                    {appointment?.user ? <Fragment>
                        <View style={Styles.listItem}>
                            <Text style={Styles.listItemTitle}>User Name</Text>
                            <Text style={Styles.listItemText}>
                                {appointment?.user?.firstName || ''}
                            </Text>
                        </View>
                        <View style={Styles.listItem}>
                            <Text style={Styles.listItemTitle}>Passport</Text>
                            <Text style={Styles.listItemText}>
                                {appointment?.user?.passportNumber || '-'}
                            </Text>
                        </View>
                        <View style={Styles.listItem}>
                            <Text style={Styles.listItemTitle}>EID</Text>
                            <Text style={Styles.listItemText}>
                                {appointment?.user?.eid || '-'}
                            </Text>
                        </View>
                        <View style={Styles.listItem}>
                            <Text style={Styles.listItemTitle}>User Phone</Text>
                            <Text style={Styles.listItemText}>{appointment?.user?.phone || '-'}</Text>
                        </View>
                    </Fragment> : null}

                    {appointment?.time ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Appointment Date</Text>
                        <Text style={Styles.listItemText}>{moment(appointment?.time).format("DD-MM-YYYY") || '-'}</Text>
                    </View> : null}

                    <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Appointment Timing</Text>
                        <Text style={Styles.listItemText}>
                            {moment(appointment?.startTime).format("hh:mm a") || '-'}
                            {' - '}
                            {moment(appointment?.endTime).format("hh:mm a") || '-'}
                        </Text>
                    </View>

                    {appointment?.covidTestCause ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Covid Test Cause</Text>
                        <Text style={Styles.listItemText}>{_.lowerCase(appointment?.covidTestCause) || '-'}</Text>
                    </View> : null}

                    {appointment?.hosanId ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Hosan Id</Text>
                        <Text style={Styles.listItemText}>{_.lowerCase(appointment?.hosanId) || '-'}</Text>
                    </View> : null}

                    {appointment?.symptoms?.length ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Symptoms</Text>
                        <Text style={Styles.listItemText}>{_.chain(appointment?.symptoms)
                            .map(n => _.capitalize(n).replace('_', ' '))
                            .join(', ')
                            .value() || '-'}</Text>
                    </View> : null}

                    {appointment?.airlineName ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Airline Name</Text>
                        <Text style={Styles.listItemText}>{appointment?.airlineName || '-'}</Text>
                    </View> : null}
                    {appointment?.flightDate ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Flight Date</Text>
                        <Text style={Styles.listItemText}>{moment(appointment?.flightDate).format('DD-MM-YYYY') || '-'}</Text>
                    </View> : null}

                    {appointment?.destination ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Destination</Text>
                        <Text style={Styles.listItemText}>{appointment?.destination || '-'}</Text>
                    </View> : null}
                    {/*flight details end here*/}

                    {appointment?.vehicle ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Vehicle Name</Text>
                        <Text style={Styles.listItemText}>{appointment?.vehicle?.firstName || ''} {appointment?.vehicle?.lastName || ''} ({appointment?.vehicle?.licencePlate})</Text>
                    </View> : null}

                    {appointment?.members ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Members</Text>
                        <Text style={Styles.listItemText}>{_.chain(appointment?.members)
                            .map(n => _.capitalize(`${n?.firstName} ${n?.lastName}`).replace('_', ' '))
                            .join(', ')
                            .value() || '-'}</Text>
                    </View> : null}


                    {appointment?.vendor ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Vendor Name</Text>
                        <Text style={Styles.listItemText}>{appointment?.vendor?.name || '-'}</Text>
                    </View> : null}

                    {appointment?.vendorId ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Vendor Id</Text>
                        <Text style={Styles.listItemText}>{appointment?.vendorId || '-'}</Text>
                    </View> : null}

                    {appointment?.travelHistory ? <View style={Styles.listItem}>
                        <Text style={Styles.listItemTitle}>Travel History</Text>
                        <Text style={Styles.listItemText}>{appointment?.travelHistory || '-'}</Text>
                    </View> : null}
                </ScrollView>
            </View>
        </RBSheet>
    );
}


export default BottomSheet;