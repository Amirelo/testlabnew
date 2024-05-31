// React and libs
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PermissionsAndroid, ScrollView} from 'react-native';

// Assets
import {logo_apple, logo_facebook, logo_google} from '../assets/logo';

// Models
import UserModel from '../models/UserModel';

// Services
import {EMAIL_REGEX, NAVIGATION_FARMINFO} from '../constants/AppConstants';

// Components
import {CustomText, CustomView} from '../components/atoms';
import {CustomButton, ImageButton, CustomInput} from '../components/molecules';

// User Preferences
import themes from '../themes/themes';

// Firebase
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {userAppleLogin, userFacebookLogin, userGoogleSignIn} from '../services/UserServices';

const SignUpScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conPassword, setConPassword] = React.useState('');

  const [hasError, setHasError] = React.useState(true);

  const [errName, setErrName] = React.useState('');
  const [errEmail, setErrEmail] = React.useState('');
  const [errPhone, setErrPhone] = React.useState('');
  const [errPassword, setErrPassword] = React.useState('');
  const [errConPassword, setErrConPassword] = React.useState('');

  // Navigate - go back to LoginScreen
  const onLoginPressed = () => {
    navigation.goBack();
  };

  // Navigate - farm info (register 2/4 screen)
  const onContinuePressed = async () => {
    const status = checkFields();
    if (status == false) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const token = await messaging().getToken();
      console.log('Token:', token);

      const user = new UserModel(
        email,
        password,
        'farmer',
        fullName,
        phone,
        token,
        token,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        [],
      );
      navigation.navigate(NAVIGATION_FARMINFO, {data: user});
    }
  };

  // Check for errors
  const checkFields = () => {
    var error = false;
    if (fullName.length == 0) {
      setErrName('Fields cannot be empty');
      error = true;
    } else {
      setErrName('');
    }

    if (email.length == 0) {
      setErrEmail('Fields cannot be empty');
      error = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setErrEmail('Wrong email format');
    } else {
      setErrEmail('');
    }
    if (phone.length == 0) {
      setErrPhone('Fields cannot be empty');
      error = true;
    } else {
      setErrPhone('');
    }
    if (password.length == 0) {
      setErrPassword('Fields cannot be empty');
      error = true;
    } else {
      setErrPassword('');
    }
    if (conPassword.length == 0) {
      setErrConPassword('Fields cannot be empty');
      error = true;
    } else if (password != conPassword) {
      error = true;
      setErrConPassword('Passwords does not match. Please check again');
    } else {
      setErrConPassword('');
    }

    return error;
  };

  const onGooglePressed = async () => {
    const res = await userGoogleSignIn();
    const curUser = res.user;
    if (curUser) {
      console.log("User found")
      setEmail(curUser.email)
      setFullName(curUser.name!)
    }
  };

  const onFacebookPressed = async () => {
    const res = await userFacebookLogin();
    setEmail(res.email)
    setFullName(res.name)
   
  };

  const onApplePressed = async () => {
    const res = await userAppleLogin()
  }

  // Update error status on fields' value changed
  React.useEffect(() => {
    const status = checkFields();

    setHasError(status);
  }, [fullName, email, phone, password, conPassword]);

  return (
    <CustomView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomView preset={'screen'}>
          {/* Steps */}
          <CustomText color={themes['defaultTheme'].textSub}>
            Signup 1 of 4
          </CustomText>

          {/* Welcome */}
          <CustomText preset={'header'} marginBottom={40}>
            Welcome!
          </CustomText>

          {/* Signup with social account */}
          <CustomView preset={'horizontalBetween'} marginBottom={32}>
            <ImageButton
              onPress={onGooglePressed}
              preset={'social'}
              src={logo_google}
            />
            <ImageButton onPress={onApplePressed} preset={'social'} src={logo_apple} />
            <ImageButton onPress={onFacebookPressed} preset={'social'} src={logo_facebook} />
          </CustomView>

          {/* Alternate Option */}
          <CustomText preset={'tiny'} textAlign={'center'}>
            Or signup with
          </CustomText>
          <CustomInput
            errMsg={errName}
            type={'name'}
            value={fullName}
            onChangeText={setFullName}
          />
          <CustomInput
            errMsg={errEmail}
            type={'email'}
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            errMsg={errPhone}
            type={'phone'}
            value={phone}
            onChangeText={setPhone}
          />
          <CustomInput
            errMsg={errPassword}
            type={'password'}
            value={password}
            onChangeText={setPassword}
          />
          <CustomInput
            errMsg={errConPassword}
            type={'password'}
            placeholder={'Re-enter passoword'}
            value={conPassword}
            onChangeText={setConPassword}
            isLast
          />

          {/* Buttons */}
          <CustomView
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: 54,
            }}>
            <CustomView
              preset={'horizontalBetween'}
              style={{justifyContent: 'flex-end'}}>
              <CustomButton
                style={{flex: 1, justifyContent: 'center'}}
                width={'auto'}
                preset={'tertiary'}
                onPress={onLoginPressed}>
                Login
              </CustomButton>
              <CustomButton
                style={{flex: 2}}
                width={'auto'}
                onPress={onContinuePressed}
                disabled={hasError}>
                Continue
              </CustomButton>
            </CustomView>
          </CustomView>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default SignUpScreen;
