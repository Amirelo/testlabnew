// React and libs
import {NavigationProp, useNavigation} from '@react-navigation/native';

// Assets
import {ic_success} from '../assets/icons';

// Constants
import {NAVIGATION_LOGIN} from '../constants/AppConstants';

// Components
import {CustomView, CustomText, CustomImage} from '../components/atoms';
import {CustomButton} from '../components/molecules';

const SignUpConfirm = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();

  // Return to login screen
  const onContinuePressed = () => {
    navigation.navigate(NAVIGATION_LOGIN);
  };

  return (
    <CustomView preset={'screen'} style={{alignItems: 'center'}}>
      <CustomImage preset={'confirm'} src={ic_success} />
      <CustomText preset={'header'}>You're all done!</CustomText>
      <CustomText preset={'small'} textAlign={'center'}>
        Hang tight! We are currently reviewing your account and will follow up
        with you in 2-3 business days. In the meantime, you can setup your
        inventory.
      </CustomText>

      <CustomView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 54,
          width: '100%',
        }}>
        <CustomButton marginBottom={0} onPress={onContinuePressed}>
          Continue
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default SignUpConfirm;
