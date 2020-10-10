import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import store from './redux/Index'

import Home from './screens/Home/HomeScreen'
import Play from './screens/Play/Play'
import Finish from './screens/Finish/FinishScreen'

export default function Router() {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          cardStyle: { backgroundColor: '#fff' }
        }}>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="Finish" component={Finish} />
          <Stack.Screen options={{ headerShown: false }} name="Play" component={Play} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
