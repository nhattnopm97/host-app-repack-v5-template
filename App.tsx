import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

// import {checkVersion} from 'react-native-check-version';
import {useEffect, useState} from 'react';
import MiniAppContainer from './src/navigation';

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
      <NavigationContainer>
        <MiniAppContainer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
