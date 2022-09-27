/**
 * @format
 */
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {AppRegistry, LogBox} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const MainComponent = () => {
  SystemNavigationBar.setNavigationColor('transparent');
  SystemNavigationBar.stickyImmersive();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => MainComponent);
