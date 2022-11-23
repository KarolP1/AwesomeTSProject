import {View, Text} from 'react-native';
import React from 'react';
import {IInvoice} from '../../../../redux/Order/Purchases/getMyPurchases.thunk';

type Props = {
  data?: IInvoice[] | undefined;
};

const InvoicesList = (props: Props) => {
  return (
    <View>
      {props.data?.map(invoice => (
        <View key={invoice._id}>
          <Text>{invoice._id}</Text>
          <Text>{new Date(invoice.orderDate).toLocaleDateString()}</Text>
          <Text>{new Date(invoice.orderUpdateDate).toLocaleDateString()}</Text>
          <Text>{invoice.orderWhere.name}</Text>
          {/* <Text>{invoice.}</Text> */}
        </View>
      ))}
      <Text>{JSON.stringify(props.data)}</Text>
    </View>
  );
};

export default InvoicesList;
