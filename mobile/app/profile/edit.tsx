import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function EditProfileScreen() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  
  // Mockup data - would come from user context
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
      {/* Header */}
      <RNView style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={16} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Editar Perfil</Text>
        <RNView style={{ width: 40 }} />
      </RNView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <RNView style={styles.avatarSection}>
          <RNView style={[styles.avatarContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <FontAwesome name="user" size={48} color={colors.textSecondary} />
          </RNView>
          <TouchableOpacity style={[styles.changePhotoButton, { backgroundColor: Colors.primary }]}>
            <FontAwesome name="camera" size={14} color="#fff" />
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </TouchableOpacity>
        </RNView>

        {/* Form Fields */}
        <RNView style={styles.formContainer}>
          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME COMPLETO</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor={colors.textSecondary}
            />
          </RNView>

          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>E-MAIL</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
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
              style={[styles.textInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
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
              style={[styles.textInput, styles.bioInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Fale sobre você..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </RNView>
        </RNView>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: Colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={[styles.deleteButtonText, { color: Colors.error }]}>Excluir conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  changePhotoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    gap: 20,
    marginBottom: 32,
  },
  fieldContainer: {},
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  bioInput: {
    minHeight: 100,
    paddingTop: 14,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
