import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

// import {checkVersion} from 'react-native-check-version';
import {useEffect, useState} from 'react';
import MiniAppContainer from './navigation';
import React from 'react';
import {View} from 'react-native';

const MiniAppScreen = React.lazy(() => import('miniApp/CtnMini'));
function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // checkVersionApp();
  }, []);

  // const checkVersionApp = async () => {
  //   try {
  //     const version = await checkVersion();
  //     if (version.needsUpdate) {
  //       console.log(`App has a ${version.updateType} update pending.`);
  //       setVisible(true);
  //     } else {
  //       console.log('App is up to date.');
  //       setVisible(false);
  //     }
  //   } catch (error) {}
  // };
  return (
    <SafeAreaProvider>
      <React.Suspense fallback={<View></View>}>
        <MiniAppScreen />
      </React.Suspense>
    </SafeAreaProvider>
  );
}

export default App;
