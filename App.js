import {ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import Create from './screen/main/Create';
import Blog from './screen/main/Blog';
import Home from './screen/main/Home';
import Login from './screen/auth/Login';
import Register from './screen/authentication/Register';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const onAuth = user => {
    if (user) setLoggedIn(true);
    else setLoggedIn(false);
    if (loading) setLoading(false);
  };
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuth);
    return subscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator size={32} color="gray" />;
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Blog" component={Blog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
