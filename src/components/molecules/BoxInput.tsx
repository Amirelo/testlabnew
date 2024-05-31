// React and libs
import {StyleSheet, TextInput} from 'react-native';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  onChangeText?(value: string): void;
  ref?:any
  isLast?: boolean
}

const BoxInput = (props: Props) => {
  return (
    <TextInput
      style={styles.body}
      maxLength={1}
      keyboardType={'numeric'}
      returnKeyType={props.isLast ? 'done' : 'next'}
      ref={props.ref}
      onChangeText={value =>
        props.onChangeText ? props.onChangeText(value) : ''
      }
    />
  );
};

export default BoxInput;

// Styling
const styles = StyleSheet.create({
  body: {
    width: 58,
    height: 59,
    borderRadius: 8,
    backgroundColor: themes['defaultTheme'].input,
    textAlign: 'center',
  },
});
