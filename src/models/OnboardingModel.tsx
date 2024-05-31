import {ImageSourcePropType} from 'react-native';

class OnboardingModel {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
  bgColor: string;

  constructor(
    id: number,
    title: string,
    description: string,
    image: ImageSourcePropType,
    bgColor: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.bgColor = bgColor;
  }
}

export default OnboardingModel;
