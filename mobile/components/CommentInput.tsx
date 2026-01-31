import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, View as RNView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';

interface CommentInputProps {
  onSend: (content: string) => Promise<void>;
}

export function CommentInput({ onSend }: CommentInputProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = async () => {
    if (!content.trim()) return;
    
    setSending(true);
    try {
      await onSend(content);
      setContent('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error sending comment:', error);
    } finally {
      setSending(false);
    }
  };

  // When keyboard is visible, don't add safe area padding (keyboard already handles it)
  const bottomPadding = keyboardVisible ? 12 : insets.bottom + 12;

  return (
    <RNView style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border, paddingBottom: bottomPadding }]}>
      <TextInput
        style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
        placeholder="Escreva um comentário..."
        placeholderTextColor={colors.textSecondary}
        value={content}
        onChangeText={setContent}
        multiline
        maxLength={500}
      />
      <TouchableOpacity 
        style={[styles.sendButton, { backgroundColor: content.trim() ? Colors.primary : colors.border }]}
        onPress={handleSend}
        disabled={!content.trim() || sending}
      >
        {sending ? (
           <ActivityIndicator size="small" color="#FFF" />
        ) : (
           <FontAwesome name="send" size={16} color="#FFF" />
        )}
      </TouchableOpacity>
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    marginRight: 12,
    marginBottom: 0, // Align with button
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
});
