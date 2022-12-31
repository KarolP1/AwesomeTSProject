import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LoggedOutBackground from '../../../components/background/loggedOutBackground';
import {TextInputCustom} from '../../../components/TextInputs';
import {
  addressType,
  initialAddress,
  initialRegosterForm,
  IRegisterForm,
  IStripeDetails,
  IStripeRegister,
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
import TickButton from '../../../components/buttons/tickButton';
import SelectDropdown from 'react-native-select-dropdown';
import {default as ccjson} from '../../../static/coutrycurrency.json';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import registerStripeReducer, {
  registerStripeThunk,
} from '../../../redux/Auth/registerStripeReducer';

const RegisterPage = () => {
  const isLoading = getRegisterStateState();

  const regState = useAppSelector((state: RootState) => state.register);

  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthScreenProp>();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isPasswordMatch, setisPasswordMatch] = useState(false);
  const [selected, setSelected] = useState<null | number>(null);
  const [subName, setSubName] = useState<string | null>(null);

  const [registerForm, setRegisterForm] =
    useState<IRegisterForm>(initialRegosterForm);
  const [address, setAddress] = useState<addressType>(initialAddress);
  const [stripeDetails, setStripeDetails] = useState<IStripeDetails>({
    stripe_account_number: initialRegosterForm.stripe.stripe_account_number,
    stripe_currency: initialRegosterForm.stripe.stripe_currency,
    stripe_company_name: initialRegosterForm.stripe.stripe_company_name,
    stripe_country: initialRegosterForm.stripe.stripe_country,
    stripe_routing_number: initialRegosterForm.stripe.stripe_routing_number,
    ssn_last4: initialRegosterForm.stripe.ssn_last4,
  });

  const ccList: {
    country: string;
    countryCode: string;
    currencyCode: string;
  }[] = ccjson;
  const [selectedCountry, setSelectedCountry] = useState<{
    country: string;
    countryCode: string;
    currencyCode: string;
  } | null>(null);

  const [stripeRegisterForm, setStripeRegisterForm] = useState<IStripeRegister>(
    {
      account_number: '',
      country: '',
      address: {city: '', country: '', line1: '', postal_code: '', state: ''},
      currency: '',
      dob: {day: '', month: '', year: ''},
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      routing_number: '',
      ssn_last_4: '',
    },
  );

  useEffect(() => {
    const dobsplited = registerForm.birth_year.split('-');
    const dob = {
      year: dobsplited[0],
      month: dobsplited[1],
      day: dobsplited[2],
    };
    setStripeRegisterForm({
      ...stripeRegisterForm,
      dob: dob,
      email: registerForm.email,
      first_name: registerForm.first_name,
      last_name: registerForm.last_name,
      phone_number: registerForm.phone_number,
      address: {
        city: registerForm.address.city,
        country: registerForm.address.country,
        postal_code: registerForm.address.postcode,
        line1: `${registerForm.address.street} ${registerForm.address.buildingnumber}`,
        state: registerForm.address.state,
      },
      account_number: stripeDetails.stripe_account_number,
      routing_number: stripeDetails.stripe_routing_number,
      ssn_last_4: stripeDetails.ssn_last4,
    });
    console.log(stripeRegisterForm);
  }, [registerForm, stripeDetails]);

  //#region effects

  useEffect(() => {
    if (selectedCountry) {
      setStripeDetails({
        ...stripeDetails,
        stripe_country: selectedCountry.countryCode,
        stripe_currency: selectedCountry.currencyCode,
      });
      setAddress({...address, country: selectedCountry?.country});
      setStripeRegisterForm({
        ...stripeRegisterForm,
        country: selectedCountry.countryCode,
        currency: selectedCountry.currencyCode,
      });
    }
  }, [selectedCountry]);
  const {succes, error, data} = useAppSelector(state => state.stripe);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
    if (isStripeSkipped === true && regState.succes === true) {
      navigation.navigate('Login');
      dispatch(cleanUpRegister());
    }

    if (isStripeSkipped === false && regState.succes === true) {
      dispatch(registerStripeThunk(stripeRegisterForm));
      if (error) {
        Alert.alert(error.message);
      } else {
        navigation.navigate('Login');
        dispatch(cleanUpRegister());
      }
    } else {
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

  const [isStripeSkipped, setIsStripeSkipped] = useState<boolean>(false);

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
        return setStep(4);
      case 4:
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
      case 4:
        return setStep(3);
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
    <KeyboardAwareScrollView style={{minHeight: height}}>
      <LoggedOutBackground>
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
                <SelectDropdown
                  data={ccList}
                  onSelect={(
                    selectedItem: {
                      country: string;
                      countryCode: string;
                      currencyCode: string;
                    },
                    index,
                  ) => {
                    setSelectedCountry(selectedItem);
                  }}
                  buttonTextAfterSelection={(
                    selectedItem: {
                      country: string;
                      countryCode: string;
                      currencyCode: string;
                    },
                    index,
                  ) => {
                    return ` ${selectedItem.country}`;
                  }}
                  rowTextForSelection={(item, index) => {
                    return ` ${item.country}`;
                  }}
                  rowStyle={{
                    borderRadius: 10,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  }}
                  buttonStyle={{
                    width: '100%',
                    height: 50,
                    borderRadius: 8,
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    margin: 0,
                    padding: 0,
                  }}
                  searchPlaceHolder={'Country'}
                  dropdownOverlayColor="rgba(0,0,0,0)"
                  renderDropdownIcon={isOpen => (
                    <View style={styles.iconContainer}>
                      <Image
                        style={styles.searchIcon}
                        source={
                          isOpen
                            ? require('../../../assets/utilityIcons/close.png')
                            : require('../../../assets/utilityIcons/find.png')
                        }
                      />
                    </View>
                  )}
                  dropdownIconPosition="left"
                  defaultButtonText="Select country"
                  dropdownStyle={{
                    backgroundColor: 'rgba(100,100,100,0.9)',
                    borderRadius: 15,
                  }}
                  buttonTextStyle={{color: '#fff'}}
                  selectedRowTextStyle={{color: '#fff'}}
                  rowTextStyle={{color: '#fff'}}
                  selectedRowStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
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
            {/* stripe_country
                stripe_account_number
                stripe_currency
                stripe_company_name
                stripe_site_url 
              */}

            {step === 3 && (
              <Subscryptions
                selected={selected}
                setSelected={setSelected}
                setSubName={setSubName}
              />
            )}
            {step === 4 && (
              <>
                <TextInputCustom
                  disabled
                  placeholder="country code ( 2 digits )"
                  onChange={setStripeDetails}
                  name="stripe_country"
                  state={stripeDetails}
                  value={stripeDetails.stripe_country}
                />
                <TextInputCustom
                  disabled
                  placeholder="city"
                  onChange={setStripeDetails}
                  state={stripeDetails}
                  name="city"
                  value={stripeDetails.stripe_currency}
                />
                <TextInputCustom
                  placeholder="state"
                  onChange={setStripeDetails}
                  state={stripeDetails}
                  name="state"
                  value={stripeDetails.stripe_company_name}
                />
                <TextInputCustom
                  placeholder="account number"
                  onChange={setStripeDetails}
                  state={stripeDetails}
                  name="stripe_account_number"
                  value={stripeDetails.stripe_account_number}
                />
                <TextInputCustom
                  placeholder="routing number"
                  onChange={setStripeDetails}
                  state={stripeDetails}
                  name="stripe_routing_number"
                  value={stripeDetails.stripe_routing_number}
                />
                <TextInputCustom
                  placeholder="SSN ( SSN last 4 )"
                  onChange={setStripeDetails}
                  state={stripeDetails}
                  name="ssn_last4"
                  value={stripeDetails.ssn_last4}
                />
                <TickButton
                  selected={isStripeSkipped}
                  setSelected={() => {
                    setIsStripeSkipped(!isStripeSkipped);
                  }}
                  title={`Skip fro now`}
                />
              </>
            )}
            <View style={styles.DumbContainer}>
              {step === 4 && (
                <TouchableOpacity
                  style={styles.LoginButton}
                  onPress={registerFunction}>
                  <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
              )}
              {step !== 4 && (
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
      </LoggedOutBackground>
    </KeyboardAwareScrollView>
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
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    borderRadius: 0,
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    height: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 20,
    margin: -7,
    left: 0,
  },
});
