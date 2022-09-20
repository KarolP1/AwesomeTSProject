import * as Keychain from 'react-native-keychain';
export const logout = async () => {
  await Keychain.resetGenericPassword();
};

export const getTokensKeychain = async (): Promise<{
  access_token: any;
  refresh_token: any;
} | null> => {
  const generic = await Keychain.getGenericPassword();
  if (!generic) return null;
  const pass = generic.password;
  const tokens = JSON.parse(pass);
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  };
};

export const setTokensToStorage = async (tokens: {
  access_token: string;
  refresh_token: string;
}) => {
  await Keychain.setGenericPassword('tokens', JSON.stringify(tokens));
};
