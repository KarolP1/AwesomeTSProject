import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {type NativeStackNavigationOptions} from '@react-navigation/native-stack';
export const StackDefaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait_up',
};

export const TabDefaultOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,

  tabBarStyle: {
    position: 'absolute',
    marginHorizontal: 10,
    marginVertical: 10,
    height: 83,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,.65)',
    shadowColor: 'rgba(0,0,0,0.15)',
    zIndex: 0,
  },
};
