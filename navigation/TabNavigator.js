// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import CommunityStack from './CommunityStack'; 
import DetectScreen from '../screens/DetectScreen';
import LogScreen from '../screens/LogScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ title: '홈' }} 
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityStack} 
        options={{ title: '커뮤니티' }} 
      />
      <Tab.Screen 
        name="Detect" 
        component={DetectScreen} 
        options={{ title: '피싱 판별' }} 
      />
      <Tab.Screen 
        name="Log" 
        component={LogScreen} 
        options={{ title: '탐지 로그' }} 
      />
    </Tab.Navigator>
  );
}
