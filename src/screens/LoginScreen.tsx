// React and libs
import React from 'react';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

// Assets
import {logo_apple, logo_facebook, logo_google} from '../assets/logo';

// Constants
import {
  EMAIL_REGEX,
  NAVIGATION_AUTHPASS,
  NAVIGATION_SIGNUP,
} from '../constants/AppConstants';

// Services
import {
  UserLogin,
  userFacebookLogin,
  userGoogleSignIn,
} from '../services/UserServices';

// Components
import {CustomView, CustomText} from '../components/atoms';
import {ImageButton, CustomButton, CustomInput} from '../components/molecules';

// User Preferences
import themes from '../themes/themes';

const LoginScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [hasError, setHasError] = React.useState(true);
  const [errEmail, setErrEmail] = React.useState('');
  const [errPass, setErrPass] = React.useState('');

  // Button - Forgot password
  const onForgotPressed = () => {
    navigation.navigate(NAVIGATION_AUTHPASS);
  };

  // Button - Create Account
  const onCreateAccountPressed = () => {
    navigation.navigate(NAVIGATION_SIGNUP);
  };

  // Button - Login
  const onLoginPressed = async () => {
    UserLogin(email, password, 'email');
  };

  const onGoogleLoginPressed = async () => {
    const res = await userGoogleSignIn();
  };

  const onFacebookPressed = async () => {
    const res = await userFacebookLogin();
  };

  // Check error status
  React.useEffect(() => {
    var error = false;
    if (email.length == 0) {
      setErrEmail('Fields cannot be empty');
      error = true;
    } else if (!EMAIL_REGEX.test(email)) {
      error = true;
      setErrEmail('Email format is not correct');
    } else {
      setErrEmail('');
    }

    if (password.length == 0) {
      setErrPass('Fields cannot be empty');
      error = true;
    } else {
      setErrPass('');
    }
    if (error == false) {
      setHasError(error);
    }
  }, [email, password]);

  return (
    <CustomView preset={'screen'}>
      {/* Welcome */}
      <CustomText preset={'header'}>Welcome back!</CustomText>

      {/* Create Account */}
      <View style={{flexDirection: 'row'}}>
        <CustomText color={themes['defaultTheme'].textSub} marginBottom={72}>
          {'New here? '}
        </CustomText>
        {/* Button - Create Account */}
        <CustomButton
          textStyle={{fontSize: 14}}
          color={themes['defaultTheme'].primary}
          width={'auto'}
          textDecoration={'none'}
          preset={'tertiary'}
          onPress={onCreateAccountPressed}>
          create account
        </CustomButton>
      </View>
      {/* Fields */}
      <CustomInput
        value={email}
        type={'email'}
        onChangeText={(value: string) => setEmail(value)}
        errMsg={errEmail}
      />
      <CustomInput
        value={password}
        type={'password'}
        isLast
        showForgot
        onForgotPress={onForgotPressed}
        onChangeText={(value: string) => setPassword(value)}
        errMsg={errPass}
      />

      {/* Login Button */}
      <CustomButton
        marginBottom={32}
        onPress={onLoginPressed}
        disabled={hasError}>
        Login
      </CustomButton>

      {/* Social Buttons */}
      <CustomText preset={'tiny'} textAlign={'center'} marginBottom={32}>
        Or login with
      </CustomText>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ImageButton
          onPress={onGoogleLoginPressed}
          src={logo_google}
          preset={'social'}
        />
        <ImageButton src={logo_apple} preset={'social'} />
        <ImageButton
          onPress={onFacebookPressed}
          src={logo_facebook}
          preset={'social'}
        />
      </View>
    </CustomView>
  );
};

export default LoginScreen;
