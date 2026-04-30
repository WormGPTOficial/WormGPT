import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnjazLogo from '../components/AnjazLogo';
import { Colors, Typography } from '../theme';
import { messages } from '../data/mockData';

// ============================================================
// ChatDetailScreen — Group chat with AI suggestion cards
// RTL layout: my messages right, others left
// ============================================================

const MessageBubble = ({ msg }) => {
  if (msg.isMe) {
    return (
      <View style={styles.myMsgWrap}>
        <LinearGradient
          colors={['#0D1B3E', '#1A2F5A']}
          style={styles.myBubble}
        >
          <Text style={styles.myMsgText}>{msg.text}</Text>
          <Text style={styles.myTimestamp}>{msg.time}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.otherMsgWrap}>
      <View style={styles.otherAvatar}>
        <Text style={styles.otherAvatarText}>{msg.avatar}</Text>
      </View>
      <View style={styles.otherBubbleGroup}>
        <Text style={styles.senderName}>{msg.sender}</Text>
        <View style={styles.otherBubble}>
          <Text style={styles.otherMsgText}>{msg.text}</Text>
          <Text style={styles.otherTimestamp}>{msg.time}</Text>
        </View>
      </View>
    </View>
  );
};

const AISuggestionCard = ({ onCreateTask, onDismiss }) => {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.aiCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Card header */}
      <View style={styles.aiCardHeader}>
        <View style={styles.aiCardTitleRow}>
          <AnjazLogo size={24} borderRadius={7} />
          <Text style={styles.aiCardTitle}>اقتراح من طويق</Text>
        </View>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>AI</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.aiCardContent}>
        <Text style={styles.aiCardLine}>
          <Text style={styles.aiCardLabel}>مهمة: </Text>
          <Text style={styles.aiCardValue}>تحديث تقرير المشروع</Text>
        </Text>
        <Text style={styles.aiCardLine}>
          <Text style={styles.aiCardLabel}>مقترح لـ: </Text>
          <Text style={styles.aiCardValue}>سارة المالكي</Text>
        </Text>
      </View>

      {/* Action buttons */}
      <View style={styles.aiCardActions}>
        <TouchableOpacity onPress={onCreateTask} style={styles.aiCreateBtn} activeOpacity={0.85}>
          <LinearGradient
            colors={['#0D1B3E', '#1A2F5A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiCreateBtnInner}
          >
            <Text style={styles.aiCreateBtnText}>إنشاء مهمة</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDismiss} style={styles.aiIgnoreBtn} activeOpacity={0.75}>
          <Text style={styles.aiIgnoreBtnText}>تجاهل</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const ChatDetailScreen = ({ route, navigation }) => {
  const conversation = route?.params?.conversation || { name: 'إدارة المشاريع', icon: '📋' };
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const scrollRef = useRef(null);
  const aiTimerRef = useRef(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      text: inputText.trim(),
      time: 'الآن',
      isMe: true,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setShowAISuggestion(false);

    // Show AI suggestion after 1 second
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    aiTimerRef.current = setTimeout(() => {
      setShowAISuggestion(true);
    }, 1000);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, []);

  const suggestionChips = [
    'تلخيص النقاش',
    'عرض المهام',
    'إنشاء مهمة',
    'موضوع النقاش',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D1B3E" />

      {/* Chat header */}
      <LinearGradient
        colors={['#0D1B3E', '#1A2F5A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>›</Text>
        </TouchableOpacity>

        {/* Avatar + Info */}
        <View style={styles.headerInfo}>
          <LinearGradient
            colors={['rgba(0,194,255,0.2)', 'rgba(0,150,204,0.2)']}
            style={styles.headerAvatar}
          >
            <Text style={styles.headerAvatarEmoji}>{conversation.icon || '📋'}</Text>
          </LinearGradient>
          <View>
            <Text style={styles.headerName}>{conversation.name}</Text>
            <View style={styles.onlineRow}>
              <View style={styles.greenDot} />
              <Text style={styles.onlineText}>متصلون 4</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionBtn}>
            <Text style={styles.headerActionIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionBtn}>
            <Text style={styles.headerActionIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesArea}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {chatMessages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {/* AI Suggestion card */}
        {showAISuggestion && (
          <View style={styles.aiCardWrap}>
            <AISuggestionCard
              onCreateTask={() => {
                setShowAISuggestion(false);
                navigation.navigate('CreateTask', { fromChat: true });
              }}
              onDismiss={() => setShowAISuggestion(false)}
            />
          </View>
        )}
      </ScrollView>

      {/* Smart suggestion chips */}
      <View style={styles.chipsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {suggestionChips.map((chip, i) => (
            <TouchableOpacity key={i} style={styles.chip} activeOpacity={0.75}>
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.inputActionBtn}>
          <Text style={styles.inputActionIcon}>📎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputActionBtn}>
          <Text style={styles.inputActionIcon}>🎤</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="اكتب رسالة..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          textAlign="right"
          multiline
        />
        <TouchableOpacity onPress={handleSend} activeOpacity={0.85}>
          <LinearGradient
            colors={['#0D1B3E', '#1A2F5A']}
            style={styles.sendBtn}
          >
            <Text style={styles.sendIcon}>›</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cyanPale,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 46 : (StatusBar.currentHeight || 24),
    paddingBottom: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,194,255,0.12)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(0,194,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,194,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  backIcon: {
    color: Colors.cyan,
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,194,255,0.3)',
  },
  headerAvatarEmoji: {
    fontSize: 20,
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    fontFamily: 'Cairo',
    textAlign: 'right',
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  onlineText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Typography.sizes.base,
    fontFamily: 'Cairo',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 8,
  },
  headerActionBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionIcon: {
    fontSize: 16,
    color: Colors.cyan,
  },
  messagesArea: {
    flex: 1,
  },
  messagesContent: {
    padding: 14,
    paddingBottom: 8,
  },

  // My messages (right side)
  myMsgWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  myBubble: {
    maxWidth: '75%',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    padding: 12,
    paddingHorizontal: 14,
  },
  myMsgText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xl,
    fontFamily: 'Cairo',
    lineHeight: 22,
    textAlign: 'right',
  },
  myTimestamp: {
    color: 'rgba(0,194,255,0.7)',
    fontSize: Typography.sizes.xs,
    fontFamily: 'Cairo',
    textAlign: 'left',
    marginTop: 4,
  },

  // Other messages (left side in LTR, right in RTL)
  otherMsgWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  otherAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.navyLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    flexShrink: 0,
  },
  otherAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Cairo',
  },
  otherBubbleGroup: {
    maxWidth: '75%',
    alignItems: 'flex-end',
  },
  senderName: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    fontFamily: 'Cairo',
    marginBottom: 3,
    textAlign: 'right',
  },
  otherBubble: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  otherMsgText: {
    color: Colors.text,
    fontSize: Typography.sizes.xl,
    fontFamily: 'Cairo',
    lineHeight: 22,
    textAlign: 'right',
  },
  otherTimestamp: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontFamily: 'Cairo',
    textAlign: 'left',
    marginTop: 4,
  },

  // AI suggestion card
  aiCardWrap: {
    marginVertical: 8,
  },
  aiCard: {
    backgroundColor: Colors.cyanPale,
    borderWidth: 1.5,
    borderColor: 'rgba(0,194,255,0.25)',
    borderRadius: 18,
    padding: 14,
    paddingHorizontal: 16,
    shadowColor: '#00C2FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  aiCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  aiCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiCardTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.navy,
    fontFamily: 'Cairo',
  },
  aiBadge: {
    backgroundColor: Colors.cyanSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  aiBadgeText: {
    color: Colors.cyanDark,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    fontFamily: 'Cairo',
  },
  aiCardContent: {
    marginBottom: 12,
    gap: 4,
  },
  aiCardLine: {
    textAlign: 'right',
    fontSize: Typography.sizes.xl,
    fontFamily: 'Cairo',
  },
  aiCardLabel: {
    color: Colors.textSec,
    fontWeight: Typography.weights.regular,
  },
  aiCardValue: {
    color: Colors.navy,
    fontWeight: Typography.weights.bold,
  },
  aiCardActions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  aiCreateBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  aiCreateBtnInner: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  aiCreateBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    fontFamily: 'Cairo',
  },
  aiIgnoreBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIgnoreBtnText: {
    color: Colors.textSec,
    fontSize: Typography.sizes.xl,
    fontFamily: 'Cairo',
  },

  // Chips
  chipsContainer: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  chips: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: Colors.cyanPale,
    borderWidth: 1,
    borderColor: Colors.cyan,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    color: Colors.cyanDark,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
    fontFamily: 'Cairo',
  },

  // Input bar
  inputBar: {
    backgroundColor: Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputActionBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputActionIcon: {
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.cyanPale,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: Typography.sizes.xl,
    color: Colors.text,
    fontFamily: 'Cairo',
    textAlign: 'right',
    maxHeight: 100,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: Colors.cyan,
    fontSize: 22,
    fontWeight: '700',
  },
});

export default ChatDetailScreen;
