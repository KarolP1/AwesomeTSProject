import {View, Text, Image} from 'react-native';
import React from 'react';
import {IInvoice} from '../../../../redux/Order/Purchases/getMyPurchases.thunk';
import {WEBCONST} from '../../../../constants/webConstants';

type Props = {
  data?: IInvoice[] | undefined;
};

const InvoicesList = (props: Props) => {
  return (
    <View>
      {props.data?.map(invoice => (
        <View key={invoice._id}>
          <Text>
            {new Date(invoice.orderDate).toLocaleDateString()}{' '}
            {new Date(invoice.orderDate).toLocaleTimeString()}
          </Text>
          <Text>
            {new Date(invoice.orderUpdateDate).toLocaleDateString()}{' '}
            {new Date(invoice.orderUpdateDate).toLocaleDateString()}
          </Text>
          <Text>{invoice.orderWhere.name}</Text>
          <Text>
            {`${WEBCONST().APIURL}${
              invoice.orderWhere.owner?.images?.profileImage?.image
            }`}
          </Text>
          <Image
            style={{width: 50, height: 50}}
            source={{
              uri: `${WEBCONST().APIURL}${
                invoice.orderWhere.owner?.images?.profileImage?.path
              }`,
            }}
          />
          {/* <Text>{invoice.}</Text> */}
        </View>
      ))}
      <Text>{JSON.stringify(props.data)}</Text>
    </View>
  );
};

export default InvoicesList;
