// CommunityStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Community/HomeScreen';
import DetailScreen from '../screens/Community/DetailScreen';
import WriteScreen from '../screens/Community/WriteScreen';

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '커뮤니티' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: '글 상세' }} 
      />
      <Stack.Screen 
        name="Write" 
        component={WriteScreen} 
        options={{ title: '글 쓰기' }} 
      />
    </Stack.Navigator>
  );
}
