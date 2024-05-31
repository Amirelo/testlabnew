// React and libs
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

// Assets
import {ic_chevron_down} from '../../assets/icons';

// Components
import {CustomText, CustomImage} from '../atoms';
import {CustomButton} from '.';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  title: string;
  onOptionSelected?(value: string): void;
  flex?: ViewStyle['flex'];
  errMsg?: string;
}

const Dropdown = (props: Props) => {
  const [show, setShow] = React.useState(false);

  // Update value on Option Item Selected
  const onSelected = (value: string) => {
    if (props.onOptionSelected) {
      console.log('Selected:', value);
      props.onOptionSelected(value);
    }
    setShow(false);
  };

  return (
    <View style={{width: '30%', flex: props.flex}}>
      <Pressable onPress={() => setShow(!show)} style={styles.body}>
        <CustomText marginBottom={0}>{props.title}</CustomText>
        <CustomImage src={ic_chevron_down} />
      </Pressable>
      {show ? (
        // Options
        <View>
          <CustomButton
            onPress={() => onSelected('Option1')}
            preset={'tertiary'}>
            Option1
          </CustomButton>
          <CustomButton
            onPress={() => onSelected('Option2')}
            preset={'tertiary'}>
            Option2
          </CustomButton>
          <CustomButton
            onPress={() => onSelected('Option3')}
            preset={'tertiary'}>
            Option3
          </CustomButton>
        </View>
      ) : (
        <></>
      )}
      {props.errMsg ? (
        <CustomText color={'red'}>{props.errMsg}</CustomText>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Dropdown;

// Styling
const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 48,
    backgroundColor: themes['defaultTheme'].input,
  },
});
