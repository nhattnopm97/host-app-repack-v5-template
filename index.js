/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ScriptManager} from '@callstack/repack/client';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
if (!__DEV__) {
  ScriptManager.shared.setStorage(AsyncStorage);
}

AppRegistry.registerComponent(appName, () => App);
