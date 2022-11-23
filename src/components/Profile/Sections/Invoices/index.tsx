import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import OnOfButton from './OnOfButton';
import Purchases from './Purchases';
import Sales from './Sales';
import Recipes from './Recipes';

type Props = {isEstablishment: boolean};

const InvoicesSection = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const {width} = useWindowDimensions();

  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      style={{flex: 1, width: width - 20}}
      contentContainerStyle={{width: width - 20}}>
      <View style={{flex: 1, marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {props.isEstablishment ? (
            <>
              <OnOfButton
                id={0}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Purchases'}
              />
              <OnOfButton
                id={1}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Sales'}
              />
              <OnOfButton
                id={2}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Recipes'}
              />
            </>
          ) : (
            <>
              <OnOfButton
                id={0}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Purchases'}
              />

              <OnOfButton
                id={2}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Recipes'}
              />
            </>
          )}
        </View>
        {renderSection(selectedOption)}
      </View>
    </ScrollView>
  );
};

export default InvoicesSection;

const styles = StyleSheet.create({
  onOfButton: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
  },
});

function renderSection(selectedOption: number): React.ReactNode {
  switch (selectedOption) {
    case 0:
      return <Purchases selected={selectedOption} />;
    case 1:
      return <Sales />;
    case 2:
      return <Recipes />;

    default:
      break;
  }
}
