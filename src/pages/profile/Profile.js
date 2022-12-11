import React from 'react';
import { Text, View } from 'react-native';
import { Header, ViewContainer } from '../../containers';
import Styles from './ProfileStyle'

function Profile() {

  const HeaderOption = {
    Title: 'Profile',
    isBack: false
  }



  return (
    <ViewContainer>
      <Header {...HeaderOption} />
      <View style={Styles.container}>
        <View style={Styles.profile} >
          <View style={Styles.profileLeft}><Text>Avatar</Text></View>
          <View style={Styles.profileCenter}>
            <Text>Bilal Siddiqui</Text>
          </View>
          <View style={Styles.profileRight}><Text> Online /Offile</Text></View>
        </View>
        <View>
          <View style={Styles.hr} />
          <View style={Styles.profile}>

            <View style={Styles.profileLeft}><Text>icon</Text></View>
            <View style={Styles.profileCenter}>
              <Text>Password </Text>
            </View>
            <View style={Styles.profileRight}><Text> icons</Text></View>
          </View>

          <View style={Styles.profile}>
            <View style={Styles.profileLeft}><Text>icon</Text></View>
            <View style={Styles.profileCenter}>
              <Text>About </Text>
            </View>
            <View style={Styles.profileRight}><Text> icons</Text></View>
          </View>

          <View style={Styles.profile}>
            <View style={Styles.profileLeft}><Text>icon</Text></View>
            <View style={Styles.profileCenter}>
              <Text>Logout </Text>
            </View>
            <View style={Styles.profileRight}><Text> icons</Text></View>
          </View>
        </View>
      </View>
    </ViewContainer>
  )
}

export default Profile