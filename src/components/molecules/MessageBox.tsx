// React and libs
import {StyleSheet, View} from 'react-native';

// Assets
import {ic_exit} from '../../assets/icons';

// Components
import {CustomText} from '../atoms';
import { ImageButton } from '.';

// User Preferences
import themes from '../../themes/themes';

// Interface
interface Props {
  title: string;
}

const MessageBox = (props: Props) => {
  return (
    <View style={styles.body}>
      <CustomText color={themes['defaultTheme'].background} preset={'title'}>
        {props.title}
      </CustomText>
      <ImageButton
        tintColor={themes['defaultTheme'].background}
        preset={'back'}
        src={ic_exit}
      />
    </View>
  );
};

export default MessageBox;

// Styling
const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    backgroundColor: themes['defaultTheme'].primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    width: '90%',
    height: 48,
    position: 'absolute',
    paddingHorizontal: 16,
  },
});
