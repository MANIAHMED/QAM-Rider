import React from 'react'
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Styles from './AppointmentStyles'
import _ from 'lodash';




function Appointment() {
    // const { appointment, handleSelection } = this.props;

  return (
    <TouchableOpacity style={Styles.appointmentListView} onPress={() => handleSelection(appointment)}>

    <View style={Styles.listItem}>
        <Text style={Styles.listItemTitle}>Name : </Text>
        <Text style={Styles.listItemText}> {appointment?.subService?.name || '-'} </Text>
    </View>

    <View style={Styles.listItem}>
        <Text style={Styles.listItemTitle}>User : </Text>
        <Text style={Styles.listItemText}> 
            {appointment.user ? `${appointment.user.firstName || ''}` : ' - '}
        </Text>
    </View>

    {appointment.status ? <View style={Styles.listItem}>
                <Text style={Styles.listItemTitle}>Status : </Text>
                <Text style={Styles.listItemText}> {_.capitalize(appointment.status).replace('_', ' ') || ' - '} </Text>
            </View> : null}
</TouchableOpacity>
  )
}

export default Appointment

