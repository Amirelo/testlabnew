// React and libs
import React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Components
import {CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  children: string;
  preset?: keyof typeof styles;
  width?: TextStyle['width'];
  marginBottom?: TextStyle['marginBottom'];
  backgroundColor?: ViewStyle['backgroundColor'];
  color?: TextStyle['color'];
  onPress?(): void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textDecoration?: TextStyle['textDecorationLine'];
  disabled?: boolean;
}

const CustomButton = (props: Props) => {
  // Current preset
  const curPreset = props.preset ?? 'primary';

  // Create Animated component
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // Animation Value
  const animated = new Animated.Value(1);

  // Press - Blur
  const onPressIn = () => {
    Animated.timing(animated, {
      toValue: 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Press - Default
  const onPressOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={props.disabled}
      style={{
        ...styles[curPreset],
        opacity: animated,
        width: props.width ? props.width : styles[curPreset].width,
        marginBottom: props.marginBottom != null ? props.marginBottom : 16,
        backgroundColor: props.disabled
          ? themes['defaultTheme'].textSub
          : props.backgroundColor
          ? props.backgroundColor
          : curPreset == 'primary'
          ? themes['defaultTheme'].primary
          : curPreset == 'box'
          ? themes['defaultTheme'].input
          : '',
        ...props.style,
      }}
      onPress={props.onPress}>
      {/* Title */}
      <CustomText
        style={{...props.textStyle}}
        preset={'button'}
        textAlign={'center'}
        textDecoration={
          props.textDecoration
            ? props.textDecoration
            : curPreset == 'tertiary'
            ? 'underline'
            : 'none'
        }
        color={
          props.color
            ? props.color
            : curPreset == 'tertiary' || curPreset == 'box'
            ? 'black'
            : 'white'
        }>
        {props.children}
      </CustomText>
    </AnimatedPressable>
  );
};

export default CustomButton;

// Preset
const styles = StyleSheet.create({
  primary: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  tertiary: {
    width: 'auto',
    height: 'auto',
  },
  box: {
    width: 37,
    height: 36,
    borderRadius: 8,
    backgroundColor: themes['defaultTheme'].input,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
