import React from 'react';
import { Text, Modal, View, Picker, } from 'react-native';
import { styles } from './GetPaymentTypeStyle';
import { Body, Button, Card, CardItem, Container, Content, Footer, Item } from 'native-base';
import { PAYMENT_TYPE } from '../../utils/constant';
import Loader from '../Loader/Loader';
import CustomToast from '../Toast/Toast';

function GetPaymentType ({ 
     visible = false,
    error,
    loading,
    handlePaymentTypeChange,
    handlePaymentTypeSubmit,
    handleGetPaymentTypeModal,
    appointments,
    handleToastClose,
    vendorName}) {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => handleGetPaymentTypeModal(false)}>
                <Container>
                    <Loader loading={loading} />
                    {
                        error !== '' &&
                        <CustomToast text={error} duration={3000} onClose={handleToastClose} />
                    }
                    <Content>
                        <Text style={styles.heading}>Enter Payment Types For Paid Users</Text>
                        <View style={styles.inputsView}>
                            {
                                appointments.map((appointment, ind) => (
                                    <Card style={styles.card} key={ind}>
                                        <CardItem style={styles.cardItem}>
                                            <Body>
                                                <Text style={styles.nameText}>{appointment.user.firstName}</Text>
                                                <Item style={styles.inputItem}>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={[styles.input, { width: '100%' }]}
                                                        selectedValue={appointment.paymentType}
                                                        onValueChange={(text) => handlePaymentTypeChange(text, ind)}
                                                    >
                                                        <Picker.Item label="Select Payment Type" value="" />
                                                        {
                                                            Object.values(PAYMENT_TYPE).map((type, i) => (
                                                                <Picker.Item label={type.name.replace("{{1}}", vendorName)} value={type.value} key={i} />
                                                            ))
                                                        }

                                                    </Picker>
                                                </Item>
                                            </Body>
                                        </CardItem>
                                    </Card>

                                ))
                            }

                        </View>
                    </Content>
                    <Text style={styles.errorText}>{error}</Text>
                    <Footer style={styles.footer}>
                        <Button style={styles.footerButton} onPress={() => handlePaymentTypeSubmit()}>
                            <Text style={styles.footerButtonText}>Submit</Text>
                        </Button>
                    </Footer>
                </Container>
            </Modal >
        )
    }

export default GetPaymentType