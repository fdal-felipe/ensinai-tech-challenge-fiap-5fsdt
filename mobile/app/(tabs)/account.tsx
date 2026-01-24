import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import api from '../../src/api/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

export default function AccountScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();
  const [loadingAvatar, setLoadingAvatar] = React.useState(false);

  const handleAvatarUpdate = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setLoadingAvatar(true);
        const asset = result.assets[0];
        const imageUri = asset.base64 
          ? `data:image/jpeg;base64,${asset.base64}` 
          : asset.uri;

        // Update in backend
        await api.put(`/users/${user?.id}`, {
          name: user?.name,
          email: user?.email,
          avatar_url: imageUri,
        });

        // Update in context
        if (user) {
          await updateUser({
            ...user,
            avatar_url: imageUri,
          });
        }
        
        Alert.alert('Sucesso', 'Foto de perfil atualizada!');
      }
    } catch (error) {
      console.log('Error updating avatar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a foto.');
    } finally {
      setLoadingAvatar(false);
    }
  };

  const menuItems = [
    { icon: 'pencil', label: 'Editar conta', onPress: () => router.push('/profile/edit') },
    { icon: 'cog', label: 'Configurações', onPress: () => router.push('/profile/settings') },
    { icon: 'bell', label: 'Notificações', onPress: () => router.push('/profile/notifications') },
    { icon: 'link', label: 'Integrações', onPress: () => router.push('/profile/integrations') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <RNView style={styles.avatarSection}>
          <TouchableOpacity 
            onPress={handleAvatarUpdate}
            disabled={loadingAvatar}
            style={[styles.avatarContainer, { borderColor: colors.border }]}
          >
            {loadingAvatar ? (
               <ActivityIndicator size="small" color={colors.text} />
            ) : user?.avatar_url ? (
               <Image source={{ uri: user.avatar_url }} style={styles.avatarImage} />
            ) : (
               <FontAwesome name="user" size={48} color={colors.textSecondary} />
            )}
            
            <RNView style={[styles.editBadge, { backgroundColor: Colors.primary }]}>
               <FontAwesome name="pencil" size={12} color="#FFF" />
            </RNView>
          </TouchableOpacity>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || 'Usuário'}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email || ''}
          </Text>
        </RNView>

        {/* Menu Options */}
        <RNView style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.menuItem, { borderColor: colors.border, backgroundColor: colors.card }]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <RNView style={styles.menuItemLeft}>
                <FontAwesome name={item.icon as any} size={18} color={colors.textSecondary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>
                  {item.label}
                </Text>
              </RNView>
              <FontAwesome name="chevron-right" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </RNView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'visible',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  menuSection: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: '500',
  },
});
