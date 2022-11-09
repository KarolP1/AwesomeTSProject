import {
  HomePageProp,
  HomeStackParamList,
  RootStackParamList,
} from './src/navigation/types';
import {LinkingOptions} from '@react-navigation/native';

export const linking: LinkingOptions<HomeStackParamList> = {
  prefixes: ['mychat://', 'https://blink.fix.me'],
  config: {
    screens: {
      HomePage: {
        screens: {
          Order: 'Order',
        },
      },
      Linking: 'Linking',
      HugeMenu2x2: 'HugeMenu2x2',
    },
  },
};
export const linkingLoggedOut: LinkingOptions<RootStackParamList> = {
  prefixes: ['mychat://', 'https://blink.fix.me'],
  config: {
    screens: {
      Login: {},
      Register: {},
    },
  },
};
