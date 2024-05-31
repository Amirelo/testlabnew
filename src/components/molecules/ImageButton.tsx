// React and libs
import {
  Animated,
  ImageProps,
  ImageStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Components
import { CustomImage } from '../atoms';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  src: ImageProps;
  preset?: keyof typeof styles;
  marginBottom?: TextStyle['marginBottom'];
  backgroundColor?: ViewStyle['backgroundColor'];
  onPress?(): void;
  style?: ViewStyle;
  tintColor?: ImageStyle['tintColor'];
}

const ImageButton = (props: Props) => {
  // Current Preset
  const curPreset = props.preset ?? 'social';

  // Animated Component
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // Animated Value
  const animated = new Animated.Value(1);

  // Blur on Press
  const onPressIn = () => {
    Animated.timing(animated, {
      toValue: 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Back to default on press
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
      style={{
        ...styles[curPreset],
        opacity: animated,
        marginBottom: props.marginBottom,
        ...props.style,
      }}
      onPress={props.onPress}>
      {/* Image */}
      <CustomImage
        style={{tintColor: props.tintColor}}
        preset={curPreset}
        src={props.src}
      />
    </AnimatedPressable>
  );
};

export default ImageButton;

// Preset
const styles = StyleSheet.create({
  social: {
    borderWidth: 1,
    borderColor: themes['defaultTheme'].input,
    width: 96,
    height: 52,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    backgroundColor: themes['defaultTheme'].primary,
    borderRadius: 50,
    width: 53,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    width: 26,
    height: 26,
  },
});
