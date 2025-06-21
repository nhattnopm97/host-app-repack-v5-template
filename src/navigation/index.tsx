import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MiniApp from '../screen/mini-app';

const Stack = createNativeStackNavigator();
const MiniAppContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MiniApp"
        component={MiniApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MiniAppContainer;
