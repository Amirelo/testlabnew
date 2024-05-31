// React and libs
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

// Constants
import {NAVIGATION_LOGIN} from '../constants/AppConstants';

// Components
import {CustomText, CustomView} from '../components/atoms';
import {CustomButton, CustomInput} from '../components/molecules';
// User Preferences
import themes from '../themes/themes';

const ChangePasswordScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [password, setPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');
  const [hasError, setHasError] = React.useState(true);

  const onLoginPressed = () => {
    navigation.navigate(NAVIGATION_LOGIN);
  };

  const onSubmitPressed = () => {
    navigation.navigate(NAVIGATION_LOGIN);
  };

  // Check error status
  React.useEffect(() => {
    if (password.length == 0 || cPassword.length == 0) {
      setHasError(true);
      console.log('Fields cannot be empty');
    } else if (password != cPassword) {
      setHasError(true);
      console.log("Password doesn't match");
    } else {
      setHasError(false);
    }
  }, [password, cPassword]);

  return (
    <CustomView preset={'screen'}>
      {/* Welcome */}
      <CustomText preset={'header'}>ResetPassword</CustomText>

      {/* Login */}
      <CustomView preset={'horizontal'}>
        <CustomText color={themes['defaultTheme'].textSub} marginBottom={72}>
          {'Remember your password? '}
        </CustomText>

        {/* Button - Create Account */}
        <CustomButton
          onPress={onLoginPressed}
          textStyle={{fontSize: 14}}
          color={themes['defaultTheme'].primary}
          width={'auto'}
          textDecoration={'none'}
          preset={'tertiary'}>
          Login
        </CustomButton>
      </CustomView>

      {/* Fields */}
      <CustomInput
        type={'password'}
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        type={'password'}
        placeholder={'Confirm New Password'}
        value={cPassword}
        onChangeText={setCPassword}
        isLast
      />

      {/* Login Button */}
      <CustomButton onPress={onSubmitPressed} disabled={hasError}>Submit</CustomButton>
    </CustomView>
  );
};

export default ChangePasswordScreen;
