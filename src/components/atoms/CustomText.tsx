// React and libs
import {StyleSheet, Text, TextStyle} from 'react-native';

// User Preferences
import themes from '../../themes/themes';

// Properties
interface Props {
  color?: TextStyle['color'];
  textAlign?: TextStyle['textAlign'];
  preset?: keyof typeof styles;
  marginBottom?: TextStyle['marginBottom'];
  textDecoration?: TextStyle['textDecorationLine'];
  children: string;
  style?: TextStyle;
}

const CustomText = (props: Props) => {
  const curPreset = props.preset ?? 'normal';
  return (
    <Text
      style={{
        ...styles[curPreset],
        color: props.color
          ? props.color
          : styles[curPreset].color
          ? styles[curPreset].color
          : themes['defaultTheme'].text,
        textAlign: props.textAlign,
        marginBottom:
          props.marginBottom != null
            ? props.marginBottom
            : styles[curPreset].marginBottom,
        textDecorationLine: props.textDecoration,
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
};

export default CustomText;

// Styling
const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: themes['defaultTheme'].text,
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: themes['defaultTheme'].text,
    marginBottom: 8,
  },
  button: {
    fontSize: 18,
    color: themes['defaultTheme'].background,
    marginBottom: 0,
  },
  title: {
    fontSize: 16,
    color: themes['defaultTheme'].text,
    marginBottom: 8,
  },
  normal: {
    fontSize: 14,
    fontWeight: '500',
    color: themes['defaultTheme'].text,
    marginBottom: 8,
  },
  small: {
    fontSize: 12,
    fontWeight: '500',
    color: themes['defaultTheme'].textSub,
    marginBottom: 8,
  },
  tiny: {
    fontSize: 10,
    color: themes['defaultTheme'].textSub,
    marginBottom: 8,
  },
});
