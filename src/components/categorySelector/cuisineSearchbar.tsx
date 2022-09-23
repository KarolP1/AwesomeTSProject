import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {default as cuisines} from '../../static/cuisines.json';
import CuisinePage from './CuisinePage';

const CuisineSearchbar = ({
  cuisine,
  setCuisine,
}: {
  cuisine: string | null;
  setCuisine: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <View style={{maxHeight: 200}}>
      <View style={[styles.container, {position: 'relative'}]}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setIsMenuOpen(!isMenuOpen);
          }}>
          <Image
            style={styles.searchIcon}
            source={require('../../assets/utilityIcons/find.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={cuisine || ''}
          selectTextOnFocus
          onChangeText={setCuisine}
          onFocus={() => {
            setCuisine('');
            setIsMenuOpen(true);
          }}
        />
      </View>
      {isMenuOpen && (
        <CuisinePage
          cuisine={cuisine}
          setCuisine={setCuisine}
          setIsCuisinesVisible={() => setIsMenuOpen(false)}
        />
      )}
    </View>
  );
};

export default CuisineSearchbar;

const styles = StyleSheet.create({
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
  },
});
