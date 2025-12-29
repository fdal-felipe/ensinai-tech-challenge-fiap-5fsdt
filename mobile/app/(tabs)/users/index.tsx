import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../../src/contexts/ThemeContext';

export default function UsersMainScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => router.push('/users/alunos')}
      >
        <FontAwesome name="graduation-cap" size={32} color={colors.text} />
        <Text style={styles.cardText}>Gerenciar Alunos</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => router.push('/users/professores')}
      >
        <FontAwesome name="briefcase" size={32} color={colors.text} />
        <Text style={styles.cardText}>Gerenciar Professores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', gap: 20 },
  card: {
    padding: 30,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
  },
  cardText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});