import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  IOrderNavigation,
  IPaymentPageStackProps,
} from '../../../navigation/order/types';
import {ScrollView} from 'react-native-gesture-handler';
import SingleOrderItem from '../../../components/Order/ShoppingCart/SingleOrderItem';
import SubmitButton from '../../../components/touchables/SubmitButton';
import OnOfButton from '../../../components/Order/ShoppingCart/OnOfButton';
import {instance} from '../../../redux/interceptors';
import {useStripe, ApplePayButton} from '@stripe/stripe-react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {deleteShoppingListsByIndex} from '../../../redux/Order/shoppingCart.slice';
import {AddNewOrder} from '../../../redux/Order/Order/UserPlaceOrder.thunk';
import {getMyProfile} from '../../../redux/Profile/core/profileCore.thunk';
import {IGetAddress} from '../../../redux/Profile/types';

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const atoken = useAppSelector(state => state.login.data?.access_token);
  const addressFromDb = useAppSelector(state => state.profile.data?.address);
  const {params} = useRoute<IPaymentPageStackProps>();
  const orderItems = params.items;
  const orderWhere = params.orderWhere;
  const navigation = useNavigation<IOrderNavigation>();
  let currency = '';

  const orderitemsids = orderItems.map(item => item.index);
  const totalCosts = orderItems.reduce((accumulator, currentValue) => {
    currency = currentValue.item.currency;
    return accumulator + parseFloat(currentValue.item.price);
  }, 0);
  const [isSplitCosts, setIsSplitCosts] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<IGetAddress | null>(
    null,
  );

  useEffect(() => {
    if (addressFromDb) {
      const firstofTheList = addressFromDb[0];
      setSelectedAddress(firstofTheList);
    }
  }, []);

  //#region
  const {
    initPaymentSheet,
    presentPaymentSheet,
    isApplePaySupported,
    presentApplePay,
  } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await instance.post(
      `/order/payment/payment-sheet`,
      {totalCosts: totalCosts, currency: 'usd'},
      {
        headers: {Authorization: 'Bearer ' + atoken},
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.data;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: false,
    });

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    // see belocw
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      if (selectedAddress)
        dispatch(
          AddNewOrder({
            orderItems: orderItems,
            orderWhere,
            address: selectedAddress,
          }),
        );
      dispatch(deleteShoppingListsByIndex(orderitemsids));
      navigation.goBack();
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const pay = async () => {
    if (!isApplePaySupported) return;
    // ...
    const {error} = await presentApplePay({
      cartItems: orderItems.map(item => {
        return {
          label: ` ${item.item.dishName}`,
          amount: totalCosts.toFixed(2),
          paymentType: 'Immediate',
        };
      }),
      country: 'US',
      currency: 'GBP',
    });
    if (error) {
      // handle error
    }
    // ...
  };

  //#endregion

  return (
    <LoggedInBackground>
      <Text style={[TextStyles.defaultText]}>Your products:</Text>
      <ScrollView style={{width: '100%'}}>
        {orderItems.map((item, index) => {
          return <SingleOrderItem index={index} item={item} key={item.index} />;
        })}
        <SubmitButton
          onPress={() => {
            navigation.navigate('shoppingCart');
          }}
          title={'Edit Order'}
          style={{paddingVertical: 8, marginTop: 10}}
        />
        <View
          style={{
            alignSelf: 'flex-end',
            marginVertical: 20,
            marginHorizontal: 30,
          }}>
          <Text style={[TextStyles.defaultText, {fontSize: 16}]}>
            Total cost: {currency} {totalCosts.toFixed(2)}
          </Text>
          <Text style={[TextStyles.defaultText, {fontSize: 16}]}>
            Tax included: {currency} {(totalCosts * 0.23).toFixed(2)}
          </Text>
        </View>
        {addressFromDb &&
          addressFromDb.map(singleAddress => (
            <TouchableOpacity
              style={{
                marginVertical: 2,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor:
                  selectedAddress?._id === singleAddress._id
                    ? '#00000015'
                    : '#ffffff15',
                borderRadius: 5,
              }}
              key={singleAddress._id}
              onPress={() => {
                setSelectedAddress(singleAddress);
              }}>
              <Text style={{color: '#fff'}}>
                {singleAddress.city} {singleAddress.street}{' '}
                {singleAddress.buildingnumber}
              </Text>
            </TouchableOpacity>
          ))}
        <View style={{flexDirection: 'row', padding: 30}}>
          <OnOfButton
            isOpen={isSplitCosts}
            onPress={() => {
              if (isSplitCosts) {
                setIsSplitCosts(!isSplitCosts);
              } else {
                setIsSplitCosts(isSplitCosts);
              }
            }}>
            <Image
              style={{width: '100%', height: '100%', aspectRatio: 1}}
              source={require('../../../assets/utilityIcons/payment.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontFamily: 'Handlee-Regular',
                marginTop: 10,
              }}>
              Pay now
            </Text>
          </OnOfButton>
          <OnOfButton
            isOpen={!isSplitCosts}
            onPress={() => {
              if (!isSplitCosts) {
                setIsSplitCosts(!isSplitCosts);
              } else {
                setIsSplitCosts(!isSplitCosts);
              }
            }}>
            <Image
              style={{width: '100%', height: '100%', aspectRatio: 1}}
              source={require('../../../assets/utilityIcons/payTogether.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontFamily: 'Handlee-Regular',
                marginTop: 10,
              }}>
              Split costs
            </Text>
          </OnOfButton>
        </View>
        {!isSplitCosts && (
          <>
            {isApplePaySupported && (
              <ApplePayButton
                onPress={pay}
                type="plain"
                buttonStyle="black"
                borderRadius={4}
                style={{
                  width: '100%',
                  height: 50,
                }}
              />
            )}
            <SubmitButton
              onPress={openPaymentSheet}
              title={'Pay with card'}
              style={{width: '100%', alignItems: 'center', marginTop: 10}}
            />
          </>
        )}
        {isSplitCosts && <></>}
      </ScrollView>
    </LoggedInBackground>
  );
};

export default PaymentPage;

export const TextStyles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Handlee-Regular',
    color: '#fff',
    fontSize: 18,
  },
});
