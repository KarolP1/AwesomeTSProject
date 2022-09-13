import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Subscription: undefined;
};
export type AuthScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
