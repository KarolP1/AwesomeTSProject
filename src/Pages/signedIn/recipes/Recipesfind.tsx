import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import RecipesLists from '../../../components/recipes/recipesLists';
import {FindScreenProps} from '../../../navigation/types';
import {useAppSelector} from '../../../redux/hooks';

const RecipesFind = ({route}: FindScreenProps) => {
  const recFromRoute = useAppSelector(state => state.recipesByTag.data);
  const tag = route.params?.recipesTag;
  if (tag === undefined) {
    console.log('first');
  }

  return (
    <LoggedInBackground>
      <Text>search</Text>
      <Text>choose</Text>
      {tag && (
        <View style={{height: '80%'}}>
          <RecipesLists />
        </View>
      )}

      <View style={{height: '80%'}}>
        <RecipesLists />
      </View>
    </LoggedInBackground>
  );
};

export default RecipesFind;
