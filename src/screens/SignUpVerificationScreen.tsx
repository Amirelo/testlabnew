// React and libs
import React from 'react';
import {pick} from 'react-native-document-picker';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Assets
import {ic_arrow_back, ic_camera} from '../assets/icons';

// Constants
import {NAVIGATION_SIGNUPHOURS} from '../constants/AppConstants';

// Models
import {UserModel} from '../models';

// Components
import {CustomView, CustomText} from '../components/atoms';
import {
  CustomButton,
  ImageButton,
  ItemVerification,
} from '../components/molecules';

// User Preferences
import themes from '../themes/themes';

const SignUpVerificationScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [user, setUser] = React.useState<UserModel>();
  const [attachment, setAttachment] = React.useState<any>();
  const [hasError, setHasError] = React.useState(true);

  // Pass data to next screen
  const onContinuePressed = () => {
    if (attachment != null && user != null) {
      console.log('User data:', user);
      const newData: UserModel = user;
      newData.registration_proof = attachment.name;
      setUser(newData);
      navigation.navigate(NAVIGATION_SIGNUPHOURS, {data: user});
    }
  };

  // Go back
  const onBackPressed = () => {
    navigation.goBack();
  };

  // Pick PDF
  const onPickPressed = async () => {
    const [pickResult] = await pick();
    console.log('Pick result:', pickResult);
    setAttachment(pickResult);
  };

  // Delete attachments
  const onDeletePressed = () => {
    setAttachment(null);
  };

  // Get data from route
  React.useEffect(() => {
    if (route.params?.data) {
      setUser(route.params.data);
    }
  }, []);

  // Set error status based on fields
  React.useEffect(() => {
    if (attachment == null) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [attachment]);

  return (
    <CustomView preset={'screen'}>
      <CustomText color={themes['defaultTheme'].textSub}>
        Signup 3 of 4
      </CustomText>
      <CustomText preset={'header'} marginBottom={24}>
        Verification
      </CustomText>
      <CustomText color={themes['defaultTheme'].textSub} marginBottom={40}>
        Attached proof of Department of Agriculture registrations i.e. Florida
        Fresh, USDA Approved, USDA Organic
      </CustomText>

      <CustomView
        preset={'horizontalBetween'}
        style={{alignItems: 'center', marginBottom: 40}}>
        <CustomText>Attach proof of registration</CustomText>
        <ImageButton
          onPress={onPickPressed}
          src={ic_camera}
          preset={'action'}
        />
      </CustomView>

      {/* Proofs */}
      {attachment != null ? (
        <ItemVerification
          name={attachment.name}
          onClosePress={onDeletePressed}
        />
      ) : (
        <></>
      )}

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

export default SignUpVerificationScreen;
