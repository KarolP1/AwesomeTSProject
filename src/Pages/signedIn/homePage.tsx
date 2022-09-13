import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {logout} from '../../utils/localStorage';
import {setIsAuth} from '../../redux/rootReducer';
import {useAppDispatch} from '../../redux/hooks';
import {cleanUpLogin} from '../../redux/Auth/loginReducer';

const HomePage = () => {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>HomePage</Text>
      <TouchableOpacity
        onPress={async () => {
          await logout();
          dispatch(cleanUpLogin());
        }}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
