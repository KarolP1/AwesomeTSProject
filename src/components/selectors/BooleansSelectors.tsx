import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OnOfButton from '../recipes/OnOfButton';

const BooleansSelectors = ({
  setBooleanDataState,
}: {
  setBooleanDataState: (
    isVegan: boolean,
    isHalal: boolean,
    isKosher: boolean,
  ) => void;
}) => {
  const initialdata = [
    {name: 'isKosher', value: false},
    {name: 'isHalal', value: false},
    {name: 'isVegan', value: false},
  ];
  const [booleanData, setBooleanData] = useState(initialdata);
  useEffect(() => {
    setBooleanDataState(
      booleanData[0].value,
      booleanData[1].value,
      booleanData[2].value,
    );
  }, [booleanData]);
  return (
    <View style={{flexDirection: 'row'}}>
      {booleanData.map(item => (
        <OnOfButton
          key={item.name}
          isOpen={item.value}
          name={item.name}
          setIsOpen={() => {
            const newData = booleanData.map(data =>
              data.name !== item.name ? data : {...item, value: !item.value},
            );
            setBooleanData(newData);
          }}
        />
      ))}
    </View>
  );
};

export default BooleansSelectors;

const styles = StyleSheet.create({});
