// React and libs
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Constants
import {
  NAVIGATION_AUTHPASS,
  NAVIGATION_CHANGEPASS,
  NAVIGATION_FARMINFO,
  NAVIGATION_LOGIN,
  NAVIGATION_ONBOARDING,
  NAVIGATION_SIGNUP,
  NAVIGATION_SIGNUPCONFIRM,
  NAVIGATION_SIGNUPHOURS,
  NAVIGATION_VERIFICATION,
} from '../../constants/AppConstants';

// Components
import {CustomText} from '../../components/atoms';

// Screens
import {
  LoginScreen,
  OnboardingScreen,
  ChangePasswordScreen,
  PasswordAuthScreen,
  SignUpScreen,
  SignUpFarmInfoScreen,
  SignUpVerificationScreen,
  SignUpHours,
  SignUpConfirm,
} from '..';

// User Preferences
import themes from '../../themes/themes';
import MessageBox from '../../components/molecules/MessageBox';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // Headers - FarmEats
            header: () => (
              <View
                style={{backgroundColor: themes['defaultTheme'].background}}>
                <CustomText
                  preset={'title'}
                  style={{paddingVertical: 32, paddingLeft: 30}}>
                  FarmerEats
                </CustomText>
              </View>
            ),
          }}
          initialRouteName={NAVIGATION_ONBOARDING}>
          <Stack.Screen
            options={{headerShown: false}}
            name={NAVIGATION_ONBOARDING}
            component={OnboardingScreen}
          />
          <Stack.Screen name={NAVIGATION_LOGIN} component={LoginScreen} />
          <Stack.Screen
            name={NAVIGATION_CHANGEPASS}
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name={NAVIGATION_AUTHPASS}
            component={PasswordAuthScreen}
          />
          <Stack.Screen name={NAVIGATION_SIGNUP} component={SignUpScreen} />
          <Stack.Screen
            name={NAVIGATION_FARMINFO}
            component={SignUpFarmInfoScreen}
          />
          <Stack.Screen
            name={NAVIGATION_VERIFICATION}
            component={SignUpVerificationScreen}
          />
          <Stack.Screen name={NAVIGATION_SIGNUPHOURS} component={SignUpHours} />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAVIGATION_SIGNUPCONFIRM}
            component={SignUpConfirm}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* Message box */}
      {/* <View style={{flex:1, position:'absolute', width:'100%', height:'100%', alignItems:'center', justifyContent:'flex-end', bottom:20}}>
        <MessageBox title={'something'} />
      </View> */}
    </View>
  );
};

export default AppNavigation;
