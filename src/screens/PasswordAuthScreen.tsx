// React and libs
import React, { createRef, useRef } from 'react';
import {TextInput, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

// Constants
import {NAVIGATION_CHANGEPASS} from '../constants/AppConstants';

// Services
import {sendOTP, verifyOTP} from '../services/UserServices';

// Components
import {CustomText, CustomView} from '../components/atoms';
import {CustomButton, CustomInput, BoxInput} from '../components/molecules';

// User Prefernces
import themes from '../themes/themes';
import { ResponseModel } from '../models';

const PasswordAuthScreen = () => {
  // Fields
  const [isSent, setIsSent] = React.useState(false);
  const [mobile, setMobile] = React.useState('');
  const [f1,setF1] = React.useState('')
  const [f2,setF2] = React.useState('')
  const [f3,setF3] = React.useState('')
  const [f4,setF4] = React.useState('')
  const [f5,setF5] = React.useState('')
  const navigation = useNavigation<NavigationProp<any>>();

  const [hasError, setHasError] = React.useState(true)
  const [s2Error, setS2Error] = React.useState(true)

  const ref_input2 = createRef<TextInput>()
  const ref_input3 = createRef<TextInput>()
  const ref_input4 = createRef<TextInput>()
  const ref_input5 = createRef<TextInput>()

  // Service - Send Code
  const onSendCodePressed = async () => {
    const res = await sendOTP(mobile);
    setIsSent(true);
  };

  // Go back
  const onLoginPressed = () => {
    navigation.goBack();
  };

  // Check OTP
  const onSubmitPressed = async() => {
    const otp = f1+f2+f3+f4+f5
    // const res:ResponseModel = await verifyOTP(otp);
    // if (res.status){
      navigation.navigate(NAVIGATION_CHANGEPASS);
    // }
  };

  // Resend OTP
  const onResendPasswordPressed = async () => {
    setIsSent(false)
  };

  const setValue = (value:string, type: number) =>{
    switch(type){
      case 1: 
        setF1(value)
        ref_input2.current?.focus()
        break
      case 2:
        setF2(value)
        ref_input3.current?.focus()
        break
      case 3:
        setF3(value)
        ref_input4.current?.focus()
        break
      case 4:
        setF4(value)
        ref_input5.current?.focus()
        break
      case 5:
        setF5(value)
        break
    }
  }

  // Update error status
  React.useEffect(()=>{
    if(mobile.length == 0 ){
      setHasError(true)
    } else{
      setHasError(false)
    }
    if (f1.length == 0 || f2.length == 0 || f3.length ==0 || f4.length == 0 || f5.length == 0){
      setS2Error(true)
    } else{
      setS2Error(false)
    }
  },[mobile, f1,f2,f3,f4,f5])

  return (
    <CustomView preset={'screen'}>
      {isSent == false ? (
        <>
          {/* Welcome */}
          <CustomText preset={'header'}>Forgot Password</CustomText>

          {/* Login */}
          <View style={{flexDirection: 'row'}}>
            <CustomText
              color={themes['defaultTheme'].textSub}
              marginBottom={72}>
              {'Remember your password? '}
            </CustomText>
            <CustomButton
              onPress={onLoginPressed}
              textStyle={{fontSize: 14}}
              color={themes['defaultTheme'].primary}
              width={'auto'}
              textDecoration={'none'}
              preset={'tertiary'}>
              Login
            </CustomButton>
          </View>

          {/* Fields */}
          <CustomInput
            type={'phone'}
            value={mobile}
            placeholder="Phone Number"
            onChangeText={setMobile}
            isLast
          />

          {/* Login Button */}
          <CustomButton disabled={hasError} onPress={onSendCodePressed}>Send Code</CustomButton>
        </>
      ) : (
        <View>
          {/* Welcome */}
          <CustomText preset={'header'}>Verify OTP</CustomText>

          {/* Login */}
          <View style={{flexDirection: 'row'}}>
            <CustomText
              color={themes['defaultTheme'].textSub}
              marginBottom={72}>
              {'Remember your password? '}
            </CustomText>
            <CustomButton
              onPress={onLoginPressed}
              textStyle={{fontSize: 14}}
              color={themes['defaultTheme'].primary}
              width={'auto'}
              textDecoration={'none'}
              preset={'tertiary'}>
              Login
            </CustomButton>
          </View>

          {/* Fields */}
          <CustomView preset={'horizontalBetween'} marginBottom={40}>
            <BoxInput onChangeText={(value) => setValue(value,1)}/>
            <BoxInput ref={ref_input2} onChangeText={(value) => setValue(value,2)}/>
            <BoxInput ref={ref_input3} onChangeText={(value) => setValue(value,3)}/>
            <BoxInput ref={ref_input4} onChangeText={(value) => setValue(value,4)}/>
            <BoxInput ref={ref_input5} onChangeText={(value) => setValue(value,5)}/>
          </CustomView>

          {/* Buttons */}
          <CustomButton onPress={onSubmitPressed} disabled={s2Error}>Submit</CustomButton>
          <CustomButton preset={'tertiary'} onPress={onResendPasswordPressed}>
            Resend Code
          </CustomButton>
        </View>
      )}
    </CustomView>
  );
};

export default PasswordAuthScreen;
