import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MenuSquareCartContainer from '../../../components/backgrounds/menuSquareCartContainer';

const HugeMenu = () => {
  return (
    <LoggedInBackground>
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
          marginHorizontal: 30,
          textAlign: 'left',
        }}>
        We <Text style={{color: '#EA3651'}}>fix</Text> you up in a
        <Text style={{color: '#474641'}}> blink</Text> of the eye.
      </Text>
      <View style={styles.main}>
        <View style={styles.rowContainer}>
          <MenuSquareCartContainer
            name="Order"
            image={require('../../../static/icons/Order.png')}
          />
          <MenuSquareCartContainer
            name="Recipes"
            image={require('../../../static/icons/Recipes.png')}
          />
        </View>
        <View style={styles.rowContainer}>
          <MenuSquareCartContainer
            name="Coming soon"
            image={require('../../../static/icons/Comingsoon.png')}
          />
          <MenuSquareCartContainer
            name="Profile"
            image={require('../../../static/icons/Profile.png')}
          />
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default HugeMenu;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rowContainer: {flexDirection: 'row', flex: 1},
});
