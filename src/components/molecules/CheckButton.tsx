// React and libs
import React from 'react';
import {Pressable, StyleSheet, TextStyle, ViewStyle} from 'react-native';

// Components
import {CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  children: string;
  data?: any;
  curValue?: any;
  hours?: any;
  preset?: keyof typeof styles;
  width?: TextStyle['width'];
  marginBottom?: TextStyle['marginBottom'];
  color?: TextStyle['color'];
  onPress?(): void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textDecoration?: TextStyle['textDecorationLine'];
}

const CheckButton = (props: Props) => {
  // Fields
  const [isSelect, setIsSelect] = React.useState(false);

  // Style per status
  const curPreset = props.preset ?? 'box';
  const focusColorView: ViewStyle =
    curPreset == 'box'
      ? {backgroundColor: themes['defaultTheme'].primary}
      : {backgroundColor: themes['defaultTheme'].secondary};

  const emptyColorView: ViewStyle =
    curPreset == 'box'
      ? {
          borderWidth: 1,
          borderColor: themes['defaultTheme'].input,
          backgroundColor: themes['defaultTheme'].background,
        }
      : {};

  const focusColorText =
    curPreset == 'box'
      ? themes['defaultTheme'].background
      : themes['defaultTheme'].text;

  // Change status if select same day / time in day
  React.useEffect(() => {
    if (curPreset == 'box' && props.data == props.curValue) {
      setIsSelect(true);
    } else if (curPreset == 'time' && props.curValue.includes(props.data)) {
      setIsSelect(true);
    } else {
      setIsSelect(false);
    }
    console.log('Current value:', props.curValue);
  }, [props.curValue]);

  return (
    <Pressable
      style={{
        ...styles[curPreset],
        ...(isSelect
          ? focusColorView
          : curPreset == 'box' && props.hours[props.data].length == 0
          ? emptyColorView
          : ''),
        width: props.width ? props.width : styles[curPreset].width,
        marginBottom: props.marginBottom != null ? props.marginBottom : 16,
      }}
      onPress={props.onPress}>
        {/* Title */}
      <CustomText
        style={{...props.textStyle}}
        preset={'title'}
        marginBottom={0}
        color={
          isSelect
            ? focusColorText
            : curPreset == 'box' && props.hours[props.data].length == 0
            ? themes['defaultTheme'].input
            : themes['defaultTheme'].text
        }
        textAlign={'center'}>
        {props.children}
      </CustomText>
    </Pressable>
  );
};

export default CheckButton;

// Styling
const styles = StyleSheet.create({
  box: {
    width: 37,
    height: 36,
    borderRadius: 8,
    backgroundColor: themes['defaultTheme'].input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    width: '48%',
    height: 48,
    borderRadius: 8,
    backgroundColor: themes['defaultTheme'].input,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
