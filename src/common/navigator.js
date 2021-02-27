import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "../screens/Search";
import Welcome from "../screens/Welcome";
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
export default function BottomNavigator() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Welcome" component={Welcome} />
          <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

