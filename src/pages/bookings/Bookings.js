import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { styles } from './BookingStyle'
import { STATUS } from '../../utils/constant'
import { Container, Content, Text } from 'native-base'
import i18n from './../../i18n'
import {  useDispatch, useSelector } from 'react-redux'
import Header from './../../components/Header/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { numberFix } from '../../helpers'
import CustomToast from '../../uiComponents/Toast/Toast'
import Loader from '../../uiComponents/Loader/Loader'
import { updateExtra } from '../../store/middlewares/extra.middleware';
import { updateAppointmentTest, UpdateAppointmentToCancel, UpdateBookingData, updateBookingTest, updateLocalBooking, updatePaymentTypes, updateVTMAndLab } from '../../store/middlewares/booking.middleware'
import Appointments from '../../uiComponents/Appointments/Appointments'
import { sendToLab } from '../../store/middlewares/completed_bookings.middleware'
import { Keyboard } from 'react-native'
import BookingDetails from '../../uiComponents/BookingDetails/BookingDetails'
import TestList from '../../uiComponents/TestList/TestList'
import QRCode from '../../uiComponents/QRCode/QRCode'
import GetPaymentType from '../../uiComponents/GetPaymentType/GetPaymentType'
import ShowAmount from '../../uiComponents/ShowAmount/ShowAmount'
import Theme from '../../utils/theme'

function Bookings({
    user,
    updateExtra,
    cancelAppointment,
    updateBookings,
    updateAppointmentTest,
    updateBookingTest,
    sendToLab,
    updatePaymentTypes,
    updateVTMAndLab,
    lng,
    openControlPanel,
    bookings = [],
    completedBookings = [],
    error,
    loading,
    labs,
    services,
    user
}) {

    const dispatch = useDispatch()


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
    const [showInfoModal, setShowInfoModal] = useState(false);


    const reduxState = useSelector((states) => {
        return {
            bookings: states.bookings,
            completedBookings: states.completedBookings,
            loading: states.extras.loading,
            error: states.extras.error,
            labs: states.labs,
            services: states.services,
            user: states.user
        }
    });

    const { bookings, completedBookings, loading, error, labs, services, user } = reduxState;




    // componentDidMount() {
    //     let { user } = this.props
    //     socket.on(user._id + ',consent', (data) => {
    //         let { currentBooking } = this.state

    //         if (currentBooking._id == data._id) {
    //             this.setState({
    //                 currentBooking: data
    //             })
    //         }
    //     })
    // }

    useEffect(() => {

        socket.on(user._id + ',consent', (data) => {

            if (currentBooking._id == data._id) {
                setCurrentBooking(data)
            }
        })

        return () => socket.off(user._id + ',consent')


    }, [])


    const handleTabChange = (currentTab) => {
        setCurrentTab(currentTab)
    }

    const createSlot = (startTime, endTime) => {
        startTime = new Date(startTime)
        endTime = new Date(endTime)

        return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
    }



    const handleToastClose = () => {
        dispatch(updateExtra({ error: '' }))
    }



    const handleCancelAppointment = (appointmentId) => {

     dispatch(   cancelAppointment(appointmentId, currentBooking._id, (updatedBooking) => {
            setCurrentBooking(updatedBooking)
        }) )
    }

    const handleAppointmentModal = (state) => {


        showAppointmentModal(state)
    }

    const handleSelectBooking = (booking) => {
        setCurrentBooking(booking)
        handleBookingDetailsModal(true)
    }

    const handleAmountModal = (state) => {
        setShowAmountModal(state)
    }
    const handleCollected = (remarks) => {

        currentBooking.status = STATUS.COMPLETED
        currentBooking.appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.COMPLETED }))
        currentBooking.remarks = remarks

     dispatch(   updateBookings(currentBooking, ({ data, error }) => {
            if (!error) {

                setShowAmountModal(false)
                setCurrentBooking(null);
            }
        }))
    }




    const handleInfoSubmit = (vtmNo, labId, labName, appointmentId, images, callback = () => { }) => {
        Keyboard.dismiss()
        if (!vtmNo) {
            dispatch(updateExtra({ error: 'VTM number is required' }))
            return
        }

     

        if (!labName) {
            dispatch(updateExtra({ error: 'Lab Name is required' }))
            return
        }


        setShowInfoModal(true)

        dispatch(updateVTMAndLab({ vtmNo, labId, labName, appointmentId, images, bookingId: currentBooking._id }, (updatedBooking) => {

            let appointmentInd = currentBooking.appointments.findIndex(a => a._id == appointmentId)
            currentBooking.appointments[appointmentInd].status = STATUS.SAMPLE_COLLECTED


            setCurrentBooking(updatedBooking)
            callback()
        }))


    }

    const handleGetPaymentTypeModal = (state, data = null) => {
        setShowGetPaymentTypeModal(state)
        setCurrentBooking(...currentBooking, ...data)

    }

    const handleAppointmentTestChange = (testId, appointmentId, price) => {

        dispatch(   updateAppointmentTest(appointmentId, testId, currentBooking._id, price, ({ data, greater }) => {
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

                handleGetPaymentTypeModal(true, getPaymentTypeData)
                return
            }

            setCurrentBooking(data)
        })
        )
    }

    const handleBookingTestChange = (testId, price) => {

   dispatch(  updateBookingTest(currentBooking._id, testId, price, ({ data, greater }) => {

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

            setCurrentBooking(data)
        }))


    }

    const handleSendToLab = (appointmentId) => {
       dispatch( sendToLab(appointmentId, currentBooking._id))
    }

    const handleBookingDetailsModal = (state) => {
     
        setShowBookingDetailsModal(state)
    }

    const handleTestModal = (state) => {
 
        showTestModal(state)
    }

    const handleQRModal = (state) => {

        setShowQRModal(state)
    }


    const handlePaymentTypeChange = (paymentType, index) => {

        currentBooking.getPaymentTypeData.appointments[index].paymentType = paymentType

        setCurrentBooking(currentBooking)
    }

    const handlePaymentTypeSubmit = () => {

        if (currentBooking.getPaymentTypeData.appointments.some((a) => a.paymentType == '' || a.paymentType == null)) {
            updateExtra({ error: 'Please select all payment method' })
            return
        }

      dispatch(  updatePaymentTypes(currentBooking.getPaymentTypeData, (data) => {
            setCurrentBooking(data)

            handleGetPaymentTypeModal(false)
        }))
    }




    let bookingsToRender = currentTab == STATUS.COMPLETED ? completedBookings : bookings

    return (
        <Container>
            {
                error !== '' &&
                <CustomToast text={error} duration={3000} onClose={this.handleToastClose} />
            }
            {
                currentBooking &&
                <>
                    <BookingDetails
                        currentBooking={currentBooking}
                        user={user}
                        handleBookingDetailsModal={handleBookingDetailsModal}
                        handleQRModal={handleQRModal}
                        handleTestModal={handleTestModal}
                        handleAppointmentModal={handleAppointmentModal}
                        visible={showBookingDetailsModal}
                        handleAmountModal={handleAmountModal}
                        showButtons={currentBooking.status != STATUS.COMPLETED}
                        testChangable={false}
                    />
                    <QRCode
                        visible={showQRModal}
                        handleQRModal={handleQRModal}
                    />
                    <GetPaymentType
                        visible={showGetPaymentTypeModal}
                        error={error}
                        loading={loading}
                        handlePaymentTypeChange={handlePaymentTypeChange}
                        appointments={currentBooking?.getPaymentTypeData?.appointments || []}
                        handlePaymentTypeSubmit={handlePaymentTypeSubmit}
                        handleGetPaymentTypeModal={handleGetPaymentTypeModal}
                        handleToastClose={handleToastClose}
                        vendorName={currentBooking?.vendor?.name || ""}
                    />
                    <ShowAmount
                        visible={showAmountModal}
                        status={currentBooking.status}
                        appointments={[...currentBooking.appointments]}
                        handleAmountModal={handleAmountModal}
                        handleCollected={handleCollected}
                        bookingId={currentBooking.bookingId}
                    />
                    <TestList
                        services={services}
                        visible={showTestModal}
                        handleTestModal={handleTestModal}
                        handleTestChange={handleBookingTestChange}
                        currentTest={''}
                        initialSubServices={currentBooking.initialSubServices}
                    />
                    <Appointments
                        handleSendToLab={handleSendToLab}
                        visible={showAppointmentModal}
                        loading={loading}
                        handleCancelAppointment={handleCancelAppointment}
                        handleAppointmentModal={handleAppointmentModal}
                        appointments={[...currentBooking.appointments]}
                        labs={labs}
                        error={error}
                        handleInfoSubmit={handleInfoSubmit}
                        handleToastClose={handleToastClose}
                        handleAppointmentTestChange={handleAppointmentTestChange}
                        services={services}
                        currentTest={currentBooking.subService._id}
                        initialSubServices={currentBooking.initialSubServices}
                        testChangable={false}
                    />
                </>
            }
            <Header title={i18n.t('Bookings.title', { lng })} lng={lng} leftButtonType={'back'} showWallet={false} openControlPanel={openControlPanel} />
            <Loader loading={loading} />
            <View style={styles.headerTabsContainer}>
                <ScrollView horizontal={true}
                    contentContainerStyle={styles.scrollView}
                    showsHorizontalScrollIndicator={false}>
                    {
                        tabs.map((tab, ind) => (
                            <Tab key={ind} label={tab.label} value={tab.value} handleTabChange={this.handleTabChange} currentTab={currentTab} />
                        ))
                    }
                </ScrollView>

            </View>
            <Content contentContainerStyle={styles.container} >
                {
                    bookingsToRender.map((booking, ind) => (
                        booking.status === currentTab &&
                        <TouchableOpacity key={ind} onPress={() => handleSelectBooking(booking)} >
                            <View thumbnail style={styles.listItem}>
                                <View style={styles.thumbnail}>
                                    <Text style={styles.thumbnailText} >#{booking.bookingId}</Text>
                                </View>
                                <View style={styles.itemDetail}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode='tail'>
                                            {booking.address}
                                        </Text>
                                        <Text style={styles.itemStatus}>
                                            {tabs[tabs.findIndex(a => a.value == currentTab)].label}
                                        </Text>
                                    </View>
                                    <View style={styles.addressContainer}>
                                        <View style={styles.address}>
                                            <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
                                                {booking.zone.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.addressContainer}>
                                        <View style={styles.address}>
                                            <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
                                                {createSlot(booking.startTime, booking.endTime)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemPriceView}>
                                        <Text style={styles.priceText}>
                                            <Text style={styles.priceTextBold}>Total : </Text>
                                            {booking.appointments.reduce((a, b) => Number(a) + Number(b.price), 0)}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                    ))
                }
            </Content>
        </Container>
    )
}


const Tab = ({ label, value, handleTabChange, currentTab }) => {
    return (
        <TouchableOpacity
            style={[styles.tabView, { backgroundColor: currentTab == value ? backgroundColor : Theme['light'].colors.background }]}
            onPress={() => handleTabChange(value)}
        >
            <View>
                <Text
                    style={[styles.tabText, { color: currentTab == value ? themeColor : Theme['light'].colors.background }]}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


export default Bookings;