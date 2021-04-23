import * as React from 'react';
import { View, Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Dashboard from '../screens/Dashboard'
import Donate from '../screens/Donate'
import GetLocation from '../screens/GetLocation'
import DonorsDetails from '../screens/DonorsDetails'
import { useGlobalState } from '../context/GlobalContext'
const Stack = createStackNavigator();

function Navigation() {
  const use = useGlobalState()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          use.loginStatus === true ?
            <>
              <Stack.Screen name="Dashboard" component={Dashboard}
                options={{
                  headerTintColor: "#dc143c",
                  title: "BloodApp"
                }} />
              <Stack.Screen name="Donate" component={Donate} options={{ headerTintColor: "#dc143c", headerStyle: { backgroundColor: "#fff" } }} />
              <Stack.Screen name="Location" component={GetLocation} options={{ headerTintColor: "#dc143c", headerStyle: { backgroundColor: "#fff" } }} />
              <Stack.Screen name="DonorsDetails" component={DonorsDetails} options={{ headerTintColor: "#dc143c", headerStyle: { backgroundColor: "#fff" } }} />
            </> :
            <>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;