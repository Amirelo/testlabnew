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
  name: string;
  onClosePress?(): void;
}

const ItemVerification = (props: Props) => {
  return (
    <View style={styles.body}>
      {/* Title */}
      <CustomText marginBottom={0}>{props.name}</CustomText>
      {/* Close Button */}
      <ImageButton onPress={props.onClosePress} preset={'back'} src={ic_exit} />
    </View>
  );
};

export default ItemVerification;

// Styling
const styles = StyleSheet.create({
  body: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: themes['defaultTheme'].input,
    alignItems: 'center',
  },
});
