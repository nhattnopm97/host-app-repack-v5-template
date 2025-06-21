import React from 'react';
import {View} from 'react-native';

const MiniAppScreen = React.lazy(() => import('miniApp/CtnMini'));
const MiniApp = () => {
  return (
    <React.Suspense fallback={<View></View>}>
      <MiniAppScreen />
    </React.Suspense>
  );
};
export default MiniApp;
