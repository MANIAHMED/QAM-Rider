import React, { Component } from 'react';
import { Text, Modal, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './TestList.style';
import { Button, Container, Content, Footer } from 'native-base';
import { Overlay } from 'react-native-elements';

class TestList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleTestChange = (id, price) => {
        let { handleTestChange, handleTestModal } = this.props
        handleTestChange(id, price)
        handleTestModal(false)
    }

    render() {
        const { visible = false, handleTestModal, currentTest, services, initialSubServices } = this.props;
        const subServices = services.filter(a => currentTest != a._id)

        return (
            <Overlay
                onBackdropPress={() => handleTestModal(false)}
                isVisible={visible}
            >
                <Container>
                    <Content contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        {
                            subServices.map((service, ind) => {
                                let initialInd = initialSubServices.findIndex(a => a.subService == service._id)
                                let price = service.price

                                if (initialInd != -1) {
                                    price = initialSubServices[initialInd].initialPrice
                                }
                                
                                return (
                                    <TouchableOpacity onPress={() => this.handleTestChange(service?.subService, price)} key={ind}>
                                        <View style={styles.listView} key={ind}>
                                            <Text style={styles.listViewText}>{service.name}</Text>
                                            <Text style={styles.listViewText}>{service?.price} AED</Text>
                                        </View>
                                    </TouchableOpacity>

                                )
                            })
                        }
                    </Content>
                    <Footer style={styles.footer}>
                        <Button style={styles.footerButton} onPress={() => handleTestModal(false)}>
                            <Text style={styles.footerButtonText}>Close</Text>
                        </Button>
                    </Footer>
                </Container>
            </Overlay>
        )
    }
}

export default TestList