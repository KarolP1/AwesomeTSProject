import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useRoute} from '@react-navigation/native';
import {IMenuItemAddModalRoute} from '../../../navigation/order/types';
import {WEBCONST} from '../../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {DropShadowStyle} from '../../../components/styles/shadowStyles';
import SubmitButton from '../../../components/touchables/SubmitButton';
import TickButton from '../../../components/buttons/tickButton';
import {IIngredient} from '../../../redux/Profile/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  addNewItemToCart,
  ICartItemItem,
} from '../../../redux/Order/shoppingCart.slice';

const ModalAddMenuItem = () => {
  const route = useRoute<IMenuItemAddModalRoute>();
  const dispatch = useAppDispatch();
  // TODO: add bestsellers to menu items
  const {menuItem, bestSellers, establishmentId} = route.params;
  const [isEditModeForIngredientsVisible, setIsEditModeForIngredientsVisible] =
    useState<boolean>(false);

  const visibilityFilteredIngredients = menuItem.dishIngredients.filter(
    ingredient => {
      if (
        ingredient.isIngredientVisible === true &&
        ingredient.isIngredientEditable === true
      )
        return ingredient;
    },
  );
  const editableFilteredIngredients = menuItem.dishIngredients.filter(
    ingredient => {
      if (ingredient.isIngredientVisible === true) return ingredient;
    },
  );

  const [editableList, setEditableList] = useState<
    | {ingredient: IIngredient; isInUse: boolean; numberOfIngredients: string}[]
    | null
  >(null);

  const {width} = useWindowDimensions();

  const setInitialEdit = () =>
    editableFilteredIngredients.map(list => {
      return {
        ingredient: list,
        isInUse: true,
        numberOfIngredients: list.qtt.toString(),
      };
    });

  useEffect(() => {
    const singleList: {
      ingredient: IIngredient;
      isInUse: boolean;
      numberOfIngredients: string;
    }[] = editableFilteredIngredients.map(list => {
      return {
        ingredient: list,
        isInUse: false,
        numberOfIngredients: list.qtt.toString(),
      };
    });
    setEditableList(singleList);
  }, [menuItem]);

  const {height} = useWindowDimensions();
  return (
    <LoggedInBackground>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          maxHeight: height,
        }}>
        <ScrollView
          horizontal
          scrollEnabled={false}
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{flex: 1, width: '100%'}}>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#ffffff15',
              borderRadius: 15,
              padding: 10,
              alignItems: 'center',
            }}>
            <DropShadow style={[DropShadowStyle.dark, {margin: 20}]}>
              <Image
                style={{height: 100, width: 100, borderRadius: 100}}
                source={{
                  uri: `${WEBCONST().APIURL}${
                    menuItem.image?.path
                  }?${new Date().getTime()}`,
                }}
              />
            </DropShadow>
            <Text style={[styles.textStyle, {fontSize: 18}]}>
              {menuItem.dishName}
            </Text>
            <Text style={[styles.textStyle, {fontSize: 16}]}></Text>
            {isEditModeForIngredientsVisible ? (
              <>
                <Text style={[styles.textStyle, {fontSize: 16}]}>
                  Select what you want to change
                </Text>

                <ScrollView>
                  {editableList?.length !== 0 ? (
                    editableList?.map(
                      ({ingredient, isInUse, numberOfIngredients}, index) => (
                        <View
                          key={ingredient._id}
                          style={{
                            flexDirection: 'row',
                            maxWidth: width - 80,
                          }}>
                          <TickButton
                            isIncremental
                            selected={isInUse}
                            setSelected={() => {
                              const newList = editableList.map(list => {
                                if (list.ingredient._id === ingredient._id) {
                                  return {...list, isInUse: !list.isInUse};
                                } else return list;
                              });
                              setEditableList(newList);
                            }}
                            title={`${numberOfIngredients} ${ingredient.unit} ${ingredient.name}`}
                            incrementValue={numberOfIngredients}
                            incrementLeft={newValue => {
                              const newList = editableList.map(list => {
                                if (list.ingredient._id === ingredient._id) {
                                  const incBy =
                                    parseFloat(numberOfIngredients) >= 10
                                      ? 100
                                      : 1;

                                  if (list.numberOfIngredients === '10') {
                                    return {
                                      ...list,
                                      numberOfIngredients: '100',
                                    };
                                  }
                                  if (
                                    parseFloat(list.numberOfIngredients) +
                                      incBy <
                                    0
                                  )
                                    return {
                                      ...list,
                                      numberOfIngredients: '0',
                                    };
                                  else {
                                    return {
                                      ...list,
                                      numberOfIngredients: newValue
                                        ? newValue
                                        : (
                                            parseFloat(numberOfIngredients) +
                                            incBy
                                          ).toString(),
                                    };
                                  }
                                } else return list;
                              });
                              setEditableList(newList);
                            }}
                            incrementRight={newValue => {
                              const newList = editableList.map(list => {
                                if (list.ingredient._id === ingredient._id) {
                                  const incBy =
                                    parseFloat(numberOfIngredients) > 10
                                      ? 100
                                      : 1;
                                  if (
                                    parseFloat(list.numberOfIngredients) -
                                      incBy <
                                    0
                                  )
                                    return {
                                      ...list,
                                      numberOfIngredients: '0',
                                    };
                                  else {
                                    return {
                                      ...list,
                                      numberOfIngredients: newValue
                                        ? newValue
                                        : (
                                            parseFloat(numberOfIngredients) -
                                            incBy
                                          ).toString(),
                                    };
                                  }
                                } else return list;
                              });
                              setEditableList(newList);
                            }}
                            changeTextValue={(text: string) => {
                              const newList = editableList.map(list => {
                                if (list.ingredient._id === ingredient._id) {
                                  return {
                                    ...list,
                                    numberOfIngredients:
                                      text === '' ? '' : text,
                                  };
                                } else return list;
                              });
                              setEditableList(newList);
                            }}
                          />
                        </View>
                      ),
                    )
                  ) : (
                    <Text style={[styles.textStyle, {fontSize: 18}]}>
                      No visible ingredients there 😞
                    </Text>
                  )}
                </ScrollView>
              </>
            ) : (
              <>
                <ScrollView>
                  {visibilityFilteredIngredients?.length !== 0 ? (
                    visibilityFilteredIngredients?.map((list, index) => (
                      <View key={list._id} style={{maxWidth: width}}>
                        <TickButton
                          displaySquare={false}
                          selected={false}
                          setSelected={() => {}}
                          title={`${list.qtt} ${list.unit} ${list.name}`}
                        />
                      </View>
                    ))
                  ) : (
                    <Text style={[styles.textStyle, {fontSize: 18}]}>
                      No visible ingredients there 😞
                    </Text>
                  )}
                </ScrollView>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <SubmitButton
                style={{backgroundColor: '#969696'}}
                title={
                  isEditModeForIngredientsVisible ? 'cancel' : 'Edit menu item'
                }
                onPress={() => {
                  if (isEditModeForIngredientsVisible) {
                    const list = setInitialEdit();
                    setEditableList(list);
                  }
                  if (visibilityFilteredIngredients.length !== 0) {
                    setIsEditModeForIngredientsVisible(
                      !isEditModeForIngredientsVisible,
                    );
                  } else {
                    Alert.alert(
                      'You cant edit this menu if there is no ingredients',
                    );
                    return false;
                  }
                }}
              />
              <SubmitButton
                title="Add to cart"
                onPress={() => {
                  const changes = editableList
                    ?.filter(change => change.isInUse === true)
                    .map(change => {
                      return {
                        ingredientId: change.ingredient._id,
                        qtt: change.numberOfIngredients,
                      };
                    });
                  const response: {
                    orderWhere: string;
                    orderItems: ICartItemItem;
                  } = {
                    orderItems: {
                      itemId: menuItem._id,
                      changes: changes && changes,
                    },
                    orderWhere: establishmentId,
                  };
                  // console.log(response);
                  dispatch(
                    addNewItemToCart({
                      orderItems: response.orderItems,
                      orderWhere: response.orderWhere,
                    }),
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </LoggedInBackground>
  );
};

export default ModalAddMenuItem;

const styles = StyleSheet.create({
  textStyle: {
    color: '#ffffff',
    textTransform: 'capitalize',
    fontFamily: 'Handlee-Regular',
  },
});
