import React, { Component, useRef } from 'react'
import { Container, Content, Text, View, Button, Toast } from 'native-base';
import { Platform, UIManager, LayoutAnimation, Dimensions, AppState, Keyboard } from 'react-native'
import i18n from './../../i18n'
import Header from './../../uiComponents/Header/Header'
import Footer from '../../uiComponents/Footer/Footer';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { styles } from './Home.styles';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { themeColor, googleApiKey, backgroundColor, STATUS, PAYMENT_TYPE, RECORD_TYPE } from '../../utils/constant';
import CollapsibleView from './../../uiComponents/CollapsibleView/CollapsibleView'
import SubFooter from '../../uiComponents/SubFooter/SubFooter';
import { connect, useDispatch, useSelector } from 'react-redux'
import {
  fetchBookingData,
  UpdateBookingData,
  UpdateBookingToCancel,
  updateVTMAndLab,
  UpdateAppointmentToCancel,
  updateAppointmentTest,
  updateBookingTest,
  updateLocalBooking,
  updatePaymentTypes
} from '../../store/middlewares/booking.middleware';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import SliderButton from '../../uiComponents/SliderButton/SliderButton';
import LaunchNavigator from 'react-native-launch-navigator';
import AddressTimeline from '../../uiComponents/AddressTimeline/AddressTimeline';
import { updateExtra } from '../../store/middlewares/extra.middleware';
import CustomToast from '../../uiComponents/Toast/Toast';
import Loader from '../../uiComponents/Loader/Loader';
import ShowAmount from '../../uiComponents/ShowAmount/ShowAmount';
import RiderMarker from '../../uiComponents/RiderMarker/RiderMarker';
import MerchantUserMarker from '../../uiComponents/MerchantUserMarker/MerchantUserMarker';
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { baseUrl, consentUrl, numberFix } from '../../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAddress } from '../../store/middlewares/user.middleware';
import TestList from '../../uiComponents/TestList/TestList';
import { fetchLabData } from '../../store/middlewares/lab.middleware';
import { fetchServicesData } from '../../store/middlewares/services.middleware';
import Appointments from '../../uiComponents/Appointments/Appointments';
import QRCode from '../../uiComponents/QRCode/QRCode';
import { TouchableOpacity } from 'react-native';
import BookingDetails from '../../uiComponents/BookingDetails/BookingDetails';
import GetPaymentType from '../../uiComponents/GetPaymentType/GetPaymentType';

const LATITUDE = 0.00
const LONGITUDE = 0.00
const LATITUDE_DELTA = 0.015
const LONGITUDE_DELTA = 0.0121
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

function Home({ user, UpdateBookingToCancel, updateLocalBooking, bookings, cancelAppointment, getBookings, fetchLabData, updateExtra, updateBookings, updateAppointmentTest, updateExtra, updateVTMAndLab }) {

  const { navigation } = props;
  const dispatch = useDispatch();

  const mapView = useRef(null)

  const [expanded, setExpend] = useState(true)
  const [currentBooking, setCurrentBooking] = useState(null)
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })
  const [userCoordinates, setUserCoordinates] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  })
  const [directionFromCoordinates, setDirectionFromCoordinates] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  })
  const [polylineResult, setPolylineResult] = useState(null)
  const [showTraffic, setShowTraffic] = useState(false)
  const [showAmountModal, setShowAmountModal] = useState(false)
  const [showProductsModal, setShowProductsModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false)
  const [showGetPaymentTypeModal, setShowGetPaymentTypeModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [contextMenu, setContextMenu] = useState('')

  const reduxState = useSelector((states) => {
    return {
      bookings: states.bookings,
      loading: states.extras.loading,
      error: states.extras.error,
      user: states.user,
      labs: states.labs,
      services: states.services
    }
  });




  useEffect(() => {

    if (Platform.OS === "android") LaunchNavigator.setGoogleApiKey(googleApiKey);
    // getBookings(true)
    dispatch(fetchBookingData(initial))
    // fetchLabData()
    dispatch(fetchLabData())
    AppState.addEventListener('change', handleAppStateChange)

    socket.on(user._id + ',canceled', (data) => {
      // console.log(data._id)
      // console.log(currentBooking)
      // UpdateBookingToCancel(data._id)
      dispatch(UpdateBookingToCancel(data?._id))
      if (currentBooking && currentBooking._id == data._id) {
        setCurrentBooking(null)
      }
    })



    socket.on(user._id + ',consent', (data) => {


      dispatch(updateLocalBooking(data))
      if (currentBooking._id == data._id) {
        setCurrentBooking(data)
      }
    })


    askPermissionForLocation().then(() => {
      findUserLocation()
      backgroundGeolocationService()
    }).catch((error) => {
      alert('Please Allow location and try again')
    })

    return () => {
      AppState.removeEventListener('change', this.handleAppStateChange)
      BackgroundGeolocation.removeAllListeners();
      socket.off(user._id + ',canceled')
      socket.off(user._id + ',consent')
    }

  }, [])




  // componentDidUpdate() {
  //   let { currentBooking, showInfoModal } = this.state
  //   let { bookings } = this.props
  //   if (currentBooking && Object.keys(currentBooking).length && Array.isArray(bookings) && bookings.length) {
  //     let ind = bookings.findIndex(a => a._id == currentBooking._id)
  //     if (ind != -1) {
  //       let newStatus = bookings[ind].status
  //       if (newStatus !== currentBooking.status) {
  //         currentBooking.status = newStatus
  //         this.setState({ currentBooking })

  //       }
  //     }
  //   }
  // }

  const handleAppStateChange = () => {
    if (AppState.currentState == 'active') {
      // getBookings(false)
      dispatch(fetchBookingData(initial))
    }
  }



  const backgroundGeolocationService = async () => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 100000,
      distanceFilter: 2,
      notificationTitle: 'Background tracking',
      notificationText: 'Enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000,
      fastestInterval: 2000,
      activitiesInterval: 2000,
      stopOnStillActivity: false,
      url: baseUrl + '/api/vehicles/fetchLocation',
      // // url: 'http://192.168.43.229:8080/api/location',
      maxLocations: 10000000,
      // // customize post properties
      httpHeaders: {
        'Content-Type': 'application/json'
      },
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        _id: user._id
      }
    });

    BackgroundGeolocation.on('location', ({ latitude, longitude }) => {
      BackgroundGeolocation.startTask(async taskKey => {
        setUserCoordinates({ lat, lng })
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('authorization', (status) => {
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning && user.isAvailable) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

  }

  const findUserLocation = () => {
    Geolocation.getCurrentPosition((position) => {


      let { latitude, longitude } = position.coords
      mapCoordinates.latitude = latitude
      mapCoordinates.longitude = longitude
      // getUserAddress(latitude, longitude)
      dispatch(getUserAddress(lat, lng))




      setMapCoordinates({ mapCoordinates }, () => { handleCenterMap() })
      setUserCoordinates({ latitude, longitude })


      // this.setState({
      //   mapCoordinates,
      // },
      //  () => {
      //   this.handleCenterMap()
      //   let { currentBooking, directionFromCoordinates } = this.state
      //   let states = {
      //     userCoordinates: {
      //       latitude,
      //       longitude
      //     },
      //   }



      //   if (currentBooking && !directionFromCoordinates.latitude && !directionFromCoordinates.longitude) {
      //     states.directionFromCoordinates = {
      //       latitude,
      //       longitude
      //     }
      //   }

      //   this.setState(states)
      // })
    }, (error) => {
      if (error.code == '2') {
        dispatch(updateExtra({ error: 'Please enable location first' }))
      } else {
        dispatch(updateExtra({ error: 'User Location not found' }))
      }
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }

  const askPermissionForLocation = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let coarseLocationPermission = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        if (coarseLocationPermission === 'denied' || coarseLocationPermission === 'blocked') {
          coarseLocationPermission = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        }

        let fineLocationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        if (fineLocationPermission === 'denied' || fineLocationPermission === 'blocked') {
          fineLocationPermission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }

        if (coarseLocationPermission == RESULTS.GRANTED && fineLocationPermission == RESULTS.GRANTED) {
          resolve(true)
        } else {
          reject(false)
        }

      } catch (error) {
        resolve(false)
      }
    })
  }

  const changeLayoutContextMenu = (value) => {

    setContextMenu(value, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);


    })

  };

  const isOpen = (state) => {
    setExpend(state)
    changeLayoutContextMenu(false)
  };

  const handleBookingChange = (booking) => {
    if (booking) {
      let states = {
        expanded: true,
        currentBooking: booking,
        directionFromCoordinates: this.state.userCoordinates
      }

      // getServices(booking.vendor?._id)
      dispatch(fetchServicesData(booking?.vendor?._id))

      // if (booking.status === STATUS.ARRIVED) {
      //     states.showInfoModal = true
      // }

      // if (booking.status == STATUS.SAMPLE_COLLECTED) {
      //     states.showAmountModal = true
      setExpend(states.expanded)
      setCurrentBooking(states.currentBooking)
      setDirectionFromCoordinates(states.directionFromCoordinates)
      // }
    } else {
      // this.setState({
      //   expanded: false,
      //   currentBooking: null
      // })
      setExpend(false)
      setCurrentBooking(null)
    }
  }

  const handleCollapsibleView = (value) => {
    setExpend(value)
  }

  const handleMapLocationChange = (location) => {
    mapCoordinates.latitudeDelta = location.latitudeDelta
    mapCoordinates.longitudeDelta = location.longitudeDelta
    mapCoordinates.longitude = location.longitude
    mapCoordinates.latitude = location.latitude
    setMapCoordinates(mapCoordinates)
  }

  const bookingStatusTextForSlider = () => {
    let msg = ''
    if (currentBooking.status == STATUS.BOOKED) {
      msg = 'Get En-routed ?'
    } else if (currentBooking.status == STATUS.EN_ROUTE) {
      msg = 'Are you arrived ?'
    } else if (currentBooking.status === STATUS.ARRIVED) {
      msg = 'Sample collected ?'
    } else if (currentBooking.status === STATUS.SAMPLE_COLLECTED) {
      msg = 'Service completed ?'
    }
    return msg
  }

  const handleSliderCompleted = () => {

    if (currentBooking.status === STATUS.SAMPLE_COLLECTED) {
      this.setState({
        showAmountModal: true
      })
      return
    }

    let status = ''
    let appointments = []

    if (currentBooking.status == STATUS.BOOKED) {
      status = STATUS.EN_ROUTE
      appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.EN_ROUTE }))
    } else if (currentBooking.status == STATUS.EN_ROUTE) {
      status = STATUS.ARRIVED
      appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.ARRIVED }))
    } else if (currentBooking.status == STATUS.ARRIVED) {
      status = STATUS.SAMPLE_COLLECTED
    }

    updateBookings({ ...currentBooking, status, appointments }, ({ data, error }) => {
      if (!error) {
        this.setState({
          currentBooking: data,
          directionFromCoordinates: this.state.userCoordinates
        })
      }
    })

  }

  const handleCollected = (remarks) => {


    currentBooking.status = STATUS.COMPLETED
    currentBooking.appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.COMPLETED }))
    currentBooking.remarks = remarks

    updateBookings(currentBooking, ({ data, error }) => {
      if (!error) {
        setShowAmountModal(false)
        setCurrentBooking(null)
      }
    })
  }

  const handleAmountModal = (state) => {
    setShowAmountModal(state)
  }

  const handleQRModal = (state) => {
    setShowQRModal(state)

  }

  const handleGetPaymentTypeModal = (state, data = null) => {
    // this.setState({
    //   showGetPaymentTypeModal: state,
    //   currentBooking: { ...currentBooking, getPaymentTypeData: data }
    // })

    // setShowGetPaymentTypeModal(state)
    // setCurrentBooking(...currentBooking)
  }

  const handleCenterMap = () => {
    let { polylineResult, userCoordinates, currentBooking } = this.state
    if (polylineResult && currentBooking) {
      this.mapView.fitToCoordinates(polylineResult.coordinates, {
        edgePadding: {
          right: (width / 20),
          bottom: (height / 20),
          left: (width / 20),
          top: (height / 5),
        }
      });
    } else {
      this.mapView.animateCamera({ center: { latitude: userCoordinates.latitude, longitude: userCoordinates.longitude }, zoom: 15.5 })
    }
  }

  const handleNavigate = () => {

    let coords = {
      latitude: Number(currentBooking.lat),
      longitude: Number(currentBooking.lng)
    }

    LaunchNavigator.navigate([coords.latitude, coords.longitude], {
      launchMode: LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN
    })
      .then(() => console.log("Launched navigator"))
      .catch((err) => console.error("Error launching navigator: " + err));
  }

  const handleToastClose = () => {
    let { updateExtra } = this.props
    dispatch(updateExtra({ error: '' }))
  }

  const getMarkerColor = () => {
    return themeColor + '8a'
  }

  const showProductsModals = () => {

    setShowProductsModal(true)
  }

  hideProductsModal = () => {
    setShowProductsModal(false)

  }

  handleViewItems = () => {
    showProductsModal()
  }

  const createSlot = (startTime, endTime) => {
    startTime = new Date(startTime)
    endTime = new Date(endTime)

    return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
  }

  const handleAppointmentTestChange = (testId, appointmentId, price) => {


    dispatch(updateAppointmentTest(appointmentId, testId, currentBooking._id, price, ({data,greater})=>{
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


    }))



  }

  const handleBookingTestChange = (testId, price) => {


    // updateBookingTest(currentBooking._id, testId, price, ({ data, greater }) => {
    //   if (greater) {
    //     let getPaymentTypeData = {
    //       _id: currentBooking._id,
    //       price,
    //       subService: testId,
    //       appointments: data.map(d => ({
    //         _id: d._id,
    //         paymentType: null,
    //         user: d.user
    //       }))
    //     }

    //     handleGetPaymentTypeModal(true, getPaymentTypeData)
    //     return
    //   }
    //   setCurrentBooking(data)
    // })



    dispatch(updateBookingTest(currentBooking._id, testId, price, ({data,greater})=>{

      if (greater) {
        let getPaymentTypeData = {
          _id: currentBooking._id,
          price,
          subService: testId,
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

  const handleTestModal = (state) => {
    // this.setState({
    //   showTestModal: state,
    // })
    setShowTestModal(state)
  }

  const handleAppointmentModal = (state) => {
    // this.setState({
    //   showAppointmentModal: state
    // })
    setShowAppointmentModal(state)
  }

  const handleBookingDetailsModal = (state) => {
    // this.setState({
    //   showBookingDetailsModal: state
    // })
    showBookingDetailsModal(state)
  }

  const handleInfoSubmit = (vtmNo, labId, labName, appointmentId, images, callback = () => { }) => {
    Keyboard.dismiss()
    let { currentBooking } = this.state
    if (!vtmNo) {
      dispatch(updateExtra({ error: 'VTM number is required' }))
      return
    }

    // if (!labId) {
    //     updateExtra({ error: 'Lab ID is required' })
    //     return
    // }

    if (!labName) {
      dispatch(updateExtra({ error: 'Lab Name is required' }))
      return
    }

    // if (!image) {
    //     updateExtra({ error: 'Consent form image is required' })
    //     return
    // }

    // this.setState({
    //   showInfoModal: false
    // })
    showInfoModal(false)

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
    })


    // dispatch(updateVTMAndLab({
    //   vtmNo,
    //   labId,
    //   labName,
    //   appointmentId,
    //   images,
    //   bookingId: currentBooking._id
    // }, (updatedBooking)=> {

    //   let appointmentInd = currentBooking.appointments.findIndex(a => a._id == appointmentId)
    //     currentBooking.appointments[appointmentInd].status = STATUS.SAMPLE_COLLECTED

    //    setCurrentBooking(updatedBooking)
    //     callback()

    // })),

    dispatch(updateVTMAndLab({
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

    }))








  }

  const handleCancelAppointment = (appointmentId) => {


    // cancelAppointment(appointmentId, currentBooking._id, (updatedBooking) => {
    //   this.setState({
    //     currentBooking: updatedBooking
    //   })
    // })

    dispatch(UpdateAppointmentToCancel(appointmentId, currentBooking, (updatedBooking) => {
      setCurrentBooking(updatedBooking)
    }))


  }

  // const  createSlot = (startTime, endTime) => {
  //     startTime = new Date(startTime)
  //     endTime = new Date(endTime)

  //     return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
  //   }

  const createDate = (date) => {
    date = new Date(date)

    return `${numberFix(date.getDate())}-${numberFix(date.getMonth() + 1)}-${date.getFullYear()}`
  }

  const handlePaymentTypeChange = (paymentType, index) => {

    currentBooking.getPaymentTypeData.appointments[index].paymentType = paymentType

    // this.setState({ currentBooking })
    setCurrentBooking(currentBooking)
  }

  const handlePaymentTypeSubmit = () => {


    if (currentBooking.getPaymentTypeData.appointments.some((a) => a.paymentType == '' || a.paymentType == null)) {
      dispatch(updateExtra({ error: 'Please select all payment method' }))
      return
    }

    // updatePaymentTypes(currentBooking.getPaymentTypeData, (data) => {
    //   setCurrentBooking(data)
    //   handleGetPaymentTypeModal(false)
    // })

    dispatch(updatePaymentTypes(currentBooking.getPaymentTypeData, (data)=>{
      setCurrentBooking(data)
      handleGetPaymentTypeModal(false)
    }))



  }

  // render() {
  //   const { lng, openControlPanel, loading, error, user, labs, services } = this.props
  //   const {
  //     expanded,
  //     currentBooking,
  //     mapCoordinates,
  //     userCoordinates,
  //     directionFromCoordinates,
  //     showTraffic,
  //     showAmountModal,
  //     showTestModal,
  //     showAppointmentModal,
  //     showQRModal,
  //     showBookingDetailsModal,
  //     showGetPaymentTypeModal
  //   } = this.state

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
            handleAmountModal={handleAmountModal}
            visible={showBookingDetailsModal}
          />
          <ShowAmount
            visible={showAmountModal}
            status={currentBooking.status}
            appointments={[...currentBooking.appointments]}
            handleAmountModal={handleAmountModal}
            handleCollected={handleCollected}
            bookingId={currentBooking.bookingId}
          />
          <QRCode
            visible={showQRModal}
            handleQRModal={handleQRModal}
          />
          <TestList
            services={services}
            visible={showTestModal}
            handleTestModal={handleTestModal}
            handleTestChange={handleBookingTestChange}
            currentTest={''}
            initialSubServices={currentBooking.initialSubServices}
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
          <Appointments
            socket={socket}
            visible={showAppointmentModal}
            currentBookingId={currentBooking._id}
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
          />

        </>
      }
      <Header title={i18n.t('Home.title', { lng })} lng={lng} leftButtonType={'menu'} showWallet={true} openControlPanel={openControlPanel} />
      <Loader loading={loading} />
      <Content contentContainerStyle={styles.container} scrollEnabled={false}>
        <View style={styles.mapContainer}>
          {
            mapCoordinates.latitude != 0.00 && mapCoordinates.longitude != 0.00 ?
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsCompass
                showsUserLocation={false}
                followsUserLocation={false}
                moveOnMarkerPress
                toolbarEnabled
                showsScale
                showsBuildings
                showsIndoorLevelPicker
                showsIndoors
                showsPointsOfInterest
                showsTraffic={showTraffic}
                onRegionChangeComplete={this.handleMapLocationChange}
                ref={c => this.mapView = c}
                initialRegion={{
                  latitude: mapCoordinates.latitude,
                  longitude: mapCoordinates.longitude,
                  latitudeDelta: mapCoordinates.latitudeDelta,
                  longitudeDelta: mapCoordinates.longitudeDelta,
                }}
              >
                <Marker
                  coordinate={{ latitude: userCoordinates.latitude, longitude: userCoordinates.longitude }}
                >
                  <RiderMarker width={48} style={styles.logo} />
                </Marker>
                {
                  currentBooking && (
                    <>

                      <Marker
                        coordinate={{
                          latitude: Number(currentBooking.lat),
                          longitude: Number(currentBooking.lng)
                        }}
                      >
                        <MerchantUserMarker width={40} style={styles.logo} color={getMarkerColor()} />
                      </Marker>
                      {
                        directionFromCoordinates.latitude != 0.00 && directionFromCoordinates.longitude != 0.00 && loading == false &&
                        <MapViewDirections
                          origin={{ latitude: directionFromCoordinates.latitude, longitude: directionFromCoordinates.longitude }}
                          destination={{
                            latitude: Number(currentBooking.lat),
                            longitude: Number(currentBooking.lng)
                          }}
                          apikey={googleApiKey}
                          strokeWidth={5}
                          strokeColor={themeColor}
                          optimizeWaypoints={false}
                          // precision={'high'}
                          resetOnChange={false}
                          onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                          }}
                          onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            this.setState({ polylineResult: result }, () => {
                              this.handleCenterMap()
                            })
                          }}
                          onError={(errorMessage) => {
                            console.log('GOT AN ERROR');
                          }}
                        />
                      }
                    </>
                  )
                }

              </MapView> : <View style={styles.map} />

          }
          <Button style={styles.currentLocationButton} onPress={handleCenterMap} >
            <MaterialIcons name={'my-location'} size={30} color={themeColor} />
          </Button>
          <Button style={[styles.trafficButton, { backgroundColor: showTraffic ? themeColor : backgroundColor }]} onPress={() => setShowTraffic(!showTraffic)} >
            <MaterialIcons name={'traffic'} size={30} color={showTraffic ? backgroundColor : themeColor} />
          </Button>
          {
            currentBooking &&
            <Button rounded style={styles.navigateButton} onPress={this.handleNavigate} >
              <Text style={styles.navigateButtonText} >Navigate</Text>
            </Button>
          }
        </View>
        {
          currentBooking && (
            <>
              <SliderButton buttonText={bookingStatusTextForSlider()} handleSliderCompleted={handleSliderCompleted} />
              <CollapsibleView
                isOpen={this.isOpen}
                expanded={expanded}
              >
                <TouchableOpacity onPress={() => this.handleBookingDetailsModal(true)}>
                  <Text style={styles.merchantNameHeading} numberOfLines={1} >View Details</Text>
                  <AddressTimeline
                    from={user.address || ''}
                    to={currentBooking.address}
                    booking={currentBooking}
                  />
                </TouchableOpacity>
              </CollapsibleView>
            </>
          )
        }

      </Content >
      <SubFooter handleBookingChange={handleBookingChange} lng={lng} />
      <Footer expanded={expanded} handleCollapsibleView={handleCollapsibleView} lng={lng} />
    </Container >
  )
}





export default Home