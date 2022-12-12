import React, { Component } from 'react';
import { Text, Modal, View, SafeAreaView, TouchableOpacity, Picker, Image, ScrollView } from 'react-native';
import { styles } from './GetInfoStyle';
import { Button, Input, Item } from 'native-base';
// import { dangerColor, lightTextColor } from '../../constants';
import ImagePicker from 'react-native-image-picker';
// import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Loader from '../Loader/Loader'
function GetInfo({handleInfoModal,_id,visible, labs, error, loading}) {

    const [vtmNo, setVtmNo] = useState('');
    const [labId, setLabId] = useState('');
    const [labName, setLabName] = useState('');
    const [images, setImages] = useState('');

 

    const handleImage = async () => {
        const options = {
            title: 'Upload consent form',
            quality: 1,
            mediaType: 'photo',
            cameraType: 'front',
            noData: true,
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error) {
                images.push(response)
                setImages(images)
            }
        })
    }

    const handleDeleteImage = (ind) => {
        images.splice(ind, 1)
        setImages(images)
    }

    const handleInfoSubmit = () => {
        handleInfoSubmit(vtmNo, labId, labName, _id, images, () => {
            handleInfoModal(false)
        })
    }
    
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
                
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder='VTM Number'
                            placeholderTextColor={lightTextColor}
                            style={styles.input}
                            value={vtmNo}
                            onChangeText={(text) => setVtmNo(text)}

                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Picker
                            mode="dropdown"
                            style={[styles.input, { width: '100%' }]}
                            selectedValue={labName}
                            // onValueChange={(text) => handleInputs('labName', text)}
                            onValueChange={(text) => setLabName(text)}

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
                                        <TouchableOpacity style={styles.imageDeleteButton} onPress={() => handleDeleteImage(ind)} >
                                            <MaterialCommunityIcons name="trash-can" size={25} color={dangerColor} />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>

                    <Button style={styles.uploadButton} onPress={handleImage}>
                        <Text style={styles.uploadButtonText}>Upload Consent Form</Text>
                    </Button>

                    <Button style={styles.button} onPress={() => handleInfoSubmit()}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </Button>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </ScrollView>
        </Modal>
    )
}


export default GetInfo