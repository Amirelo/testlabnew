// React and libs
import {Image, StyleSheet, View} from 'react-native';

// Models
import OnboardingModel from '../../models/OnboardingModel';

// Components
import {CustomText} from '../atoms';
import CustomButton from './CustomButton';
import {screenHeight, screenWidth} from '../../utils/Utils';

interface Props {
  data: OnboardingModel;
  onLoginPressed?(): void;
  onJoinPressed?(): void;
}

const ItemOnboarding = (props: Props) => {
  return (
    <View
      style={{
        ...styles.box,
        backgroundColor: props.data.bgColor,
      }}>
      {/* Header Image */}
      <Image
        style={{flex: 1, marginBottom: 19, width: '100%'}}
        source={props.data.image}
      />
      <View style={styles.bottom}>
        {/* Title */}
        <CustomText preset={'subHeader'} marginBottom={40}>
          {props.data.title}
        </CustomText>
        {/* Description */}
        <CustomText marginBottom={120} textAlign={'center'}>
          {props.data.description}
        </CustomText>

        {/* Buttons */}
        <CustomButton
          backgroundColor={props.data.bgColor}
          marginBottom={16}
          onPress={props.onJoinPressed}>
          Join the movement
        </CustomButton>

        <CustomButton preset={'tertiary'} onPress={props.onLoginPressed}>
          Login
        </CustomButton>
      </View>
    </View>
  );
};

export default ItemOnboarding;

// Styling
const styles = StyleSheet.create({
  box: {
    height: screenHeight,
    width: screenWidth,
  },
  bottom: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 31,
  },
});
