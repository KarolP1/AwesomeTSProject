import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getShoppinglists} from '../../../redux/recipes/shoppingList/getShoppinglists.thunk';
import GetSingleShoppingList from '../../../components/recipes/ShoppingList/GetSingleShoppingList';
import {SwipeListView} from 'react-native-swipe-list-view';
import {RecipesHomePageScreenProp} from '../../../navigation/types';
import {ShoppingListItemGet} from '../../../redux/recipes/types';
import {deleteShoppingListThunk} from '../../../redux/recipes/shoppingList/deleteShoppingList.thunk';

const RecipesShoppinglists = () => {
  const dispatch = useAppDispatch();
  const getShoppingListState = useAppSelector(state => state.shoppingList);

  const [listState, setListState] = useState<ShoppingListItemGet[]>([]);
  useEffect(() => {
    if (getShoppingListState && getShoppingListState.data) {
      console.log({getShoppingListState});
      setListState(getShoppingListState.data);
    }
  }, [getShoppingListState.data]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('landed on page');
      dispatch(getShoppinglists());
    }, []),
  );
  const {height} = useWindowDimensions();
  const navigation = useNavigation<RecipesHomePageScreenProp>();

  return (
    <LoggedInBackground
    //TODO: add adding shopping list functionality
    // stickyButton={() => (
    //   <TouchableOpacity style={{backgroundColor: '#4f4f4f', padding: 4}}>
    //     <Image
    //       style={{width: '100%', height: '100%'}}
    //       source={require('../../../assets/utilityIcons/add.png')}
    //     />
    //   </TouchableOpacity>
    // )}
    >
      <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            maxHeight: height - 200,
          }}
          contentContainerStyle={{
            width: '100%',
          }}
          scrollEnabled={false}>
          <SwipeListView
            style={{width: '100%', flex: 1}}
            disableRightSwipe
            keyExtractor={rowData => {
              return rowData._id.toString();
            }}
            data={listState}
            closeOnScroll
            renderItem={(data, rowMap) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Single ShoppingList Edit', {
                    list: data.item,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <GetSingleShoppingList List={data.item} />
                  <TouchableOpacity
                    onPress={() => {
                      rowMap[data.item._id].closeRow();
                      dispatch(deleteShoppingListThunk(data.item._id));
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  width: 80,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </ScrollView>
      </View>
    </LoggedInBackground>
  );
};

export default RecipesShoppinglists;
