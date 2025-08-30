import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function App() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="메시지를 입력하세요"
        value={message}
        onChangeText={setMessage}
      />

      <Button
        title="확인"
        color="#999"
        onPress={() => {
          setIsLoading(true);
          setResult('');
          setTimeout(() => {
            setIsLoading(false);
            setResult('⚠️ 피싱일 가능성이 높습니다');
          }, 3000);
        }}
      />

      {isLoading && (
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <LottieView
            source={require('./components/gradient_loader_01.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
          <Text style={styles.loadingText}>검사 중입니다...</Text>
        </View>
      )}

      {!isLoading && result !== '' && (
        <Text style={styles.resultText}>{result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: '#01080eff',
    padding: 12,
    fontSize: 16,
    backgroundColor: '#b0b7baff',
    color: '#484a4aff',
    marginTop: 100,
    borderRadius: 17,
    width: '80%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 30,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
