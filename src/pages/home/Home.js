
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, Dimensions, UIManager } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, updatePaymentTypes, } from '../../store/actions/Bookings'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { themeColor, googleApiKey, backgroundColor, STATUS, PAYMENT_TYPE, RECORD_TYPE } from '../../utils/constant';

const LATITUDE = 0.00
const LONGITUDE = 0.00
const LATITUDE_DELTA = 0.015
const LONGITUDE_DELTA = 0.0121
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

function Home(props) {

//   const { navigation } = props;
//   const dispatch = useDispatch();

// const mapView = useRef(null)

//   const [expanded, setExpend] = useState(true)
//   const [currentBooking, setCurrentBooking] = useState(null)
//   const [mapCoordinates, setMapCoordinates] = useState({
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA
//   })
//   const [userCoordinates, setUserCoordinates] = useState({
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//   })
//   const [directionFromCoordinates, setDirectionFromCoordinates] = useState({
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//   })
//   const [polylineResult, setPolylineResult] = useState(null)
//   const [showTraffic, setShowTraffic] = useState(false)
//   const [showAmountModal, setShowAmountModal] = useState(false)
//   const [showProductsModal, setShowProductsModal] = useState(false)
//   const [showTestModal, setShowTestModal] = useState(false)
//   const [showAppointmentModal, setShowAppointmentModal] = useState(false)
//   const [showQRModal, setShowQRModal] = useState(false)
//   const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false)
//   const [showGetPaymentTypeModal, setShowGetPaymentTypeModal] = useState(false)
//   const [showInfoModal, setShowInfoModal] = useState(false)

//   const reduxState = useSelector(({ auth, lab, service, bookings }) => {
//     return {
//       bookings: bookings.bookings,
//       user: auth?.user,
//       labs: lab?.labs,
//       services: service?.services,
//     }
//   });



//   useEffect(() => {
//     let { user, UpdateBookingToCancel, fetchLabData } = props
//     if (Platform.OS === 'android') {
//       // UIManager.setLayoutAnimationEnabledExperimental(true);
//       // LaunchNavigator.setGoogleApiKey(googleApiKey);
//     }
//     dispatch(getBookings(true))
//     fetchLabData()
//     AppState.addEventListener('change', this.handleAppStateChange)

//     socket.on(user._id + ',canceled', (data) => {
//       let { currentBooking } = this.state
//       UpdateBookingToCancel(data._id)
//       if (currentBooking && currentBooking._id == data._id) {
//         setCurrentBooking(null)
//       }
//     })

//     socket.on(user._id + ',consent', (data) => {
//       const { updateLocalBooking } = props;
//       updateLocalBooking(data)
//       if (currentBooking._id == data._id) {
//         setCurrentBooking(data)
//       }
//     })

//     askPermissionForLocation().then(() => {
//       findUserLocation()
//       backgroundGeolocationService()
//     }).catch((error) => {
//       alert('Please Allow location and try again')
//       // setTimeout(BackHandler.exitApp, 1500)
//     })
//     return () => {
//       let { user } = reduxState
//       AppState.removeEventListener('change', handleAppStateChange)
//       BackgroundGeolocation.removeAllListeners();
//       socket.off(user._id + ',canceled')
//       socket.off(user._id + ',consent')
//     }
//   }, [])


//   useEffect(() => {
//     let { bookings } = reduxState;
//     if (currentBooking && Object.keys(currentBooking).length && Array.isArray(bookings) && bookings.length) {
//       let ind = bookings.findIndex(a => a._id == currentBooking._id)
//       if (ind != -1) {
//         let newStatus = bookings[ind].status
//         if (newStatus !== currentBooking.status) {
//           currentBooking.status = newStatus
//           setCurrentBooking(currentBooking)

//         }
//       }
//     }
//   }, [currentBooking])

//   const handleAppStateChange = () => {
//     const { getBookings } = props
//     if (AppState.currentState == 'active') {
//       getBookings(false)
//     }
//   }

//   backgroundGeolocationService = async () => {
//     let { user } = reduxState
//     BackgroundGeolocation.configure({
//       desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//       stationaryRadius: 100000,
//       distanceFilter: 2,
//       notificationTitle: 'Background tracking',
//       notificationText: 'Enabled',
//       debug: false,
//       startOnBoot: false,
//       stopOnTerminate: false,
//       locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
//       interval: 1000,
//       fastestInterval: 2000,
//       activitiesInterval: 2000,
//       stopOnStillActivity: false,
//       url: baseUrl + '/api/vehicles/fetchLocation',
//       // // url: 'http://192.168.43.229:8080/api/location',
//       maxLocations: 10000000,
//       // // customize post properties
//       httpHeaders: {
//         'Content-Type': 'application/json'
//       },
//       postTemplate: {
//         lat: '@latitude',
//         lon: '@longitude',
//         _id: user._id
//       }
//     })
//   };


//   findUserLocation = () => {
//     // let { updateExtra } = props
//     Geolocation.getCurrentPosition((position) => {
//       let { latitude, longitude } = position.coords
//       let location = {
//         latitude,
//         longitude
//       }
      
//       props.getUserAddress(latitude, longitude)

//       setMapCoordinates(location)

//     }, (error) => {
//       if (error.code == '2') {
//         // updateExtra({ error: 'Please enable location first' })
//       } else {
//         // updateExtra({ error: 'User Location not found' })
//       }
//     }, {
//       enableHighAccuracy: true,
//       timeout: 20000,
//       maximumAge: 1000
//     });
//   }

//   useEffect(() => {
//     handleCenterMap()
//     setUserCoordinates({ latitude, longitude })
//     if (currentBooking && !directionFromCoordinates.latitude && !directionFromCoordinates.longitude) {
//       setDirectionFromCoordinates({ latitude, longitude })
//     }
//   }, [mapCoordinates])

//   askPermissionForLocation = () => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let coarseLocationPermission = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
//         if (coarseLocationPermission === 'denied' || coarseLocationPermission === 'blocked') {
//           coarseLocationPermission = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
//         }

//         let fineLocationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
//         if (fineLocationPermission === 'denied' || fineLocationPermission === 'blocked') {
//           fineLocationPermission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
//         }

//         if (coarseLocationPermission == RESULTS.GRANTED && fineLocationPermission == RESULTS.GRANTED) {
//           resolve(true)
//         } else {
//           reject(false)
//         }

//       } catch (error) {
//         resolve(false)
//       }
//     })
//   }

//   changeLayoutContextMenu = useCallback((value) => {
//     setContextMenu(value)
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//   });

//   const isOpen = (state) => {
//     setExpanded(state)
//     changeLayoutContextMenu(false)
// };


// const handleBookingChange = (booking) => {
//   if (booking) {
//     setExpanded(true)
//     setCurrentBooking(booking)
//     setDirectionFromCoordinates(userCoordinates)      

//       props.getServices(booking.vendor?._id)

//   } else {
//       setExpanded(false)
//       setCurrentBooking(null)
//   }
// }

// const handleCollapsibleView = (value) => {
//   setExpanded(value)
// }


// const handleMapLocationChange = (location) => {
//   setMapCoordinates({
//     latitudeDelta: location.latitudeDelta,
//     longitudeDelta: location.longitudeDelta,
//     longitude: location.longitude,
//     latitude: location.latitude
//   })
// }


// const bookingStatusTextForSlider = () => {
//   let msg = ''
//   if (currentBooking.status == STATUS.BOOKED) {
//       msg = 'Get En-routed ?'
//   } else if (currentBooking.status == STATUS.EN_ROUTE) {
//       msg = 'Are you arrived ?'
//   } else if (currentBooking.status === STATUS.ARRIVED) {
//       msg = 'Sample collected ?'
//   } else if (currentBooking.status === STATUS.SAMPLE_COLLECTED) {
//       msg = 'Service completed ?'
//   }
//   return msg
// }

// const handleSliderCompleted = () => {
  
//   let { updateBookings } = this.props

//   if (currentBooking.status === STATUS.SAMPLE_COLLECTED) {
//       setShowAmountModal(true)
//       return;
//   }

//   let status = ''
//   let appointments = []

//   if (currentBooking.status == STATUS.BOOKED) {
//       status = STATUS.EN_ROUTE
//       appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.EN_ROUTE }))
//   } else if (currentBooking.status == STATUS.EN_ROUTE) {
//       status = STATUS.ARRIVED
//       appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.ARRIVED }))
//   } else if (currentBooking.status == STATUS.ARRIVED) {
//       status = STATUS.SAMPLE_COLLECTED
//   }

//   updateBookings({ ...currentBooking, status, appointments }, ({ data, error }) => {
//       if (!error) {
//         setcCurrentBooking(data)
//         setDirectionFromCoordinates(userCoordinates)
//       }
//   })

// }

// const handleCollected = (remarks) => {

//   let { updateBookings } = this.props

//   currentBooking.status = STATUS.COMPLETED
//   currentBooking.appointments = currentBooking.appointments.map((appointment) => ({ ...appointment, status: appointment.status == STATUS.CANCELLED ? appointment.status : STATUS.COMPLETED }))
//   currentBooking.remarks = remarks

//   updateBookings(currentBooking, ({ data, error }) => {
//       if (!error) {
//         setShowAmountModal(false)
//         setcCurrentBooking(null)
//       }
//   })
// }

// const handleAmountModal = (state) => {
//   setShowAmountModal(state)
// }
// const handleQRModal = (state) => {
//   setShowQRModal(state)
// }
// const handleGetPaymentTypeModal = (state, data = null) => {
//   setShowGetPaymentTypeModal(state)
//   setCurrentBooking({ ...currentBooking, getPaymentTypeData: data })
// }

// const handleCenterMap = () => {
//   if (polylineResult && currentBooking) {
//       mapView?.current?.fitToCoordinates(polylineResult.coordinates, {
//           edgePadding: {
//               right: (width / 20),
//               bottom: (height / 20),
//               left: (width / 20),
//               top: (height / 5),
//           }
//       });
//   } else {
//     mapView?.current?.animateCamera({ center: { latitude: userCoordinates.latitude, longitude: userCoordinates.longitude }, zoom: 15.5 })
//   }
// }

// const handleNavigate = () => {

//   let coords = {
//       latitude: Number(currentBooking.lat),
//       longitude: Number(currentBooking.lng)
//   }

//   // LaunchNavigator.navigate([coords.latitude, coords.longitude], {
//   //     launchMode: LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN
//   // })
//       .then(() => console.log("Launched navigator"))
//       .catch((err) => console.error("Error launching navigator: " + err));
// }

// const  handleToastClose = () => {
//   // let { updateExtra } = this.props
//   // updateExtra({ error: '' })
// }

// const getMarkerColor = () => {
//   return themeColor + '8a'
// }

// // const showProductsModal = () => {
// //   setShowProductsModal(true)
// // }

// const hideProductsModal = () => {
//   setShowProductsModal(false)
// }

// const handleViewItems = () => {
//   hideProductsModal(true)
// }

// const createSlot = (startTime, endTime) => {
//   startTime = new Date(startTime)
//   endTime = new Date(endTime)

//   return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
// }

// const handleAppointmentTestChange = (testId, appointmentId, price) => {
//   let { updateAppointmentTest, user } = this.props

//   updateAppointmentTest(appointmentId, testId, currentBooking._id, price, ({ data, greater }) => {
//       if (greater) {
//           let getPaymentTypeData = {
//               _id: currentBooking._id,
//               price,
//               subService: testId,
//               appointments: [data].map(d => ({
//                   _id: d._id,
//                   paymentType: null,
//                   user: d.user
//               }))
//           }

//           handleGetPaymentTypeModal(true, getPaymentTypeData)
//           return
//       }
//       setCurrentBooking(data)
//   })
// }

// const handleBookingTestChange = (testId, price) => {
//   let { updateBookingTest, user } = this.props

//   updateBookingTest(currentBooking._id, testId, price, ({ data, greater }) => {

//       if (greater) {
//           let getPaymentTypeData = {
//               _id: currentBooking._id,
//               price,
//               subService: testId,
//               appointments: data.map(d => ({
//                   _id: d._id,
//                   paymentType: null,
//                   user: d.user
//               }))
//           }

//           handleGetPaymentTypeModal(true, getPaymentTypeData)
//           return
//       }

//       setCurrentBooking(data)
//   })
// }

// const handleTestModal = (state) => {
//   setShowTestModal(state)
// }

// const handleAppointmentModal = (state) => {
//   setShowAppointmentModal(state)
// }

// const handleBookingDetailsModal = (state) => {
//   setShowBookingDetailsModal(state)
// }

// const handleInfoSubmit = (vtmNo, labId, labName, appointmentId, images, callback = () => { }) => {
//   Keyboard.dismiss()
//   let { updateVTMAndLab } = this.props
//   if (!vtmNo) {
//       // updateExtra({ error: 'VTM number is required' })
//       return
//   }

//   // if (!labId) {
//   //     updateExtra({ error: 'Lab ID is required' })
//   //     return
//   // }

//   if (!labName) {
//       // updateExtra({ error: 'Lab Name is required' })
//       return
//   }

//   // if (!image) {
//   //     updateExtra({ error: 'Consent form image is required' })
//   //     return
//   // }
//   setShowInfoModal(false)


//   updateVTMAndLab({
//       vtmNo,
//       labId,
//       labName,
//       appointmentId,
//       images,
//       bookingId: currentBooking._id
//   }, (updatedBooking) => {
//       let appointmentInd = currentBooking.appointments.findIndex(a => a._id == appointmentId)
//       currentBooking.appointments[appointmentInd].status = STATUS.SAMPLE_COLLECTED

//       setCurrentBooking(updatedBooking)
    
//       callback()
  
//   })
// }

// const handleCancelAppointment = (appointmentId) => {
//   const { cancelAppointment } = this.props

//   cancelAppointment(appointmentId, currentBooking._id, (updatedBooking) => {
//     setCurrentBooking(updatedBooking)
//   })
// }

// // const createSlot = (startTime, endTime) => {
// //   startTime = new Date(startTime)
// //   endTime = new Date(endTime)

// //   return `${numberFix(startTime.getHours())}:${numberFix(startTime.getMinutes())} - ${numberFix(endTime.getHours())}:${numberFix(endTime.getMinutes())}`
// // }

// const createDate = (date) => {
//   date = new Date(date)

//   return `${numberFix(date.getDate())}-${numberFix(date.getMonth() + 1)}-${date.getFullYear()}`
// }

// handlePaymentTypeChange = (paymentType, index) => {
//   currentBooking.getPaymentTypeData.appointments[index].paymentType = paymentType
//   setCurrentBooking(currentBooking)
// }

// const handlePaymentTypeSubmit = () => {
//   let { updatePaymentTypes } = this.props

//   if (currentBooking.getPaymentTypeData.appointments.some((a) => a.paymentType == '' || a.paymentType == null)) {
//       // updateExtra({ error: 'Please select all payment method' })
//       return
//   }

//   updatePaymentTypes(currentBooking.getPaymentTypeData, (data) => {
//     setCurrentBooking(data)
//     setHandleGetPaymentTypeModal(false)
//   })
// }

  return (
    <Text>HOME DIV</Text>
  )
}

export default Home;


