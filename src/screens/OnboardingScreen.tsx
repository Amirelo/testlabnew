// React and libs
import React, {createRef, useRef} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Animated, FlatList, StyleSheet, View} from 'react-native';

// Assets
import {
  image_onboarding_1,
  image_onboarding_2,
  image_onboarding_3,
} from '../assets';

// Constants
import {NAVIGATION_LOGIN} from '../constants/AppConstants';

// Models
import OnboardingModel from '../models/OnboardingModel';

// Components
import ItemOnboarding from '../components/molecules/ItemOnboarding';

// Utilities
import {screenWidth} from '../utils/Utils';
import {CustomView} from '../components/atoms';

const OnboardingScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();
  const flatListRef = createRef<FlatList>();

  const [curIndex, setCurIndex] = React.useState(0)

  const animatedValue1 = new Animated.Value(9)

  const stretch = () => {
    Animated.timing(animatedValue1, {
      useNativeDriver:true,
      toValue:16,
      duration:200
    }).start()
  }

  const onJoinPress = (index: number) => {
    if (index < 2) {
      setCurIndex(prev => prev+1)
      flatListRef?.current?.scrollToIndex({
        index: index + 1,
      });
    } else {
      setCurIndex(0)
      flatListRef?.current?.scrollToIndex({
        index: 0,
      });
    }
  };

  // Fields
  const [listOnboardings, setListOnboardings] = React.useState<
    Array<OnboardingModel>
  >([]);

  // Button - Go To Login
  const onLoginPressed = () => {
    navigation.navigate(NAVIGATION_LOGIN);
  };

  // Create onboarding items
  React.useEffect(() => {
    setListOnboardings([]);
    var onboarding1 = new OnboardingModel(
      1,
      'Quality',
      'Sell your farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.',
      image_onboarding_1,
      '#5EA25F',
    );
    setListOnboardings(prev => [...prev, onboarding1]);
    var onboarding2 = new OnboardingModel(
      2,
      'Convenient',
      'Our team of delivery drivers will make sure your orders are picked up on time and promptly delivered to your customers.',
      image_onboarding_2,
      '#D5715B',
    );
    setListOnboardings(prev => [...prev, onboarding2]);
    var onboarding3 = new OnboardingModel(
      3,
      'Local',
      'We love the earth and know you do too! Join us in reducing our local carbon footprint one order at a time.',
      image_onboarding_3,
      '#F8C569',
    );
    setListOnboardings(prev => [...prev, onboarding3]);
  }, []);

  return (
    <CustomView>
      {/* List of onboardings */}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        data={listOnboardings}
        ref={flatListRef}
        scrollEnabled={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <ItemOnboarding
            data={item}
            onLoginPressed={onLoginPressed}
            
            onJoinPressed={()=>onJoinPress(index)}
          />
        )}
      />
      {/* 3 dot */}
      <View style={styles.dotView}>
        <View style={curIndex == 0 ? styles.dot_selected : styles.dot} />
        <View style={curIndex == 1 ? styles.dot_selected : styles.dot} />
        <View style={curIndex == 2 ? styles.dot_selected : styles.dot} />
      </View>
    </CustomView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 600,
    position: 'absolute',
    alignSelf: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  dot_selected: {
    width: 16,
    height: 7,
    borderRadius: 10,
    backgroundColor: 'black',
  },
});
