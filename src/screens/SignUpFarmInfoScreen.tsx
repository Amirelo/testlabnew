// React and libs
import React from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Models
import {UserModel} from '../models';

// Constants
import {NAVIGATION_VERIFICATION} from '../constants/AppConstants';

// Assets
import {ic_arrow_back} from '../assets/icons';

// Components
import {CustomText, CustomView} from '../components/atoms';
import {
  CustomButton,
  ImageButton,
  CustomInput,
  Dropdown,
} from '../components/molecules';

// User Preferences
import themes from '../themes/themes';

const SignUpFarmInfoScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [user, setUser] = React.useState<UserModel>();
  const [buisness, setBuisness] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [cityState, setCityState] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');

  const [hasError, setHasError] = React.useState(true);
  const [errBuisness, setErrBuisness] = React.useState('');
  const [errNickname, setErrNickname] = React.useState('');
  const [errAddress, setErrAddress] = React.useState('');
  const [errCity, setErrCity] = React.useState('');
  const [errCityState, setErrCityState] = React.useState('');
  const [errZipcode, setErrZipcode] = React.useState('');

  // Navigate - Confirm Screen (3/4)
  const onContinuePressed = () => {
    const status = fieldsCheck();
    console.log('Passed user:', user);
    if (status == false && user != null) {
      const newData: UserModel = user;
      console.log('zipcode:', zipcode, '\nState:', cityState);
      newData.setFarmInfo(
        buisness,
        nickname,
        address,
        city,
        cityState,
        zipcode,
      );
      setUser(newData);
      navigation.navigate(NAVIGATION_VERIFICATION, {data: user});
    }
  };

  // Check for error
  const fieldsCheck = () => {
    var error = false;
    if (buisness.length == 0) {
      error = true;
      setErrBuisness('Field cannot be empty');
    } else {
      setErrBuisness('');
    }
    if (nickname.length == 0) {
      error = true;
      setErrNickname('Field cannot be empty');
    } else {
      setErrNickname('');
    }
    if (address.length == 0) {
      error = true;
      setErrAddress('Field cannot be empty');
    } else {
      setErrAddress('');
    }
    if (city.length == 0) {
      error = true;
      setErrCity('Field cannot be empty');
    } else {
      setErrCity('');
    }
    if (cityState.length == 0) {
      error = true;
      setErrCityState('Must select a state');
    } else {
      setErrCityState('');
    }
    if (zipcode.length == 0) {
      error = true;
      setErrZipcode('Field cannot be empty');
    } else {
      setErrZipcode('');
    }
    return error;
  };

  // Navigate - previous screen
  const onBackPressed = () => {
    navigation.goBack();
  };

  // Get User
  React.useEffect(() => {
    if (route.params?.data) {
      setUser(route.params.data);
    }
  }, []);

  // Check and set error status on fields update
  React.useEffect(() => {
    const status = fieldsCheck();
    setHasError(status);
  }, [buisness, nickname, address, city, cityState, zipcode]);

  return (
    <CustomView preset={'screen'}>
      {/* Steps */}
      <CustomText color={themes['defaultTheme'].textSub}>
        Signup 2 of 4
      </CustomText>

      {/* Welcome */}
      <CustomText preset={'header'} marginBottom={40}>
        Farm Info
      </CustomText>

      {/* Info */}
      <CustomInput errMsg={errBuisness} onChangeText={setBuisness} type={'buisness'} />
      <CustomInput errMsg={errNickname} onChangeText={setNickname} type={'nickname'} />
      <CustomInput errMsg={errAddress} onChangeText={setAddress} type={'address'} />
      <CustomInput errMsg={errCity} onChangeText={setCity} type={'city'} />
      <CustomView preset={'horizontalBetween'} style={{gap: 16}}>
        <Dropdown
          errMsg={errCityState}
          flex={1}
          title={cityState ? cityState : 'State'}
          onOptionSelected={value => setCityState(value)}
        />
        <CustomInput errMsg={errZipcode} flex={2} onChangeText={setZipcode} type={'zip'} />
      </CustomView>
      {/* Buttons */}
      <CustomView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 54,
        }}>
        <CustomView
          preset={'horizontalBetween'}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageButton
            style={{flex: 1}}
            preset={'back'}
            src={ic_arrow_back}
            onPress={onBackPressed}
          />
          <CustomButton
            marginBottom={0}
            style={{flex: 2}}
            width={'auto'}
            onPress={onContinuePressed}
            disabled={hasError}>
            Continue
          </CustomButton>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default SignUpFarmInfoScreen;
