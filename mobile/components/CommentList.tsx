import React, { useState } from 'react';
import { StyleSheet, View as RNView, Image, ActivityIndicator, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';
import { useAuth } from '../src/contexts/AuthContext';

interface Comment {
  id: number;
  content: string;
  author_name: string;
  author_avatar?: string;
  created_at: string;
  updated_at?: string;
  author_id: number;
}

interface CommentListProps {
  comments: Comment[];
  loading?: boolean;
  onDelete?: (id: number) => Promise<void>;
  onUpdate?: (id: number, content: string) => Promise<void>;
}

export function CommentList({ comments, loading, onDelete, onUpdate }: CommentListProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const { user } = useAuth();
  
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editContent, setEditContent] = useState('');
  const [processing, setProcessing] = useState(false);

  // Helper to check permissions
  const canEdit = (comment: Comment) => user?.id === comment.author_id;
  const canDelete = (comment: Comment) => user?.id === comment.author_id || user?.role === 'professor';

  const handleDelete = (comment: Comment) => {
    Alert.alert(
      'Excluir comentário',
      'Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            if (onDelete) await onDelete(comment.id);
          }
        }
      ]
    );
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingComment(comment);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editingComment || !onUpdate || !editContent.trim()) return;
    
    setProcessing(true);
    try {
      await onUpdate(editingComment.id, editContent);
      setEditingComment(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o comentário');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <RNView style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.text} />
      </RNView>
    );
  }

  if (comments.length === 0) {
    return (
      <RNView style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Seja o primeiro a comentar!
        </Text>
      </RNView>
    );
  }

  const renderItem = ({ item }: { item: Comment }) => (
    <RNView style={[styles.commentItem, { borderBottomColor: colors.border }]}>
      {/* Avatar */}
      <RNView style={[styles.avatarContainer, { borderColor: colors.border }]}>
        {item.author_avatar ? (
          <Image source={{ uri: item.author_avatar }} style={styles.avatar} />
        ) : (
          <FontAwesome name="user" size={20} color={colors.textSecondary} />
        )}
      </RNView>
      
      {/* Content */}
      <RNView style={styles.contentContainer}>
        <RNView style={styles.headerRow}>
           <Text style={[styles.authorName, { color: colors.text }]}>
             {item.author_name}
           </Text>
           <Text style={[styles.date, { color: colors.textSecondary }]}>
             {item.updated_at 
               ? `${new Date(item.updated_at).toLocaleDateString()} às ${new Date(item.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (editado)`
               : `${new Date(item.created_at).toLocaleDateString()} às ${new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
             }
           </Text>
        </RNView>
        
        <Text style={[styles.commentContent, { color: colors.text }]}>
          {item.content}
        </Text>

        {/* Actions */}
        <RNView style={styles.actionsRow}>
           {canEdit(item) && (
             <TouchableOpacity onPress={() => handleStartEdit(item)} style={styles.actionButton}>
               <Text style={{ fontSize: 13, color: Colors.primary }}>Editar</Text>
             </TouchableOpacity>
           )}
           {canDelete(item) && (
             <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionButton}>
               <Text style={{ fontSize: 13, color: Colors.error }}>Excluir</Text>
             </TouchableOpacity>
           )}
        </RNView>
      </RNView>
    </RNView>
  );

  return (
    <RNView style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Comentários</Text>
      {comments.map((item) => (
        <React.Fragment key={item.id}>
            {renderItem({ item })}
        </React.Fragment>
      ))}

      {/* Edit Modal */}
      <Modal
        visible={!!editingComment}
        transparent
        animationType="fade"
        onRequestClose={() => setEditingComment(null)}
      >
        <RNView style={styles.modalOverlay}>
           <RNView style={[styles.modalContent, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Editar Comentário</Text>
              <TextInput 
                style={[styles.modalInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                value={editContent}
                onChangeText={setEditContent}
                multiline
                autoFocus
              />
              <RNView style={styles.modalActions}>
                  <TouchableOpacity 
                    onPress={() => setEditingComment(null)}
                    style={[styles.modalButton, { backgroundColor: colors.border }]}
                  >
                    <Text style={{ color: colors.text }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleSaveEdit}
                    style={[styles.modalButton, { backgroundColor: Colors.primary }]}
                    disabled={processing}
                  >
                     {processing ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={{ color: '#FFF' }}>Salvar</Text>}
                  </TouchableOpacity>
              </RNView>
           </RNView>
        </RNView>
      </Modal>
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 24,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 15,
  },
  commentContent: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
