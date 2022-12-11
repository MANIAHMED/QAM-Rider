import React, { Component } from 'react';
import { Text, Modal, View } from 'react-native';
import { styles } from './QRCode.style';
import { Button, Container, Content, Footer } from 'native-base';
import QRCodePkg from 'react-native-qrcode-svg';
import { consentUrl } from '../../helpers';

export default class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { visible = false, handleQRModal } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => handleQRModal(false)}>
                <Container>
                    <Content contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} scrollEnabled={false} >
                        <View style={styles.QRContainer} >
                            <QRCodePkg
                                size={200}
                                value={consentUrl}
                            />
                        </View>
                        <Text style={styles.QRText} >Scan QR Code for Consent Form</Text>
                    </Content>
                    <Footer style={styles.footer}>
                        <Button style={styles.footerButton} onPress={() => handleQRModal(false)}>
                            <Text style={styles.footerButtonText}>Close</Text>
                        </Button>
                    </Footer>
                </Container>
            </Modal>
        )
    }
}
