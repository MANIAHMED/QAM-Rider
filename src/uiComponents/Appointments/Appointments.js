// import React, { Component } from 'react';
// import { Text, Modal, View, ScrollView, TouchableOpacity } from 'react-native';
// import { styles } from './Appointments.style';
// import { Button, Container, Content, Footer } from 'native-base';
// import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
// import { textColor, themeColor } from '../../constants';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import Appointment from '../Appointment/Appointment';
// import Loader from '../../components/Loader/Loader';
// import GetInfo from '../GetInfo/GetInfo';
// import CustomToast from '../Toast/Toast';
// import TestList from '../TestList/TestList';
// import socket from 'socket.io-client/lib/socket';

// class Appointments extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selected: null,
//             showInfoModal: false,
//             showTestModal: false,
//             id: null
//         };
//     }

//     handleSelection = (appointment) => {
//         this.setState({
//             selected: appointment
//         })
//     }

//     handleClose = () => {
//         this.setState({
//             selected: null
//         })
//     }

//     handleInfoModal = (state, id = null) => {
//         this.setState({
//             showInfoModal: state,
//             id
//         })
//     }

//     handleTestModal = (state, id = null) => {
//         this.setState({
//             showTestModal: state,
//             id
//         })
//     }

//     handleTestChange = (testId, price) => {
//         const { id } = this.state
//         const { handleAppointmentTestChange } = this.props
//         handleAppointmentTestChange(testId, id, price)
//         this.handleTestModal(false)
//     }

//     render() {
//         const {
//             visible = false,
//             handleAppointmentModal,
//             appointments,
//             handleCancelAppointment,
//             loading,
//             error,
//             handleInfoSubmit,
//             labs,
//             handleToastClose,
//             currentTest,
//             services,
//             handleSendToLab,
//             initialSubServices,
//             testChangable = true
//         } = this.props;
//         const {
//             selected,
//             showInfoModal,
//             id,
//             showTestModal
//         } = this.state

//         return (
//             <>
//                 <Modal
//                     transparent={false}
//                     animationType="slide"
//                     onRequestClose={() => handleAppointmentModal(false)}
//                     visible={visible}
//                 >
//                     {
//                         selected &&
//                         <BottomSheet
//                             handleCancelAppointment={handleCancelAppointment}
//                             handleInfoModal={this.handleInfoModal}
//                             appointment={selected}
//                             handleClose={this.handleClose}
//                             handleTestModal={this.handleTestModal}
//                             handleSendToLab={handleSendToLab}
//                             testChangable={testChangable}
//                         />
//                     }
//                     {
//                         id &&
//                         <>
//                             <GetInfo
//                                 loading={loading}
//                                 error={error}
//                                 visible={showInfoModal}
//                                 handleInfoModal={this.handleInfoModal}
//                                 handleInfoSubmit={handleInfoSubmit}
//                                 labs={labs}
//                                 _id={id}
//                             />

//                             <TestList
//                                 services={services}
//                                 currentTest={appointments[appointments.findIndex(a => a._id == id)].subService._id}
//                                 visible={showTestModal}
//                                 handleTestModal={this.handleTestModal}
//                                 handleTestChange={this.handleTestChange}
//                                 initialSubServices={initialSubServices}
//                             />
//                         </>
//                     }
//                     <Container>
//                         {
//                             error !== '' &&
//                             <CustomToast text={error} duration={3000} onClose={handleToastClose} />
//                         }
//                         <Loader loading={loading} />

//                         <Content scrollEnabled={true} showsVerticalScrollIndicator={false}>
//                             <Text style={styles.heading}>Appointments</Text>
//                             {
//                                 appointments.map((appointment, ind) => (
//                                     <Appointment appointment={appointment} key={ind} handleSelection={this.handleSelection} />
//                                 ))
//                             }
//                         </Content>
//                         <Footer style={styles.footer}>
//                             <Button style={styles.footerButton} onPress={() => handleAppointmentModal(false)}>
//                                 <Text style={styles.footerButtonText}>Close</Text>
//                             </Button>
//                         </Footer>
//                     </Container>
//                 </Modal>
//             </>
//         )
//     }
// }

// export default Appointments

import React from 'react';
import { Text, Modal, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import Styles from './AppointmentsStyle';
import socket from 'socket.io-client/lib/socket';
import Appointment from '../Appointment/Appointment';
import BottomSheet from '../BottomSheet/BottomSheet';





function Appointments() {



    const [selected, setSelected] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [id, setId] = useState(null);

    const handleSelection = (appointment) => {

        setSelected(appointment)
    }


    const handleClose = () => {
        setSelected(null)
    }

    const handleInfoModal = (state, id = null) => {


        setShowInfoModal(state)
        setId(id)
    }

    const handleTestModal = (state, id = null) => {


        setShowTestModal(state)
        setId(id)
    }


 const    handleTestChange = (testId, price) => {
        // const { handleAppointmentTestChange } = this.props
        handleAppointmentTestChange(testId, id, price)
        handleTestModal(false)
    }


    return (
        <Modal
                    transparent={false}
                    animationType="slide"
                    onRequestClose={() => handleAppointmentModal(false)}
                    visible={visible}
                >
                    {
                        selected &&
                        <BottomSheet
                            handleCancelAppointment={handleCancelAppointment}
                            handleInfoModal={this.handleInfoModal}
                            appointment={selected}
                            handleClose={this.handleClose}
                            handleTestModal={this.handleTestModal}
                            handleSendToLab={handleSendToLab}
                            testChangable={testChangable}
                        />
                    }
                    {
                        id &&
                        <>
                            <GetInfo
                                loading={loading}
                                error={error}
                                visible={showInfoModal}
                                handleInfoModal={this.handleInfoModal}
                                handleInfoSubmit={handleInfoSubmit}
                                labs={labs}
                                _id={id}
                            />

                            <TestList
                                services={services}
                                currentTest={appointments[appointments.findIndex(a => a._id == id)].subService._id}
                                visible={showTestModal}
                                handleTestModal={this.handleTestModal}
                                handleTestChange={this.handleTestChange}
                                initialSubServices={initialSubServices}
                            />
                        </>
                    }
                    <Container>
                        {
                            error !== '' &&
                            <CustomToast text={error} duration={3000} onClose={handleToastClose} />
                        }
                        <Loader loading={loading} />

                        <Content scrollEnabled={true} showsVerticalScrollIndicator={false}>
                            <Text style={styles.heading}>Appointments</Text>
                            {
                                appointments.map((appointment, ind) => (
                                    <Appointment appointment={appointment} key={ind} handleSelection={this.handleSelection} />
                                ))
                            }
                        </Content>
                        <Footer style={styles.footer}>
                            <Button style={styles.footerButton} onPress={() => handleAppointmentModal(false)}>
                                <Text style={styles.footerButtonText}>Close</Text>
                            </Button>
                        </Footer>
                    </Container>
                </Modal>
    )
}

export default Appointments