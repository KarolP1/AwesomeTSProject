import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  IOrderNavigation,
  IPaymentPageStackProps,
} from '../../../navigation/order/types';
import {ScrollView} from 'react-native-gesture-handler';
import SingleOrderItem from '../../../components/Order/ShoppingCart/SingleOrderItem';
import SubmitButton from '../../../components/touchables/SubmitButton';
import OnOfButton from '../../../components/Order/ShoppingCart/OnOfButton';

const PaymentPage = () => {
  const {params} = useRoute<IPaymentPageStackProps>();
  const orderItems = params.items;
  const navigation = useNavigation<IOrderNavigation>();
  let currency = '';

  const totalCosts = orderItems.reduce((accumulator, currentValue) => {
    currency = currentValue.item.currency;
    return accumulator + parseFloat(currentValue.item.price);
  }, 0);
  const [isSplitCosts, setIsSplitCosts] = useState<boolean>(false);

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
        <View style={{flexDirection: 'row', padding: 30}}>
          <OnOfButton
            isOpen={isSplitCosts}
            onPress={() => {
              console.log(isSplitCosts);
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
              console.log(isSplitCosts);
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
        <SubmitButton onPress={async () => {}} title={'checkout'} />
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
