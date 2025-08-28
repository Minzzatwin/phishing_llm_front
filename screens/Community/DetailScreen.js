import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { PostContext } from '../Community/PostContext';
import styles from '../Community/styles';

function DetailScreen({ route }) {
  const { post } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={[styles.postContent, { marginTop: 12 }]}>{post.content}</Text>
      </View>
    </SafeAreaView>
  );
}

export default DetailScreen;