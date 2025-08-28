// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/MainScreen';
import LogScreen from './screens/LogScreen';
import DetectScreen from './screens/DetectScreen';
import CommunityScreen from './screens/CommunityScreen';

//Stack Navigator 생성
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/*
        Stack.Navigator는 스택 기반의 내비게이션 정의
        새로운 화면이 스택 위에 쌓이고, 뒤로 가기 버튼을 누르면 스택에서 제거됨
      */}
      <Stack.Navigator initialRouteName="MainScreen">
        {/*
          Stack.Screen은 내비게이션 스택에 등록할 각 화면을 정의
          'name'은 화면의 고유한 이름이고, 'component'는 해당 화면에 렌더링될 컴포넌트
        */}
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          // 메인 화면에서는 상단 내비게이션 헤더를 숨김
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogScreen"
          component={LogScreen}
          // '탐지 로그' 화면의 상단 헤더 제목을 설정
          options={{ title: '탐지 로그' }}
        />
        <Stack.Screen
          name="DetectScreen"
          component={DetectScreen}
          // '피싱 판별' 화면의 상단 헤더 제목을 설정
          options={{ title: '피싱 판별' }}
        />
        <Stack.Screen
          name="CommunityScreen"
          component={CommunityScreen}
          // '커뮤니티' 화면의 상단 헤더 제목을 설정
          options={{ title: '커뮤니티' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;