import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {IRecipe} from '../../redux/recipes/types';
import {convertAdvancement} from './advancement';
import SmallIconBG from '../background/smallIconBG';
import DishesType from './dishesType';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const SingleRecipe = ({Recipe}: {Recipe: IRecipe}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <View style={{marginTop: 10, marginLeft: 10}}>
          <SmallIconBG>
            <Text>{Recipe.counter.numberOfLikes}</Text>
          </SmallIconBG>
          <SmallIconBG>
            <Text>{Recipe.counter.numberOfShares}</Text>
          </SmallIconBG>
        </View>
      </View>
      <Text style={styles.title}>{Recipe.title}</Text>
      <View style={styles.smallIconContainer}>
        <SmallIconBG>{convertAdvancement(Recipe.advancement)}</SmallIconBG>
        <SmallIconBG>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/serves.png')}
          />
          <Text style={styles.titleIcon}>{Recipe.serves}</Text>
        </SmallIconBG>
        <SmallIconBG>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/clock.png')}
          />
          <Text style={styles.titleIcon}>
            {Recipe.prepTime} / {Recipe.cookTime}
          </Text>
        </SmallIconBG>
        <SmallIconBG>
          <DishesType dishType={Recipe.dishesType} />
        </SmallIconBG>
      </View>
      <View style={styles.smallIconContainer}>
        {Recipe.isVegan && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/serves.png')}
            />
            <Text style={styles.titleIcon}>Vegan</Text>
          </SmallIconBG>
        )}
        {Recipe.isHalal && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/serves.png')}
            />
            <Text style={styles.titleIcon}>Halal</Text>
          </SmallIconBG>
        )}
        {Recipe.isKosher && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/serves.png')}
            />
            <Text style={styles.titleIcon}>Kosher</Text>
          </SmallIconBG>
        )}
      </View>
      <MaskedView
        style={{flex: 1, flexDirection: 'row', height: '100%', margin: 7}}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
              }}>
              {Recipe.description}
            </Text>
          </View>
        }>
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,266,0)']}
          style={{
            flex: 1,
            height: '100%',
          }}
        />
      </MaskedView>
    </View>
  );
};

export default SingleRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    backgroundColor: 'grey',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: 20,
    height: '30%',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  ContainerSmall: {
    width: 50,

    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  imageIcon: {
    height: '60%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  titleIcon: {fontSize: 8, width: '100%', textAlign: 'center', color: '#fff'},
  smallIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 3,
  },
  descriptionContainer: {
    flex: 1,
    margin: 5,
    textAlign: 'center',
  },
});
