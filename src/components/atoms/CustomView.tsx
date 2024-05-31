// React and libs
import {StyleSheet, View, ViewStyle} from 'react-native';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  children: any;
  preset?: keyof typeof styles;
  marginBottom?: ViewStyle['marginBottom'];
  style?: ViewStyle;
}

const CustomView = (props: Props) => {
  const curStyle = props.preset ? props.preset : 'default';
  return (
    <View
      style={{
        ...styles[curStyle],
        marginBottom: props.marginBottom,
        ...props.style,
      }}>
      {props.children}
    </View>
  );
};

export default CustomView;

// Preset
const styles = StyleSheet.create({
  screen: {
    backgroundColor: themes['defaultTheme'].background,
    paddingHorizontal: 30,
    height: '100%',
  },
  horizontalBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontal :{
    flexDirection:'row'
  },
  default: {},
});
