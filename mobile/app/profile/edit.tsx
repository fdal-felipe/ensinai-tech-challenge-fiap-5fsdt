import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function EditProfileScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('Nicholas Gerade');
  const [email, setEmail] = useState('nicholas.gerade@fiap.com.br');
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [bio, setBio] = useState('Estudante de Tecnologia na FIAP');

  const handleSave = () => {
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>Editar Perfil</Text>

        {/* Avatar Section */}
        <RNView style={styles.avatarSection}>
          <RNView style={[styles.avatarContainer, { borderColor: colors.border }]}>
            <FontAwesome name="user" size={40} color={colors.textSecondary} />
          </RNView>
          <TouchableOpacity>
            <Text style={[styles.changePhotoText, { color: Colors.primary }]}>
              Alterar foto
            </Text>
          </TouchableOpacity>
        </RNView>

        {/* Form Fields */}
        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME COMPLETO</Text>
          <TextInput
            style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            placeholderTextColor={colors.textSecondary}
          />
        </RNView>

        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>E-MAIL</Text>
          <TextInput
            style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </RNView>

        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>TELEFONE</Text>
          <TextInput
            style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="(00) 00000-0000"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />
        </RNView>

        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>BIOGRAFIA</Text>
          <TextInput
            style={[styles.textInput, styles.bioInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Fale sobre você..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </RNView>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: Colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changePhotoText: {
    fontSize: 15,
    fontWeight: '500',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 17,
  },
  bioInput: {
    minHeight: 100,
    paddingTop: 14,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
