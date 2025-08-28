import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useContext } from 'react';
import { PostContext } from '../Community/PostContext';
import styles from '../Community/styles';


function WriteScreen({ navigation }) {
    const {posts, setPosts} = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSave = () => {
    const newPost = {
      id: Date.now(),
      title,
      content
    };
    setPosts([...posts, newPost]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detail}>
        <TextInput
          placeholder="제목"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="내용"
          style={[styles.input, { height: 120 }]}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default WriteScreen;