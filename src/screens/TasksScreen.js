import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';
import { StatusPill, PriorityBadge } from '../components/StatusPill';
import { Colors, Typography, Shadows } from '../theme';
import { tasks } from '../data/mockData';

// ============================================================
// TasksScreen — Tasks board with filter tabs
// ============================================================

const FILTERS = ['كل المهام', 'الفريق', 'مهامي'];

const TaskCard = ({ task, onPress }) => {
  const borderColor =
    task.priority === 'عالية'
      ? Colors.danger
      : task.priority === 'متوسطة'
      ? Colors.warning
      : Colors.success;

  return (
    <TouchableOpacity
      style={[styles.card, { borderRightColor: borderColor }]}
      onPress={() => onPress(task)}
      activeOpacity={0.8}
    >
      {/* Row 1: Title + Status */}
      <View style={styles.cardRow}>
        <StatusPill status={task.status} />
        <Text style={styles.cardTitle} numberOfLines={1}>{task.title}</Text>
      </View>

      {/* Row 2: Team + Priority */}
      <View style={styles.cardRow}>
        <PriorityBadge priority={task.priority} />
        <Text style={styles.cardTeam}>{task.team}</Text>
      </View>

      {/* Row 3: Assignee + Due */}
      <View style={styles.cardRow}>
        <Text style={[styles.cardDue, task.dueIsToday && styles.cardDueToday]}>
          {task.dueIsToday ? '🔴 ' : ''}{task.due}
        </Text>
        <View style={styles.assigneeRow}>
          <View style={styles.assigneeAvatar}>
            <Text style={styles.assigneeAvatarText}>{task.assignee[0]}</Text>
          </View>
          <Text style={styles.assigneeName}>{task.assignee}</Text>
        </View>
      </View>

      {/* Row 4: Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressPct}>{task.progress}٪</Text>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={['#0D1B3E', '#00C2FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${task.progress}%` }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TasksScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('كل المهام');

  return (
    <View style={styles.container}>
      <TopBar title="المهام" />

      {/* Filter tabs */}
      <View style={styles.filtersWrap}>
        <View style={styles.filtersRow}>
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return isActive ? (
              <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#0D1B3E', '#1A2F5A']}
                  style={styles.filterPillActive}
                >
                  <Text style={styles.filterTextActive}>{f}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={f}
                style={styles.filterPillInactive}
                onPress={() => setActiveFilter(f)}
                activeOpacity={0.75}
              >
                <Text style={styles.filterTextInactive}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={(t) => navigation.navigate('TaskDetail', { task: t })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fabWrap}
        onPress={() => navigation.navigate('CreateTask')}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={['#0D1B3E', '#1A2F5A']}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}>
            <Text style={{ color: Colors.cyan, fontSize: 20, fontWeight: '900' }}>+ </Text>
            <Text style={{ color: '#fff', fontSize: Typography.sizes.xl, fontFamily: 'Cairo', fontWeight: Typography.weights.bold }}>
              مهمة جديدة
            </Text>
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  filtersWrap: { paddingHorizontal: 14, paddingVertical: 12 },
  filtersRow: { flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },
  filterPillActive: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, ...Shadows.button,
  },
  filterTextActive: {
    color: '#FFFFFF', fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  filterPillInactive: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, backgroundColor: Colors.card,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  filterTextInactive: {
    color: Colors.textMuted, fontSize: Typography.sizes.xl, fontFamily: 'Cairo',
  },

  list: { paddingHorizontal: 14, paddingBottom: 90 },

  card: {
    backgroundColor: Colors.card, borderRadius: 20,
    padding: 14, paddingHorizontal: 16, marginBottom: 10,
    borderRightWidth: 4, ...Shadows.card,
  },
  cardRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  cardTitle: {
    flex: 1, fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text, fontFamily: 'Cairo', textAlign: 'right', marginRight: 8,
  },
  cardTeam: {
    fontSize: Typography.sizes.lg, color: Colors.textSec, fontFamily: 'Cairo',
  },
  cardDue: {
    fontSize: Typography.sizes.md, color: Colors.textSec, fontFamily: 'Cairo',
  },
  cardDueToday: { color: Colors.danger, fontWeight: Typography.weights.bold },
  assigneeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  assigneeAvatar: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.navyMid,
    alignItems: 'center', justifyContent: 'center',
  },
  assigneeAvatarText: {
    color: '#FFFFFF', fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  assigneeName: {
    fontSize: Typography.sizes.lg, color: Colors.textSec, fontFamily: 'Cairo',
  },

  progressRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 2,
  },
  progressTrack: {
    flex: 1, height: 5, backgroundColor: Colors.border,
    borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: 5, borderRadius: 3 },
  progressPct: {
    fontSize: Typography.sizes.base, color: Colors.cyan,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo', minWidth: 36, textAlign: 'left',
  },

  fabWrap: {
    position: 'absolute', bottom: 14, alignSelf: 'center',
    borderRadius: 16, overflow: 'hidden', ...Shadows.button,
  },
  fab: {
    paddingVertical: 13, paddingHorizontal: 28,
    borderRadius: 16, alignItems: 'center',
  },
  fabIcon: {},
});

export default TasksScreen;
