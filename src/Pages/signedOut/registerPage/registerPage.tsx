import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LoggedOutBackground from '../../../components/background/loggedOutBackground';
import {TextInputCustom} from '../../../components/TextInputs';
import {
  addressType,
  initialAddress,
  initialRegosterForm,
  IRegisterForm,
} from '../../../redux/Auth/AuthTypes';
import {registerThunk} from '../../../redux/Auth/thunks';
import {AuthScreenProp} from '../../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Subscryptions from './subscryptions';
import {
  cleanUpRegister,
  getRegisterError,
  getRegisterStateState,
  getRegisterStatus,
} from '../../../redux/Auth/registerReducer';
import Spinner from 'react-native-spinkit';
import {RootState} from '../../../redux/store';

const RegisterPage = () => {
  const isLoading = getRegisterStateState();
  const registerStatus = getRegisterStatus();
  const registerError = getRegisterError();

  const regState = useAppSelector((state: RootState) => state.register);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthScreenProp>();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isPasswordMatch, setisPasswordMatch] = useState(false);
  const [selected, setSelected] = useState<null | number>(null);
  const [subName, setSubName] = useState<string | null>(null);

  const [registerForm, setRegisterForm] =
    useState<IRegisterForm>(initialRegosterForm);
  const [address, setAddress] = useState<addressType>(initialAddress);

  //#region effects
  useEffect(() => {
    if (regState.error) {
      Alert.alert(
        'Hey There!',
        regState.error + ', Try Again from the begining.',
        [
          {
            text: 'Ok',
            onPress: async () => {
              dispatch(cleanUpRegister());
              setStep(0);
            },
          },
        ],
      );
    }
    if (regState.succes === true) {
      navigation.navigate('Login');
      dispatch(cleanUpRegister());
    }
  }, [regState]);

  useEffect(() => {
    setRegisterForm({...registerForm, address});
  }, [address]);

  useEffect(() => {
    if (registerForm.password === registerForm.confirmPassword)
      setisPasswordMatch(true);
    else setisPasswordMatch(false);
    return () => {};
  }, [registerForm.password, registerForm.confirmPassword]);

  useEffect(() => {
    if (subName !== null) {
      setRegisterForm({...registerForm, userRole: subName});
    }
  }, [subName]);
  //#endregion

  //#region Private Methods
  const increment = () => {
    switch (step) {
      case 0:
        return setStep(1);
      case 1:
        return setStep(2);
      case 2:
        return setStep(3);
      case 3:
        return;
      default:
        break;
    }
  };
  const decrement = () => {
    switch (step) {
      case 0:
        return;
      case 1:
        return setStep(0);
      case 2:
        return setStep(1);
      case 3:
        return setStep(2);
      default:
        break;
    }
  };
  //#endregion

  async function registerFunction() {
    if (isPasswordMatch) {
      dispatch(registerThunk(registerForm));
    } else if (selected === null) {
      setStep(3);
    } else {
      setStep(1);
    }
  }
  return (
    <LoggedOutBackground>
      <>
        {!isLoading ? (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              flexGrow: 1,
            }}>
            <Text style={styles.title}>Sign Up there.</Text>
            {step === 0 && (
              <>
                <TextInputCustom
                  placeholder="first_name"
                  onChange={setRegisterForm}
                  name="first_name"
                  state={registerForm}
                  value={registerForm.first_name}
                />
                <TextInputCustom
                  placeholder="last_name"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="last_name"
                  value={registerForm.last_name}
                />
                <TextInputCustom
                  placeholder="email"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="email"
                  value={registerForm.email}
                />
                <TextInputCustom
                  placeholder="name"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="name"
                  value={registerForm.name}
                />
              </>
            )}
            {step === 1 && (
              <>
                <TextInputCustom
                  placeholder="phone_number"
                  onChange={setRegisterForm}
                  name="phone_number"
                  state={registerForm}
                  value={registerForm.phone_number}
                />
                <TextInputCustom
                  placeholder="birth day (yyyy-mm-dd)"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="birth_year"
                  value={registerForm.birth_year}
                />
                <TextInputCustom
                  placeholder="password"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="password"
                  value={registerForm.password}
                />
                {!isPasswordMatch && (
                  <Text style={{color: 'red'}}>password not match</Text>
                )}
                <TextInputCustom
                  placeholder="confirmPassword"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                />
                {!isPasswordMatch && (
                  <Text style={{color: 'red'}}>password not match</Text>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <TextInputCustom
                  placeholder="country"
                  onChange={setAddress}
                  name="country"
                  state={address}
                  value={address.country}
                />
                <TextInputCustom
                  placeholder="city"
                  onChange={setAddress}
                  state={address}
                  name="city"
                  value={address.city}
                />
                <TextInputCustom
                  placeholder="state"
                  onChange={setAddress}
                  state={address}
                  name="state"
                  value={address.state}
                />
                <TextInputCustom
                  placeholder="postcode"
                  onChange={setAddress}
                  state={address}
                  name="postcode"
                  value={address.postcode}
                />
                <TextInputCustom
                  placeholder="street"
                  onChange={setAddress}
                  state={address}
                  name="street"
                  value={address.street}
                />
                <TextInputCustom
                  placeholder="buildingnumber"
                  onChange={setAddress}
                  state={address}
                  name="buildingnumber"
                  value={address.buildingnumber}
                />
              </>
            )}
            {step === 3 && (
              <Subscryptions
                selected={selected}
                setSelected={setSelected}
                setSubName={setSubName}
              />
            )}
            <View style={styles.DumbContainer}>
              {step === 3 && (
                <TouchableOpacity
                  style={styles.LoginButton}
                  onPress={registerFunction}>
                  <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
              )}
              {step !== 3 && (
                <TouchableOpacity
                  style={styles.LoginButton}
                  onPress={increment}>
                  <Text style={styles.textButton}>Next</Text>
                </TouchableOpacity>
              )}
              {step !== 0 && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={decrement}>
                  <Text style={styles.textButton}>back</Text>
                </TouchableOpacity>
              )}
              {step === 0 && <View style={styles.emptyContainerButton}></View>}
            </View>
            <TouchableOpacity
              style={styles.redirectButton}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textRedirect}>
                Already have an account? Click there.
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner
              // style={styles.spinner}
              isVisible={isLoading}
              size={100}
              type={'ThreeBounce'}
              color={'#EA3651'}
            />
          </View>
        )}
      </>
    </LoggedOutBackground>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    widths: '100%',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginVertical: 20,
  },
  LoginButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#EA3651',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,

    marginHorizontal: 10,
    width: '45%',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgb(80,80,80)',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,

    marginHorizontal: 10,
    width: '45%',
  },
  emptyContainerButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,

    marginHorizontal: 10,
    width: '45%',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
  },
  DumbContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  textRedirect: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  redirectButton: {
    alignItems: 'center',
    marginVertical: 15,
  },
});
