import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Image, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { postsService } from '../api/postsService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface ReactionButtonProps {
  postId: number;
}

const REACTION_Types = [
  { id: 'like', icon: 'thumbs-up', label: 'Curtir', color: '#3b5998' },
  { id: 'love', icon: 'heart', label: 'Amei', color: '#e25555' },
  { id: 'wow', icon: 'star', label: 'Uau', color: '#e6bd00' },
  { id: 'dislike', icon: 'thumbs-down', label: 'Não Curti', color: '#7f8c8d' },
];

export function ReactionButton({ postId }: ReactionButtonProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  const [currentType, setCurrentType] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [latestReactions, setLatestReactions] = useState<any[]>([]);
  const [allReactions, setAllReactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  const fetchReactions = async () => {
    try {
      const data = await postsService.getReactions(postId);
      if (data) {
        setCurrentType(data.type);
        setCount(data.count);
        setLatestReactions(data.latest_reactions || []);
      }
    } catch (error) {
      console.log('Error fetching reactions in button:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const openReactionList = async () => {
      setModalVisible(true);
      setLoadingList(true);
      try {
          const list = await postsService.getAllReactions(postId);
          setAllReactions(list);
      } catch (error) {
          console.log('Error fetching all reactions:', error);
      } finally {
          setLoadingList(false);
      }
  };

  const handlePress = async (type: string) => {
    if (loading) return;

    const previousType = currentType;
    const previousCount = count;
    
    let newCount = count;
    let newType: string | null = type;

    if (currentType === type) {
        newType = null;
        newCount = Math.max(0, count - 1);
    } else {
        if (currentType === null) {
            newCount = count + 1;
        } else {
            newCount = count;
        }
    }

    setCurrentType(newType);
    setCount(newCount);

    try {
      const data = await postsService.toggleReaction(postId, type);
      if (data) {
        setCurrentType(data.type);
        setCount(data.count);
        fetchReactions(); 
      } else {
        setCurrentType(previousType);
        setCount(previousCount);
      }
    } catch (error) {
       setCurrentType(previousType);
       setCount(previousCount);
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); 

    if (diff < 60) return 'agora';
    if (diff < 3600) return `${Math.floor(diff / 60)}m atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return `${Math.floor(diff / 86400)}d atrás`;
  };

  const formatTime = (dateString: string) => {
      return dayjs(dateString).format('DD/MM/YYYY [-] HH:mm');
  };

  const getReactionIcon = (type: string) => {
      const reaction = REACTION_Types.find(r => r.id === type);
      return reaction ? { icon: reaction.icon, color: reaction.color } : { icon: 'thumbs-up', color: '#ccc' };
  };

  const renderAvatar = (url: string | null, size: number, style?: any) => {
      if (url) {
          return <Image source={{ uri: url }} style={[styles.avatarImage, { width: size, height: size, borderRadius: size / 2 }, style]} />;
      }
      return (
          <View style={[styles.defaultAvatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#e1e1e1' }, style]}>
              <FontAwesome name="user" size={size * 0.6} color="#888" />
          </View>
      );
  };

  if (initialLoading) {
    return <ActivityIndicator size="small" color={colors.text} />;
  }

  // Summary Text Logic
  let summaryText = '';
  if (latestReactions.length > 0) {
      const firstName = latestReactions[0].name.split(' ')[0];
      const time = getRelativeTime(latestReactions[0].created_at);
      
      if (count === 1) {
          summaryText = `${firstName} reagiu ${time}`;
      } else if (count > 1) {
          summaryText = `${firstName} e mais ${count - 1} reagiram`;
      }
  }

  return (
    <View style={styles.wrapper}>
        <View style={styles.reactionsRow}>
            {REACTION_Types.map((reaction) => {
                const isActive = currentType === reaction.id;
                const iconName = reaction.icon as any; 
                
                return (
                    <TouchableOpacity 
                        key={reaction.id}
                        style={[
                            styles.reactionItem, 
                            isActive && styles.activeReaction,
                        ]}
                        onPress={() => handlePress(reaction.id)}
                        activeOpacity={0.7}
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    >
                        <FontAwesome 
                            name={iconName} 
                            size={40} 
                            color={reaction.color} 
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
        
        {latestReactions.length > 0 && (
            <TouchableOpacity onPress={openReactionList} style={styles.summaryContainer} activeOpacity={0.8}>
                <View style={styles.facepile}>
                    {latestReactions.slice(0, 3).map((r: any, i: number) => (
                        <View key={i} style={[styles.avatarContainer, { zIndex: 3 - i, marginLeft: i > 0 ? -10 : 0 }]}>
                            {renderAvatar(r.avatar_url, 24, { borderWidth: 1.5, borderColor: isDark ? '#000' : '#fff' })}
                        </View>
                    ))}
                </View>
                <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
                    {summaryText}
                </Text>
            </TouchableOpacity>
        )}

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContent, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                                <Text style={[styles.modalTitle, { color: colors.text }]}>Reações</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                    <FontAwesome name="times" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            {loadingList ? (
                                <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 20 }} />
                            ) : (
                                <FlatList
                                    data={allReactions}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        const { icon, color } = getReactionIcon(item.type);
                                        return (
                                            <View style={[styles.userRow, { borderBottomColor: colors.border }]}>
                                                <View style={{ marginRight: 12 }}>
                                                    {renderAvatar(item.avatar_url, 40)}
                                                </View>
                                                <View style={styles.userInfo}>
                                                    <Text style={[styles.userName, { color: colors.text }]}>{item.name}</Text>
                                                    <Text style={[styles.userTime, { color: colors.textSecondary }]}>
                                                        {formatTime(item.created_at)}
                                                    </Text>
                                                </View>
                                                <FontAwesome name={icon as any} size={20} color={color} />
                                            </View>
                                        );
                                    }}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  reactionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 10, 
    flexWrap: 'nowrap', 
  },
  reactionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 60,
    width: 60,
    backgroundColor: 'transparent',
  },
  activeReaction: {
    transform: [{ scale: 1.2 }],
    backgroundColor: 'transparent',
  },
  summaryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      backgroundColor: 'transparent', 
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
  },
  facepile: {
      flexDirection: 'row',
      marginRight: 8,
      width: 50, 
  },
  avatarContainer: {
      marginRight: 0,
  },
  avatarImage: {
      resizeMode: 'cover',
  },
  defaultAvatar: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  summaryText: {
      fontSize: 12,
      fontWeight: '400',
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
  },
  modalContent: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderWidth: 1,
      padding: 20,
      height: '50%',
      width: '100%',
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 15,
      borderBottomWidth: 1,
      marginBottom: 10,
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  closeButton: {
      padding: 5,
  },
  userRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
  },
  userInfo: {
      flex: 1,
  },
  userName: {
      fontSize: 16,
      fontWeight: '500',
  },
  userTime: {
      fontSize: 12,
      marginTop: 2,
  }
});
