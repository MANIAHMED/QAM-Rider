

import React from 'react';
import { Text, Modal, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Container, Content, Footer } from 'native-base';
import Styles from './AppointmentsStyle';
import Loader from '../Loader/Loader';
import CustomToast from '../Toast/Toast';
import socket from 'socket.io-client/lib/socket';
import Appointment from '../Appointment/Appointment';
import BottomSheet from '../BottomSheet/BottomSheet';
import GetInfo from './../GetInfo/GetInfo';
import TestList from './../TestList/TestList'





function Appointments({
    handleAppointmentTestChange,
    visible = false,
    handleAppointmentModal,
    appointments,
    handleCancelAppointment,
    loading,
    error,
    handleInfoSubmit,
    labs,
    handleToastClose,
    currentTest,
    services,
    handleSendToLab,
    initialSubServices,
    testChangable = true
}) {

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

    const handleTestChange = (testId, price) => {
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
                    handleInfoModal={handleInfoModal}
                    appointment={selected}
                    handleClose={handleClose}
                    handleTestModal={handleTestModal}
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
                        handleInfoModal={handleInfoModal}
                        handleInfoSubmit={handleInfoSubmit}
                        labs={labs}
                        _id={id}
                    />

                    <TestList
                        services={services}
                        currentTest={appointments[appointments.findIndex(a => a._id == id)].subService._id}
                        visible={showTestModal}
                        handleTestModal={handleTestModal}
                        handleTestChange={handleTestChange}
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
                    <Text style={Styles.heading}>Appointments</Text>
                    {
                        appointments.map((appointment, ind) => (
                            <Appointment appointment={appointment} key={ind} handleSelection={handleSelection} />
                        ))
                    }
                </Content>
                <Footer style={Styles.footer}>
                    <Button style={Styles.footerButton} onPress={() => handleAppointmentModal(false)}>
                        <Text style={Styles.footerButtonText}>Close</Text>
                    </Button>
                </Footer>
            </Container>
        </Modal>
    )
}

export default Appointments