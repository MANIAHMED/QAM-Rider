import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Validations from './Validations';
import { Text, TouchableOpacity, View, Modal, Pressable, } from 'react-native';
import { CButton, CInput } from '../../../uiComponents';
import Styles from '../AuthStyle';
import GlobalStyle from "../../../assets/stylings/GlobalStyle";
import { MappedElement } from '../../../utils/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CLoading } from '../../../uiComponents';




function CForm({ submit, loading, navigate, methods, }) {

  const phone = useRef(null);
  const password = useRef(null);
  const [showPassword, togglePassword] = useState(false);

  return (
    <Formik
      onSubmit={(values) => submit(values)}
      initialValues={{
        phone: '',
        password: '',

      }}
      validationSchema={Validations}
    >
      {({ handleChange, values, handleSubmit, errors, setFieldValue }) => {
        return (
          <View style={[Styles.formContainer, { flexGrow: 1 }]}>
            <View style={Styles.formInnerContainer}>
              <View style={Styles.formInnerContainer}>
                <CInput
                  ref={phone}
                  inputLabel=" Phone"
                  placeholder=" phone"
                  value={values.userId}
                  onChangeText={handleChange('phone')}
                  inputContainerStyle={GlobalStyle.inputContainer}
                  inputLabelStyle={GlobalStyle.inputLabel}
                  style={GlobalStyle.inputStyle}
                  inputErrorStyle={GlobalStyle.errorTextStyle}
                  inputInnerContainerStyle={GlobalStyle.inputInnerContainerStyle}
                  error={errors.userId}
                  keyboardType="email-address"
                  returnKeyType="next"
                // onSubmitEditing={() => phone.current.focus()}
                />
                
                <CInput
                  ref={password}
                  inputLabel="Password"
                  placeholder="***************"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  inputContainerStyle={[GlobalStyle.inputContainer, GlobalStyle.lastInput]}
                  inputInnerContainerStyle={GlobalStyle.inputInnerContainerStyle}
                  inputLabelStyle={GlobalStyle.inputLabel}
                  inputErrorStyle={GlobalStyle.errorTextStyle}
                  style={GlobalStyle.inputStyle}
                  iconStyle={GlobalStyle.inputIcon}
                  iconButtonStyle={GlobalStyle.inputIconButton}
                  error={errors.password}
                  rightIconName={showPassword ? "show-password" : "hide-password"}
                  secureTextEntry={!showPassword}
                  toggleRightIconFunc={() => togglePassword(!showPassword)}
                  onSubmitEditing={() => handleSubmit()}
                  isPassword={true}
                />
                <View style={Styles.buttonContainer}>
                  <CButton title="Login" loading={loading} onPress={() => handleSubmit()}
                    buttonStyle={GlobalStyle.style}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
export default CForm;