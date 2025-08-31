// screens/MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; //아이콘 표시 위한 라이브러리(+)

const MainScreen = ({ navigation }) => {
  const [isDetecting, setIsDetecting] = useState(true); //탐지 토글 상태
  const [recentCount, setRecentCount] = useState(null); //최근 피싱 메시지 개수
  const [lastTime, setLastTime] = useState(''); //최근 탐지 시간
  const [loading, setLoading] = useState(true); //로딩 여부

  //API 호출->최근 탐지 정보 불러오기
  useEffect(() => { //앱 첫 실행 시 호출
    const fetchDetectionData = async () => {
      try {
        const response = await fetch('http://<BACKEND_URL>/api/last-detection'); //백엔드 서버에 탐지 정보 요청(이 URL은 나중에 실제 백엔드 IP나 도메인으로 바꿔야 함)
        const data = await response.json(); //응답 JSON에서 탐지 개수(count)랑 마지막 시간(time) 파싱해서 저장

        setRecentCount(data.count); //예시:{"count": 2, "time": "2025-07-22 19:10"}
        setLastTime(data.time);
      } catch (error) {
        console.error('탐지 정보 불러오기 실패:', error); //에러
      } finally {
        setLoading(false); //로딩 끝났다고 loading 상태 변경
      }
    };

    fetchDetectionData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}> {/*ScrollView: 화면이 길어지면 스크롤 가능하게(빼도 될것 같기도..)*/}
      <Text style={styles.title}>🎣 낚시 금지구역</Text> {/*앱 이름(우선 낚시금지구역으로 해 놓음)*/}

      <View style={styles.statusBox}>
        <MaterialIcons
          name={isDetecting ? 'security' : 'security-update-warning'}
          size={26}
          color={isDetecting ? 'green' : 'red'}
        />
        <Text style={styles.statusText}>
          {isDetecting ? '탐지 중' : '중지됨'} {/*아이콘, 탐지 상태 표시*/}
        </Text>
        {/*탐지 on/off 토글 기능(현재 이 상태는 로컬 상태만 변경, 백엔드 반영은 안 됨 → 개선해야됨)*/}
        <Switch 
          value={isDetecting}
          onValueChange={() => setIsDetecting(!isDetecting)}
        />
      </View>

      {/*최근 로그 요약(로딩 중이면 ActivityIndicator 보여주고, 아니면 최근 탐지 로그 요약) */}
      <View style={styles.logBox}>
        {loading ? (
          <ActivityIndicator size="small" color="#3498db" /> 
        ) : (
          <>
            {recentCount !== null && recentCount > 0 ? (
              <Text style={styles.logText}>최근 탐지된 피싱 메시지 {recentCount}건</Text>
            ) : (
              <Text style={styles.logTextSafe}>최근 피싱 메시지 없음</Text>
            )}
            <Text style={styles.logTime}>마지막 탐지 : {lastTime}</Text>
          </>
        )}
      </View>

      {/* 페이지 이동 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Log')}>
        <FontAwesome5 name="clipboard-list" size={18} color="#fff" />
        <Text style={styles.buttonText}>탐지 로그</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detect')}>
        <FontAwesome5 name="search" size={18} color="#fff" />
        <Text style={styles.buttonText}>피싱 판별</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Community')}>
        <FontAwesome5 name="comments" size={18} color="#fff" />
        <Text style={styles.buttonText}>커뮤니티</Text>
      </TouchableOpacity>

      {/* 도움말 */}
      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>도움말</Text>
        <Text style={styles.helpText}>
          실시간 탐지를 켜면 백그라운드에서 메시지를 분석해 피싱 여부를 판단합니다. 기록은 로그 페이지에서 확인, 판별 페이지에서 메세지 직접 입력해 판별 가능
        </Text>
      </View>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    height: 100,
    textAlignVertical: 'bottom',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  logBox: {
    backgroundColor: 'white',
    height: 100,
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
    width: '100%',
  },
  logText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
  },
  logTextSafe: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  logTime: {
    fontSize: 12,
    color: 'gray',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  helpBox: {
    backgroundColor: '#ecf9ff',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#3498db',
  },
  helpText: {
    fontSize: 14,
    color: '#333',
  },
});
