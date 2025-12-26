import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

import { Text } from '@/components/Themed';
import { Post } from '../src/types';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';

interface PostCardProps {
  post: Post;
  isProfessor?: boolean;
}

export function PostCard({ post, isProfessor = false }: PostCardProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const handlePress = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {post.title}
        </Text>
      </View>
      
      <FontAwesome name="chevron-right" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
  },
});
