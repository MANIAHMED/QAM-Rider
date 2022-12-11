import React, { Component } from 'react';
import { Text, Modal, View, SafeAreaView, TouchableOpacity, Picker, Image, ScrollView } from 'react-native';
import { styles } from './GetInfo.style';
import { Button, Input, Item } from 'native-base';
import { dangerColor, lightTextColor } from '../../constants';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Loader from '../Loader/Loader';
function GetInfo() {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         vtmNo: '',
    //         labId: '',
    //         labName: '',
    //         images: []
    //     };
    // }

    handleInputs = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleImage = async () => {
        const options = {
            title: 'Upload consent form',
            quality: 1,
            mediaType: 'photo',
            cameraType: 'front',
            noData: true,
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error) {
                let { images } = this.state

                images.push(response)

                this.setState({
                    images
                })
            }
        })
    }

    handleDeleteImage = (ind) => {
        let { images } = this.state

        images.splice(ind, 1)

        this.setState({
            images
        })
    }

    handleInfoSubmit = () => {
        let { vtmNo, labId, labName, images } = this.state
        let { handleInfoSubmit, _id, handleInfoModal } = this.props
        handleInfoSubmit(vtmNo, labId, labName, _id, images, () => {
            handleInfoModal(false)
        })
    }

    // render() {
    //     const { visible = false, handleInfoModal, labs, error, loading } = this.props;
    //     const { vtmNo, labId, labName, images } = this.state

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => handleInfoModal(false)}>
                <Loader loading={loading} />
                <ScrollView contentContainerStyle={styles.mainContainer}>
                    <View>
                        <Text style={styles.infoText}>Enter Information</Text>
                    </View>
                    <View style={styles.inputsView}>
                        {/* <Item style={styles.inputItem}>
                            <Input
                                placeholder='Lab ID'
                                placeholderTextColor={lightTextColor}
                                style={styles.input}
                                value={labId}
                                onChangeText={(text) => this.handleInputs('labId', text)}
                            />
                        </Item> */}
                        <Item style={styles.inputItem}>
                            <Input
                                placeholder='VTM Number'
                                placeholderTextColor={lightTextColor}
                                style={styles.input}
                                value={vtmNo}
                                onChangeText={(text) => this.handleInputs('vtmNo', text)}
                            />
                        </Item>
                        <Item style={styles.inputItem}>
                            <Picker
                                mode="dropdown"
                                style={[styles.input, { width: '100%' }]}
                                selectedValue={labName}
                                onValueChange={(text) => this.handleInputs('labName', text)}
                            >
                                <Picker.Item label="Select Lab" value="" />
                                {
                                    labs.map((lab, ind) => (
                                        <Picker.Item label={lab.name} value={lab._id} key={ind} />
                                    ))
                                }

                            </Picker>
                        </Item>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.imageScrollContainer}>
                                {
                                    images.map((image, ind) => (
                                        <View style={styles.imageView} >
                                            <Image source={{ uri: image.uri }} style={[styles.image, { aspectRatio: image.height / image.width }]} />
                                            <TouchableOpacity style={styles.imageDeleteButton} onPress={() => this.handleDeleteImage(ind)} >
                                                <MaterialCommunityIcons name="trash-can" size={25} color={dangerColor} />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </ScrollView>

                        <Button style={styles.uploadButton} onPress={this.handleImage}>
                            <Text style={styles.uploadButtonText}>Upload Consent Form</Text>
                        </Button>

                        <Button style={styles.button} onPress={() => this.handleInfoSubmit()}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </Button>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                </ScrollView>
            </Modal>
        )
    }


    export default GetInfo