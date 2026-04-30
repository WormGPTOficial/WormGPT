import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';
import { Colors, Typography, Shadows } from '../theme';
import { conversations } from '../data/mockData';

// ============================================================
// ConversationsScreen — WhatsApp-style chat list
// ============================================================

const ConversationRow = ({ item, onPress }) => {
  const borderColor =
    item.borderType === 'ai'
      ? Colors.gold
      : item.borderType === 'active'
      ? Colors.cyan
      : 'transparent';

  return (
    <TouchableOpacity
      style={[styles.row, { borderRightColor: borderColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.75}
    >
      {/* Avatar area (visually on right in RTL) */}
      <View style={styles.avatarWrap}>
        <LinearGradient
          colors={item.iconBg}
          style={styles.avatarIcon}
        >
          <Text style={styles.avatarEmoji}>{item.icon}</Text>
        </LinearGradient>

        {/* Online dot */}
        <View
          style={[
            styles.onlineDot,
            { backgroundColor: item.online ? Colors.success : Colors.textMuted },
          ]}
        />

        {/* Unread badge */}
        {item.unread > 0 && (
          <LinearGradient
            colors={[Colors.gold, Colors.goldDark]}
            style={styles.unreadBadge}
          >
            <Text style={styles.unreadText}>{item.unread}</Text>
          </LinearGradient>
        )}
      </View>

      {/* Content area */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.timestamp}>{item.time}</Text>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ConversationsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = conversations.filter(
    (c) =>
      search === '' ||
      c.name.includes(search) ||
      c.lastMessage.includes(search)
  );

  return (
    <View style={styles.container}>
      <TopBar title="المحادثات" />

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, searchFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث في المحادثات..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            textAlign="right"
          />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationRow
            item={item}
            onPress={(conv) => navigation.navigate('ChatDetail', { conversation: conv })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  searchWrap: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchBar: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  searchBarFocused: {
    borderColor: Colors.cyan,
  },
  searchIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.sizes.xl,
    color: Colors.text,
    fontFamily: 'Cairo',
    textAlign: 'right',
  },
  list: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  row: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 3,
    ...Shadows.card,
    marginVertical: 4,
  },
  separator: {
    height: 0,
  },
  avatarWrap: {
    position: 'relative',
    marginLeft: 12,
  },
  avatarIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 22,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    left: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.black,
    fontFamily: 'Cairo',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    fontFamily: 'Cairo',
    flex: 1,
    textAlign: 'right',
  },
  timestamp: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    fontFamily: 'Cairo',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: Typography.sizes.lg,
    color: Colors.textSec,
    fontFamily: 'Cairo',
    textAlign: 'right',
  },
});

export default ConversationsScreen;
