// screens/CommunityScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostProvider } from './Community/PostContext';

import HomeScreen from './Community/HomeScreen';
import DetailScreen from './Community/DetailScreen';
import WriteScreen from './Community/WriteScreen';

const Stack = createNativeStackNavigator();

export default function CommunityScreen() {
  return (
    <PostProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: '글 상세' }} />
        <Stack.Screen name="Write" component={WriteScreen} options={{ title: '글 쓰기' }} />
      </Stack.Navigator>
    </PostProvider>
  );
}
