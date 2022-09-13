import * as Keychain from 'react-native-keychain';
export const logout = async () => {
  await Keychain.resetGenericPassword();
};
