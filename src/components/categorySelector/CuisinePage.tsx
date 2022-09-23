import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {default as CuisinesList} from '../../static/cuisines.json';

const CuisinePage = ({
  cuisine,
  setCuisine,
  setIsCuisinesVisible,
}: {
  cuisine: string | null;
  setCuisine: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCuisinesVisible: () => void;
}) => {
  const [array, setArray] = useState(
    CuisinesList.filter(element =>
      element.NameEnglish.includes(cuisine ? cuisine : element.NameEnglish),
    ),
  );
  const filteredCuisines = CuisinesList.filter(element =>
    element.NameEnglish.includes(cuisine ? cuisine : element.NameEnglish),
  );

  useEffect(() => {
    setArray(filteredCuisines);
  }, [cuisine]);

  return (
    <ScrollView
      scrollEnabled={true}
      nestedScrollEnabled={true}
      contentContainerStyle={{
        width: '100%',
        height: 200,
        flex: 1,
        maxHeight: 300,
      }}
      style={{flex: 1}}>
      {array.map(cuisine => (
        <TouchableOpacity
          key={cuisine.CodeURL}
          onPress={() => {
            setCuisine(cuisine.NameEnglish);
            setIsCuisinesVisible();
          }}
          style={{width: '100%'}}>
          <Text>
            {cuisine.NameEnglish} / {cuisine.CodeURL}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CuisinePage;

const styles = StyleSheet.create({});
