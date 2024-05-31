// React and libs
import React from 'react';
import {
  Animated,
  ImageProps,
  KeyboardType,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';

// Assets
import {
  ic_email,
  ic_lock,
  ic_phone,
  ic_person,
  ic_price_tag,
  ic_face_smile,
  ic_home,
  ic_location,
  ic_visible,
  ic_visible_off,
} from '../../assets/icons';

// Components
import {CustomImage, CustomText, CustomView} from '../atoms';
import {CustomButton, ImageButton} from '.';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  value?: string;
  placeholder?: string;
  marginBottom?: ViewStyle['marginBottom'];
  type?: keyof typeof iconType;
  icon?: ImageProps;
  showForgot?: boolean;
  onForgotPress?(): void;
  isLast?: boolean;
  width?: ViewStyle['width'];
  onChangeText?(value: string): void;
  errMsg?: string;
  flex?: ViewStyle['flex'];
}

// Default Preset
const iconType = {
  email: {
    icon: ic_email,
    placeholder: 'Email Address',
    keyboard: 'email-address',
  },
  password: {icon: ic_lock, placeholder: 'Password', keyboard: 'default'},
  phone: {icon: ic_phone, placeholder: 'Phone Number', keyboard: 'phone-pad'},
  name: {icon: ic_person, placeholder: 'Full Name', keyboard: 'default'},
  buisness: {
    icon: ic_price_tag,
    placeholder: 'Buisness Name',
    keyboard: 'default',
  },
  nickname: {
    icon: ic_face_smile,
    placeholder: 'Informal Name',
    keyboard: 'default',
  },
  address: {icon: ic_home, placeholder: 'Street Address', keyboard: 'default'},
  city: {icon: ic_location, placeholder: 'City', keyboard: 'default'},
  zip: {icon: null, placeholder: 'Zip Code', keyboard: 'numeric'},
};

const CustomInput = (props: Props) => {
  // Fields
  const [curType, setCurType] = React.useState(
    props.type ? props.type : 'email',
  );

  const [keyboard, setKeyboard] = React.useState<KeyboardType>(
    iconType[curType].keyboard as KeyboardType,
  );

  const [showPassword, setShowPassword] = React.useState(false);

  // Animated Value
  const animated = new Animated.Value(0);

  // Border color on focus
  const onFocus = () => {
    console.log('Focus');
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Return to default
  const onBlur = () => {
    console.log('blur');
    Animated.timing(animated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    // create Animated Component cause input to only accept 1 press and close
    <CustomView
      style={{
        ...styles.body,
        marginBottom: props.marginBottom
          ? props.marginBottom
          : props.isLast
          ? 32
          : 24,
        width: props.width,
        flex: props.flex,
        height: props.errMsg ? 'auto': 48
      }}>
      <Animated.View
        style={{
          ...styles.in,
          borderWidth: animated,
          elevation: animated,
        }}>
        {/* Icon */}
        {props.icon || iconType[curType].icon != null ? (
          <CustomImage src={props.icon ? props.icon : iconType[curType].icon} />
        ) : (
          <></>
        )}
        {/* Text Input */}
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboard}
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={curType == 'password' && !showPassword}
          style={styles.input}
          placeholder={
            props.placeholder != null
              ? props.placeholder
              : iconType[curType].placeholder
          }
        />
        {props.showForgot ? (
          <CustomButton
            onPress={props.onForgotPress}
            style={{width: 'auto'}}
            color={themes['defaultTheme'].primary}
            preset={'tertiary'}
            textDecoration={'none'}
            marginBottom={0}>
            Forgot?
          </CustomButton>
        ) : curType == 'password' && showPassword == true ? (
          <ImageButton src={showPassword ? ic_visible : ic_visible_off} />
        ) : (
          <></>
        )}
      </Animated.View>
      {props.errMsg && props.errMsg.length > 0 ? (
        <CustomText color={'red'}>{props.errMsg}</CustomText>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CustomInput;

// Styling
const styles = StyleSheet.create({
  body: {
  },
  in: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 8,
    backgroundColor: themes['defaultTheme'].input,
    borderColor: themes['defaultTheme'].primary,
  },
  input: {
    flex: 1,
  },
});
