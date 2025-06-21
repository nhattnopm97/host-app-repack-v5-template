/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ScriptManager} from '@callstack/repack/client';
if (!__DEV__) {
  ScriptManager.shared.setStorage(AsyncStorage);
}

AppRegistry.registerComponent(appName, () => App);
