import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const SingleSub = ({
  sub,
  selected,
  setSelected,
  setSubName,
}: {
  sub: {
    id: number;
    name: string;
    icon: string;
    pricing: string;
    options: string[];
  };
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  setSubName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const isSelectedComparer = selected === sub.id;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setSelected(sub.id);
        setSubName(sub.name);
      }}
      style={[
        styles.container,
        {
          backgroundColor: isSelectedComparer
            ? 'rgba(0,0,0,.25)'
            : 'rgba(0,0,0,.05)',
        },
      ]}>
      <Text style={styles.title}>{sub.name}</Text>
      <View style={styles.pricing}>
        <Text>Pricing:</Text>
        <Text style={styles.price}>{sub.pricing}</Text>
      </View>

      <ScrollView style={styles.options}>
        {sub.options.map(element => (
          <Text key={`${element + sub.id}`}>
            <Text style={styles.price}>+</Text> {element}
          </Text>
        ))}
      </ScrollView>
    </TouchableOpacity>
  );
};

export default SingleSub;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '',
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  price: {
    color: '#EA3651',
    textAlign: 'center',
  },
  pricing: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  options: {
    backgroundColor: '',
    flexGrow: 1,
  },
  selectButton: {
    borderRadius: 5,
    paddingVertical: 10,

    paddingHorizontal: 25,
    margin: 10,
    backgroundColor: '#EA3651',
  },
});
