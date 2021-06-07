import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/App/Home/HomeScreen";
import More from "../screens/App/More/MoreScreen";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const MoreStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
      }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          color = focused ? Colors.primary : Colors.b085;
          if (route.name === "Home") {
            return <MaterialIcons name="home" size={size} color={color} />;
          } else if (route.name === "Search") {
            return <MaterialIcons name="search" size={size} color={color} />;
          } else if (route.name === "More") {
            return <MaterialIcons name="menu" size={size} color={color} />;
          }
          return <MaterialIcons name="dashboard" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="More" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
};

export { Tabs };