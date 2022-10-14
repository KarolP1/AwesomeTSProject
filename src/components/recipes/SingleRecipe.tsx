import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React from 'react';
import {IRecipe} from '../../redux/recipes/types';
import {convertAdvancement} from './advancement';
import SmallIconBG from '../background/smallIconBG';
import DishesType from './dishesType';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useAppDispatch} from '../../redux/hooks';
import {deleteRecipe} from '../../redux/recipes/recipesThunks';
import {useNavigation} from '@react-navigation/native';
import {
  RootNavigationWithRecipeAndRecipePagesProp,
  RootNavigationWithRecipeProp,
} from '../../navigation/rootNavigation.navigation';

const SingleRecipe = ({
  Recipe,
  isEditModeEnabled,
}: {
  Recipe: IRecipe;
  isEditModeEnabled?: boolean;
}) => {
  const navigation =
    useNavigation<RootNavigationWithRecipeAndRecipePagesProp>();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          zIndex: 100,
          backgroundColor: 'transparent',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        {isEditModeEnabled && (
          <View
            style={{alignSelf: 'flex-end', right: 10, top: 10, zIndex: 100}}>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteRecipe(Recipe._id));
                }}>
                <Image
                  source={require('../../assets/utilityIcons/deleteC.png')}
                  style={{width: 30, height: 30, marginBottom: 5}}
                />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home Page', {
                    recipe: Recipe,
                    // @ts-ignore
                    screen: 'Recipes',
                    params: {
                      screen: 'Recipes Home',
                      params: {
                        screen: 'Edit Recipe',
                        recipe: Recipe,
                      },
                    },
                  });
                }}>
                <Image
                  source={require('../../assets/utilityIcons/editC.png')}
                  style={{width: 30, height: 30, marginBottom: 5}}
                />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
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
              source={require('../../static/icons/Untitled/vegan.png')}
            />
            <Text style={styles.titleIcon}>Vegan</Text>
          </SmallIconBG>
        )}
        {Recipe.isHalal && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/Untitled/halal.png')}
            />
            <Text style={styles.titleIcon}>Halal</Text>
          </SmallIconBG>
        )}
        {Recipe.isKosher && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/Untitled/kosher.png')}
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
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
              }}>
              {Recipe.cuisine.name}
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
    justifyContent: 'center',
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
