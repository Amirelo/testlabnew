// React and libs
import React from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Assets
import {ic_arrow_back} from '../assets/icons';

// Constants
import { NAVIGATION_SIGNUPCONFIRM } from '../constants/AppConstants';

// Services
import {userRegister} from '../services/UserServices';

// Models
import {UserModel} from '../models';

// Components
import {CustomView, CustomText} from '../components/atoms';
import {CheckButton, CustomButton, ImageButton} from '../components/molecules';

// User Preferences
import themes from '../themes/themes';

const SignUpHours = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [refresh, setRefresh] = React.useState(false);
  const [user, setUser] = React.useState<UserModel>();
  const [hours, setHours] = React.useState<any>({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });

  const [currentDay, setCurrentDate] = React.useState('mon');

  // Service - Sign Up
  const onSignUpPressed = async() => {
    if (user != null) {
      const newUser: UserModel = user;
      newUser.business_hours = hours;
      newUser.type = 'email';
      console.log('Register user info:', newUser);

      const res = await userRegister(newUser);
      // Navigate to login if success
      if (res.status == true){
        navigation.navigate(NAVIGATION_SIGNUPCONFIRM);
      }
    }
  };

  // Go back
  const onBackPressed = () => {
    navigation.goBack();
  };

  // Mark time in useState
  const onTimePressed = (time: string) => {
    var newHours = Array.of(hours)[0];
    setHours([]);
    console.log('Begin:', hours);
    // If time already exists
    if (hours[currentDay].includes(time)) {
      console.log('Removing ...');
      var changed = newHours[currentDay].filter((item: string) => item != time);
      newHours[currentDay] = changed;
      setHours(newHours);
      console.log('Update:', hours);
    }
    // If time not exists
    else {
      console.log('Adding ...');
      const prev = newHours[currentDay];
      delete newHours[currentDay];
      newHours[currentDay] = [...prev, time];
      setHours({
        ...newHours,
      });
      setRefresh(!refresh);
      console.log('Update:', hours);
    }
    setRefresh(!refresh);
  };

  // Get User
  React.useEffect(() => {
    if (route.params?.data) {
      setUser(route.params.data);
    }
  }, []);

  // Refresh
  React.useEffect(() => {
    setRefresh(!refresh);
  }, [hours[currentDay]]);

  return (
    <CustomView preset={'screen'}>
      <CustomText color={themes['defaultTheme'].textSub}>
        Signup 4 of 4
      </CustomText>
      <CustomText preset={'header'} marginBottom={24}>
        Buisness Hours
      </CustomText>
      <CustomText color={themes['defaultTheme'].textSub} marginBottom={40}>
        Choose the hours your farm is open for pickups. This will allow
        customers to order deliveries.
      </CustomText>

{/* Button - Day */}
      <CustomView
        preset={'horizontalBetween'}
        style={{alignItems: 'center'}}
        marginBottom={30}>
        <CheckButton
          data={'mon'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('mon')}>
          M
        </CheckButton>
        <CheckButton
          data={'tue'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('tue')}>
          T
        </CheckButton>
        <CheckButton
          data={'wed'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('wed')}>
          W
        </CheckButton>
        <CheckButton
          data={'thu'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('thu')}>
          Th
        </CheckButton>
        <CheckButton
          data={'fri'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('fri')}>
          F
        </CheckButton>
        <CheckButton
          data={'sat'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('sat')}>
          S
        </CheckButton>
        <CheckButton
          data={'sun'}
          hours={hours}
          curValue={currentDay}
          onPress={() => setCurrentDate('sun')}>
          Su
        </CheckButton>
      </CustomView>

      <CustomView
        preset={'horizontalBetween'}
        style={{alignItems: 'center', gap: 10, flexWrap: 'wrap'}}
        marginBottom={30}>
          {/* Button - Time */}
        <CheckButton
          data={'8:00am - 10:00am'}
          curValue={hours[currentDay]}
          preset={'time'}
          onPress={() => onTimePressed('8:00am - 10:00am')}>
          8:00am - 10:00am
        </CheckButton>
        <CheckButton
          data={'10:00am - 1:00pm'}
          curValue={hours[currentDay]}
          preset={'time'}
          onPress={() => onTimePressed('10:00am - 1:00pm')}>
          10:00am - 1:00pm
        </CheckButton>
        <CheckButton
          data={'1:00pm - 4:00pm'}
          curValue={hours[currentDay]}
          preset={'time'}
          onPress={() => onTimePressed('1:00pm - 4:00pm')}>
          1:00pm - 4:00pm
        </CheckButton>
        <CheckButton
          data={'4:00pm - 7:00pm'}
          curValue={hours[currentDay]}
          preset={'time'}
          onPress={() => onTimePressed('4:00pm - 7:00pm')}>
          4:00pm - 7:00pm
        </CheckButton>
        <CheckButton
          data={'7:00pm - 10:00pm'}
          curValue={hours[currentDay]}
          preset={'time'}
          onPress={() => onTimePressed('7:00pm - 10:00pm')}>
          7:00pm - 10:00pm
        </CheckButton>
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
            onPress={onSignUpPressed}>
            Signup
          </CustomButton>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default SignUpHours;
