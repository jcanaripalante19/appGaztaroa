import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calendario">
          <Stack.Screen
            name="Calendario"
            component={Calendario}
            options={{ title: 'Calendario Gaztaroa' }}
          />
          <Stack.Screen
            name="DetalleExcursion"
            component={DetalleExcursion}
            options={{ title: 'Detalle Excursión' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Campobase;