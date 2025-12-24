import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text } from './Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { Post } from '@/src/types';

interface PostCardProps {
  post: Post;
  onPress: () => void;
  showEditIcon?: boolean;
}

export function PostCard({ post, onPress, showEditIcon = false }: PostCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {post.title}
        </Text>
        {post.status === 'ativo' && (
          <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
            <FontAwesome name="check" size={12} color={colors.success} />
          </View>
        )}
      </View>
      
      {showEditIcon && (
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome name="pencil" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  statusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    padding: 8,
    marginLeft: 8,
  },
});
