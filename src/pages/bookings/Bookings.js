// import React, { Component } from 'react'
// import { View, TouchableOpacity } from 'react-native'
// import { styles } from './Bookings.style'
// import { backgroundColor, PAYMENT_TYPE, STATUS, themeColor } from '../../constants'
// import { Container, Content, ListItem, Left, Text, Body, Right } from 'native-base'
// import i18n from './../../i18n'
// import { connect } from 'react-redux'
// import Header from './../../components/Header/Header'
// import { ScrollView } from 'react-native-gesture-handler'
// import { numberFix } from '../../helpers'
// import CustomToast from '../../components/Toast/Toast'
// import Loader from '../../components/Loader/Loader'
// import { updateExtra } from '../../store/middlewares/extra.middleware'
// import { updateAppointmentTest, UpdateAppointmentToCancel, UpdateBookingData, updateBookingTest, updateLocalBooking, updatePaymentTypes, updateVTMAndLab } from '../../store/middlewares/booking.middleware'
// import Appointments from '../../components/Appointments/Appointments'
// import { sendToLab } from '../../store/middlewares/completed_bookings.middleware'
// import { Keyboard } from 'react-native'
// import BookingDetails from '../../components/BookingDetails/BookingDetails'
// import TestList from '../../components/TestList/TestList'
// import QRCode from '../../components/QRCode/QRCode'
// import GetPaymentType from '../../components/GetPaymentType/GetPaymentType'
// import ShowAmount from '../../components/ShowAmount/ShowAmount'
// import { toUpper } from 'lodash'

// class Bookings extends Component {
//

//   

// 




//  










//     render() {
//         const {
//             lng,
//             openControlPanel,
//             bookings = [],
//             completedBookings = [],
//             error,
//             loading,
//             labs,
//             services,
//             user
//         } = this.props
//         const {
//             currentTab,
//             tabs,
//             showAppointmentModal,
//             currentBooking,
//             showBookingDetailsModal,
//             showTestModal,
//             showQRModal,
//             showGetPaymentTypeModal,
//             showAmountModal,
//         } = this.state

//         let bookingsToRender = currentTab == STATUS.COMPLETED ? completedBookings : bookings

//         return (
//             <Container>
//                 {
//                     error !== '' &&
//                     <CustomToast text={error} duration={3000} onClose={this.handleToastClose} />
//                 }
//                 {
//                     currentBooking &&
//                     <>
//                         <BookingDetails
//                             currentBooking={currentBooking}
//                             user={user}
//                             handleBookingDetailsModal={this.handleBookingDetailsModal}
//                             handleQRModal={this.handleQRModal}
//                             handleTestModal={this.handleTestModal}
//                             handleAppointmentModal={this.handleAppointmentModal}
//                             visible={showBookingDetailsModal}
//                             handleAmountModal={this.handleAmountModal}
//                             showButtons={currentBooking.status != STATUS.COMPLETED}
//                             testChangable={false}
//                         />
//                         <QRCode
//                             visible={showQRModal}
//                             handleQRModal={this.handleQRModal}
//                         />
//                         <GetPaymentType
//                             visible={showGetPaymentTypeModal}
//                             error={error}
//                             loading={loading}
//                             handlePaymentTypeChange={this.handlePaymentTypeChange}
//                             appointments={currentBooking?.getPaymentTypeData?.appointments || []}
//                             handlePaymentTypeSubmit={this.handlePaymentTypeSubmit}
//                             handleGetPaymentTypeModal={this.handleGetPaymentTypeModal}
//                             handleToastClose={this.handleToastClose}
//                             vendorName={currentBooking?.vendor?.name || ""}
//                         />
//                         <ShowAmount
//                             visible={showAmountModal}
//                             status={currentBooking.status}
//                             appointments={[...currentBooking.appointments]}
//                             handleAmountModal={this.handleAmountModal}
//                             handleCollected={this.handleCollected}
//                             bookingId={currentBooking.bookingId}
//                         />
//                         <TestList
//                             services={services}
//                             visible={showTestModal}
//                             handleTestModal={this.handleTestModal}
//                             handleTestChange={this.handleBookingTestChange}
//                             currentTest={''}
//                             initialSubServices={currentBooking.initialSubServices}
//                         />
//                         <Appointments
//                             handleSendToLab={this.handleSendToLab}
//                             visible={showAppointmentModal}
//                             loading={loading}
//                             handleCancelAppointment={this.handleCancelAppointment}
//                             handleAppointmentModal={this.handleAppointmentModal}
//                             appointments={[...currentBooking.appointments]}
//                             labs={labs}
//                             error={error}
//                             handleInfoSubmit={this.handleInfoSubmit}
//                             handleToastClose={this.handleToastClose}
//                             handleAppointmentTestChange={this.handleAppointmentTestChange}
//                             services={services}
//                             currentTest={currentBooking.subService._id}
//                             initialSubServices={currentBooking.initialSubServices}
//                             testChangable={false}
//                         />
//                     </>
//                 }
//                 <Header title={i18n.t('Bookings.title', { lng })} lng={lng} leftButtonType={'back'} showWallet={false} openControlPanel={openControlPanel} />
//                 <Loader loading={loading} />
//                 <View style={styles.headerTabsContainer}>
//                     <ScrollView horizontal={true}
//                         contentContainerStyle={styles.scrollView}
//                         showsHorizontalScrollIndicator={false}>
//                         {
//                             tabs.map((tab, ind) => (
//                                 <Tab key={ind} label={tab.label} value={tab.value} handleTabChange={this.handleTabChange} currentTab={currentTab} />
//                             ))
//                         }
//                     </ScrollView>

//                 </View>
//                 <Content contentContainerStyle={styles.container} >
//                     {
//                         bookingsToRender.map((booking, ind) => (
//                             booking.status === currentTab &&
//                             <TouchableOpacity key={ind} onPress={() => this.handleSelectBooking(booking)} >
//                                 <View thumbnail style={styles.listItem}>
//                                     <View style={styles.thumbnail}>
//                                         <Text style={styles.thumbnailText} >#{booking.bookingId}</Text>
//                                     </View>
//                                     <View style={styles.itemDetail}>
//                                         <View style={styles.itemHeader}>
//                                             <Text style={styles.itemName} numberOfLines={1} ellipsizeMode='tail'>
//                                                 {booking.address}
//                                             </Text>
//                                             <Text style={styles.itemStatus}>
//                                                 {tabs[tabs.findIndex(a => a.value == currentTab)].label}
//                                             </Text>
//                                         </View>
//                                         <View style={styles.addressContainer}>
//                                             <View style={styles.address}>
//                                                 <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
//                                                     {booking && booking?.zone && booking?.zone?.name && booking?.zone?.name?.toUpperCase()}

//                                                 </Text>
//                                             </View>
//                                         </View>
//                                         <View style={styles.addressContainer}>
//                                             <View style={styles.address}>
//                                                 <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
//                                                     {this.createSlot(booking.startTime, booking.endTime)}
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                         <View style={styles.itemPriceView}>
//                                             <Text style={styles.priceText}>
//                                                 <Text style={styles.priceTextBold}>Total : </Text>
//                                                 {booking.appointments.reduce((a, b) => Number(a) + Number(b.price), 0)}
//                                             </Text>
//                                         </View>
//                                     </View>

//                                 </View>
//                             </TouchableOpacity>
//                         ))
//                     }
//                 </Content>
//             </Container>
//         )
//     }
// }

// const Tab = ({ label, value, handleTabChange, currentTab }) => {
//     return (
//         <TouchableOpacity
//             style={[styles.tabView, { backgroundColor: currentTab == value ? backgroundColor : themeColor }]}
//             onPress={() => handleTabChange(value)}
//         >
//             <View>
//                 <Text
//                     style={[styles.tabText, { color: currentTab == value ? themeColor : backgroundColor }]}
//                 >
//                     {label}
//                 </Text>
//             </View>
//         </TouchableOpacity>
//     )
// }

// function mapStateToProps(states) {
//     return {
//         bookings: states.bookings,
//         completedBookings: states.completedBookings,
//         loading: states.extras.loading,
//         error: states.extras.error,
//         labs: states.labs,
//         services: states.services,
//         user: states.user
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         updateExtra: (extra) => dispatch(updateExtra(extra)),
//         updateBookings: (booking, callback = () => { }) => dispatch(UpdateBookingData(booking, callback)),
//         updateAppointmentTest: (appointmentId, testId, bookingId, price, callback) => dispatch(updateAppointmentTest(appointmentId, testId, bookingId, price, callback)),
//         updateBookingTest: (bookingId, testId, price, callback) => dispatch(updateBookingTest(bookingId, testId, price, callback)),
//         updatePaymentTypes: (body, callback) => dispatch(updatePaymentTypes(body, callback)),
//         updateVTMAndLab: (obj, callback) => dispatch(updateVTMAndLab(obj, callback)),
//         cancelAppointment: (appointmentId, bookingId, callback) => dispatch(UpdateAppointmentToCancel(appointmentId, bookingId, callback)),
//         sendToLab: (appointmentId, bookingId) => dispatch(sendToLab(appointmentId, bookingId)),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Bookings)


import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Style from './BookingStyle';
import i18next from '../../i18n';
import { Header } from '../../containers';
import { ScrollView } from 'react-native-gesture-handler'



function Bookings() {

    const [currentTab, setCurrentTab] = useState(null)
    const [tabs, setTabs] = useState([
        { label: 'Booked', value: STATUS.BOOKED },
        { label: 'En-Route', value: STATUS.EN_ROUTE },
        { label: 'Arrived', value: STATUS.ARRIVED },
        { label: 'Sample-Collected', value: STATUS.SAMPLE_COLLECTED },
        { label: 'Completed', value: STATUS.COMPLETED },
    ])
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showGetPaymentTypeModal, setShowGetPaymentTypeModal] = useState(false);
    const [showAmountModal, setShowAmountModal] = useState(false)



    useEffect(() => {

        socket.on(user._id + ',consent', (data) => {

            if (currentBooking._id == data._id) {
                setCurrentBooking(data)
            }
        })

        return () => socket.off(user._id + ',consent')


    }, [])


    handleTabChange = (currentTab) => {
        setCurrentTab(currentTab)
    }


    createSlot = (startTime, endTime) => {
        startTime = new Date(startTime)
        endTime = new Date(endTime)

        return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
    }



    handleToastClose = () => {
        let { updateExtra } = this.props
        updateExtra({ error: '' })
    }

    handleCancelAppointment = (appointmentId) => {
        const { cancelAppointment } = this.props

        cancelAppointment(appointmentId, currentBooking._id, (updatedBooking) => {
            setCurrentBooking(updatedBooking)
        })
    }


    handleAppointmentModal = (state) => {


        showAppointmentModal(state)
    }



    handleSelectBooking = (booking) => {
        setCurrentBooking(booking)
        handleBookingDetailsModal(true)
    }



    handleAmountModal = (state) => {
        setShowAmountModal(state)
    }


    handleCollected = (remarks) => {
        let { updateBookings } = this.props

        currentBooking.status = STATUS.COMPLETED
        currentBooking.appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.COMPLETED }))
        currentBooking.remarks = remarks

        updateBookings(currentBooking, ({ data, error }) => {
            if (!error) {

                setShowAmountModal(false)
                setCurrentBooking(null);
            }
        })
    }



    handleInfoSubmit = (vtmNo, labId, labName, appointmentId, images, callback = () => { }) => {
        Keyboard.dismiss()
        let { updateExtra, updateVTMAndLab } = this.props
        if (!vtmNo) {
            updateExtra({ error: 'VTM number is required' })
            return
        }

        // if (!labId) {
        //     updateExtra({ error: 'Lab ID is required' })
        //     return
        // }

        if (!labName) {
            updateExtra({ error: 'Lab Name is required' })
            return
        }

        if (!image) {
            updateExtra({ error: 'Consent form image is required' })
            return
        }

        this.setState({
            showInfoModal: false
        })

        updateVTMAndLab({
            vtmNo,
            labId,
            labName,
            appointmentId,
            images,
            bookingId: currentBooking._id
        }, (updatedBooking) => {

            let appointmentInd = currentBooking.appointments.findIndex(a => a._id == appointmentId)
            currentBooking.appointments[appointmentInd].status = STATUS.SAMPLE_COLLECTED

           setCurrentBooking(updatedBooking)
            callback()
            // this.handleInfoModal(false)
        })
    }


    handleGetPaymentTypeModal = (state, data = null) => {
        // this.setState({
        //     showGetPaymentTypeModal: state,
        //     currentBooking: { ...currentBooking, getPaymentTypeData: data }
        // })


        setShowGetPaymentTypeModal(state)
        setCurrentBooking(...currentBooking,...data)
    }




    handleAppointmentTestChange = (testId, appointmentId, price) => {
        let { updateAppointmentTest, user } = this.props

        updateAppointmentTest(appointmentId, testId, currentBooking._id, price, ({ data, greater }) => {
            if (greater) {
                let getPaymentTypeData = {
                    _id: currentBooking._id,
                    price,
                    subService: {
                        _id: testId
                    },
                    appointments: [data].map(d => ({
                        _id: d._id,
                        paymentType: null,
                        user: d.user
                    }))
                }

                this.handleGetPaymentTypeModal(true, getPaymentTypeData)
                return
            }

            // this.setState({ currentBooking: data })
            setCurrentBooking(data)
        })
    }



    handleBookingTestChange = (testId, price) => {
        let { updateBookingTest, user } = this.props

        updateBookingTest(currentBooking._id, testId, price, ({ data, greater }) => {

            if (greater) {
                let getPaymentTypeData = {
                    _id: currentBooking._id,
                    price,
                    subService: {
                        _id: testId
                    },
                    appointments: data.map(d => ({
                        _id: d._id,
                        paymentType: null,
                        user: d.user
                    }))
                }

            handleGetPaymentTypeModal(true, getPaymentTypeData)
                return
            }

            // this.setState({ currentBooking: data })
            setCurrentBooking(data)
        })
    }





        handlePaymentTypeChange = (paymentType, index) => {

        currentBooking.getPaymentTypeData.appointments[index].paymentType = paymentType

        setCurrentBooking(currentBooking)
    }

    handlePaymentTypeSubmit = () => {
        let { updatePaymentTypes, updateExtra } = this.props

        if (currentBooking.getPaymentTypeData.appointments.some((a) => a.paymentType == '' || a.paymentType == null)) {
            updateExtra({ error: 'Please select all payment method' })
            return
        }

        updatePaymentTypes(currentBooking.getPaymentTypeData, (data) => {
            setCurrentBooking(data)
setShowGetPaymentTypeModal(false)
        })
    }



    handleSendToLab = (appointmentId) => {
        const { sendToLab } = this.props
        sendToLab(appointmentId, currentBooking._id)
    }

    handleBookingDetailsModal = (state) => {
    setShowBookingDetailsModal(state)
    }

    handleTestModal = (state) => {
        setShowTestModal(state)
      
    }

    handleQRModal = (state) => {
        setShowQRModal(state)
     
    }


    return (
        <div>Bookings</div>
    )
}

export default Bookings