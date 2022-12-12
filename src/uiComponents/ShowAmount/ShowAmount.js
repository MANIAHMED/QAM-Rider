import React, { Component, useState } from 'react';
import { Text, Modal, View, SafeAreaView } from 'react-native';
import { styles } from './ShowAmountStyle';
import { Button } from 'native-base';
import { STATUS, PAYMENT_TYPE,  } from './../../utils/constant'
import { TextInput } from 'react-native-paper';


function ShowAmount({ handleCollected, visible = false, handleAmountModal, appointments, status, bookingId }) {

    const [rating, setRating] = useState(0)
    const [remarksVisible, setRemarksVisible] = useState(false)
    const [remarks, setRemarks] = useState('')

    const handleRemarksPrompt = () => {
        setRemarksVisible(true)
    }

    const handleRemarksClose = () => {
        setRemarksVisible(false)
        setRemarks('')
    }

    const handleRemarksSubmit = () => {
        handleCollected(remarks)
        handleRemarksClose()
    }

        let allAppointments = appointments.filter(a => a.status != STATUS.CANCELLED)

        let totalCardAmount = 0;
        let totalCashAmount = 0;
        let totalCreditCardAmount = 0
        let totalOnlineAmount = 0

        allAppointments.forEach((appointment) => {
            if (appointment.paymentTypes.length) {
                if (appointment.paymentTypes.length == 1) {
                    if (appointment.paymentTypes[0].paymentType == PAYMENT_TYPE.CASH.value) {
                        totalCashAmount += appointment.paymentTypes[0].amount
                    } else if (appointment.paymentTypes[0].paymentType == PAYMENT_TYPE.CARD.value) {
                        totalCardAmount += appointment.paymentTypes[0].amount
                    } else if (appointment.paymentTypes[0].paymentType == PAYMENT_TYPE.ONLINE_TRANSFER.value) {
                        totalOnlineAmount += appointment.paymentTypes[0].amount
                    } else if (appointment.paymentTypes[0].paymentType == PAYMENT_TYPE.CREDIT_CARD.value) {
                        totalCreditCardAmount += appointment.paymentTypes[0].amount
                    }
                } else {
                    totalCardAmount += appointment.paymentTypes[0].amount
                    if (appointment.paymentTypes[1].paymentType == PAYMENT_TYPE.CASH.value) {
                        totalCashAmount += appointment.paymentTypes[1].amount - appointment.paymentTypes[0].amount
                    } else if (appointment.paymentTypes[1].paymentType == PAYMENT_TYPE.ONLINE_TRANSFER.value) {
                        totalOnlineAmount += appointment.paymentTypes[1].amount - appointment.paymentTypes[0].amount
                    } else if (appointment.paymentTypes[1].paymentType == PAYMENT_TYPE.CREDIT_CARD.value) {
                        totalCreditCardAmount += appointment.paymentTypes[1].amount - appointment.paymentTypes[0].amount
                    }
                }
            }
            else if (appointment?.initialPaymentType && appointment.price) {
                if (appointment?.initialPaymentType === PAYMENT_TYPE.PAID.value) {
                    totalCardAmount += appointment.price
                } else if (appointment?.initialPaymentType === PAYMENT_TYPE.UNPAID.value || appointment?.initialPaymentType === PAYMENT_TYPE.CASH.value) {
                    totalCashAmount += appointment.price
                } else if (appointment?.initialPaymentType === PAYMENT_TYPE.ONLINE_TRANSFER.value) {
                    totalOnlineAmount += appointment.price
                } else if (appointment?.initialPaymentType === PAYMENT_TYPE.CREDIT_CARD.value) {
                    totalCreditCardAmount += appointment.price
                }
            }
        })

        return (
            <>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={remarksVisible}
                    onRequestClose={handleRemarksClose}
                >
                    <View style={styles.remarksModalContainer}>
                        <View style={styles.remarksModalContent} >
                            <Text style={styles.remarksModalHeading}>
                                Enter Remarks
                            </Text>
                            <TextInput
                                style={styles.remarkModalInput}
                                multiline={true}
                                underlineColor={'transparent'}
                                label="Remarks"
                                value={remarks}
                                onChangeText={text => setRemarks(text)}
                            />
                            <View style={styles.remarksModalButtonView}>
                                <Button
                                    transparent
                                    style={styles.remarksModalCloseButton}
                                    onPress={handleRemarksClose}
                                >
                                    <Text style={styles.remarksModalCloseButtonText} >Cancel</Text>
                                </Button>

                                <Button
                                    transparent
                                    style={styles.remarksModalSubmitButton}
                                    onPress={handleRemarksSubmit}
                                >
                                    <Text style={styles.remarksModalSubmitButtonText}>Submit</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visible}
                    onRequestClose={() => handleAmountModal(false)}>

                    <SafeAreaView style={styles.rateYourRiderContainer}>
                        <Text style={styles.bookingNumberText}>Booking # {bookingId}</Text>
                        <View style={styles.viewContainer} >
                            <View>
                                <Text style={styles.headingText} >Amount For Cash</Text>
                                <Text style={[styles.headingText, styles.amountText]} >{Number(totalCashAmount).toFixed(2)}</Text>
                                <Text style={styles.headingText} >Amount For Credit Card</Text>
                                <Text style={[styles.headingText, styles.amountText]} >{Number(totalCreditCardAmount).toFixed(2)}</Text>
                                <Text style={styles.headingText} >Amount For Online Transfer</Text>
                                <Text style={[styles.headingText, styles.amountText]} >{Number(totalOnlineAmount).toFixed(2)}</Text>
                                <Text style={styles.headingText} >Already Paid to Vendor</Text>
                                <Text style={[styles.headingText, styles.amountText]} >{Number(totalCardAmount).toFixed(2)}</Text>
                            </View>
                            {
                                status === STATUS.SAMPLE_COLLECTED &&
                                <Button style={styles.button} onPress={handleRemarksPrompt} >
                                    <Text style={styles.buttonText}>Collected</Text>
                                </Button>
                            }
                        </View>
                    </SafeAreaView>
                </Modal>
            </>
        )
    }
export default ShowAmount;