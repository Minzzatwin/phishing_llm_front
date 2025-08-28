import React, { useContext } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PostContext } from '../Community/PostContext';
import styles from '../Community/styles';

function HomeScreen({ navigation }) { 
  const {posts} = useContext(PostContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.post}
      onPress={() => navigation.navigate('Detail', { post: item })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={2} ellipsizeMode="tail">
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Write')}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;