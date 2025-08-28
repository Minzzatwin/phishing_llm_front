// screens/MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Alert } from 'react-native'; // Alert 추가
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // 아이콘 표시 위한 라이브러리

const MainScreen = ({ navigation }) => {
  const [isDetecting, setIsDetecting] = useState(true); // 탐지 토글 상태
  const [recentCount, setRecentCount] = useState(null); // 최근 피싱 메시지 개수
  const [lastTime, setLastTime] = useState(''); // 최근 탐지 시간
  const [loading, setLoading] = useState(true); // 로딩 여부

  // 날짜/시간 포맷팅 함수 (예시)
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '정보 없음';
    const date = new Date(dateTimeString.replace(' ', 'T')); // ISO 8601 형식으로 변환
    if (isNaN(date.getTime())) return dateTimeString; // 유효하지 않은 날짜면 원본 반환

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}시 ${formattedMinutes}분`;
  };

  // 백엔드에서 탐지 상태 가져오기 (하드코딩 데이터 사용)
  useEffect(() => {
    const fetchDetectStatus = async () => {
      setLoading(true); // 로딩 시작
      try {
        // 백엔드 API 호출 대신 하드코딩된 데이터 사용
        const data = { active: true }; // 예시: 항상 탐지 중으로 시작
        setIsDetecting(data.active);
      } catch (error) {
        console.error('탐지 상태 불러오기 실패:', error);
        Alert.alert('오류', '탐지 상태를 불러오는 데 실패했습니다.'); // 사용자에게 알림
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchDetectStatus();
  }, []);

  // 백엔드에 탐지 상태 저장하는 함수 (하드코딩 데이터 사용)
  const toggleDetection = async () => {
    const newStatus = !isDetecting;
    setIsDetecting(newStatus); // 로컬 상태 먼저 반영

    try {
      // 백엔드 API 호출 대신 성공/실패 시뮬레이션
      // 실제 앱에서는 여기에 fetch('http://<BACKEND_URL>/api/set-detect-status', ...) 코드가 들어갑니다.
      // await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션
      // if (Math.random() < 0.2) throw new Error('서버 응답 실패 시뮬레이션'); // 20% 확률로 실패 시뮬레이션

      Alert.alert('알림', `탐지 기능이 ${newStatus ? '활성화' : '비활성화'}되었습니다.`);
    } catch (error) {
      console.error('탐지 상태 전송 실패:', error);
      Alert.alert('오류', '탐지 상태 변경에 실패했습니다. 다시 시도해주세요.'); // 사용자에게 알림
      setIsDetecting(!newStatus); // 실패 시 다시 되돌림
    }
  };

  // API 호출 -> 최근 탐지 정보(개수, 시간) 불러오기 (하드코딩 데이터 사용)
  useEffect(() => {
    const fetchDetectionData = async () => {
      setLoading(true); // 로딩 시작
      try {
        // 백엔드 API 호출 대신 하드코딩된 데이터 사용
        // 예시 1: 피싱 메시지가 없는 경우
        // const data = { count: 0, time: "2025-07-29 10:30" };
        // 예시 2: 피싱 메시지가 있는 경우
        const data = { count: 3, time: "2025-07-29 15:45" };

        setRecentCount(data.count);
        setLastTime(formatDateTime(data.time)); // 포맷팅 함수 적용
      } catch (error) {
        console.error('탐지 정보 불러오기 실패:', error);
        Alert.alert('오류', '최근 탐지 정보를 불러오는 데 실패했습니다.'); // 사용자에게 알림
        setRecentCount(null); // 에러 시 null로 설정하여 "정보 없음" 또는 로딩 상태 유지
        setLastTime('정보 없음');
      } finally {
        setLoading(false); // 로딩 끝났다고 loading 상태 변경
      }
    };

    fetchDetectionData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎣 낚시 금지구역</Text>
      {/* 앱 이름 (우선 낚시금지구역으로 해 놓음) */}

      <View style={styles.statusBox}>
        <MaterialIcons
          name={isDetecting ? 'security' : 'security-update-warning'}
          size={26}
          color={isDetecting ? 'green' : 'red'}
        />
        <Text style={styles.statusText}>
          {isDetecting ? '탐지 중' : '중지됨'} {/* 아이콘, 탐지 상태 표시 */}
        </Text>
        {/* 탐지 on/off 토글 기능 */}
        <Switch
          value={isDetecting}
          onValueChange={toggleDetection}
          trackColor={{ false: "#767577", true: "#81b0ff" }} // 스위치 색상 추가
          thumbColor={isDetecting ? "#f5dd4b" : "#f4f3f4"} // 스위치 핸들 색상 추가
        />
      </View>

      {/* 최근 로그 요약 */}
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogScreen')}>
        <FontAwesome5 name="clipboard-list" size={18} color="#fff" />
        <Text style={styles.buttonText}>탐지 로그</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DetectScreen')}>
        <FontAwesome5 name="search" size={18} color="#fff" />
        <Text style={styles.buttonText}>피싱 판별</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CommunityScreen')}>
        <FontAwesome5 name="comments" size={18} color="#fff" />
        <Text style={styles.buttonText}>커뮤니티</Text>
      </TouchableOpacity>

      {/* 도움말 */}
      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>도움말</Text>
        <Text style={styles.helpText}>
          실시간 탐지를 켜면 백그라운드에서 메시지를 분석해 피싱 여부를 판단합니다. 기록은 로그 페이지에서 확인, 판별 페이지에서 메시지 직접 입력해 판별 가능
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
    height: 80,
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
    shadowColor: '#000', // 그림자 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    justifyContent: 'center', // 텍스트 중앙 정렬
    shadowColor: '#000', // 그림자 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  logTextSafe: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  logTime: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center', // 텍스트 중앙 정렬
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
    shadowColor: '#000', // 그림자 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold', // 버튼 텍스트 굵게
  },
  helpBox: {
    backgroundColor: '#ecf9ff',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
    borderWidth: 1, // 테두리 추가
    borderColor: '#aaddff', // 테두리 색상
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
    lineHeight: 20, // 줄 간격 추가
  },
});