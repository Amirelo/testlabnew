// React and libs
import {Image, ImageProps, ImageStyle, StyleSheet} from 'react-native';

// Interface
interface Props {
  src: ImageProps;
  preset?: keyof typeof styles;
  style?: ImageStyle;
}

const CustomImage = (props: Props) => {
  const curPreset = props.preset ? props.preset : 'icon';
  return (
    <Image
      style={{objectFit: 'cover', ...styles[curPreset], ...props.style}}
      source={props.src}
    />
  );
};

export default CustomImage;

// Preset
const styles = StyleSheet.create({
  icon: {
    width: 14,
    height: 14,
    objectFit: 'contain',
  },
  social: {
    width: 30,
    height: 30,
  },
  action: {
    width: 24,
    height: 20,
  },
  max: {
    width: '100%',
    height: '100%',
  },
  back: {
    width: 26,
    height: 26,
    objectFit: 'contain',
  },
  confirm: {
    width: 120,
    height: 120,
    objectFit: 'contain',
    marginBottom: 32,
  },
});
