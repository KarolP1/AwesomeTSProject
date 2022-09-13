/**
 * @format
 */
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

const MainComponent = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => MainComponent);
