import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnjazLogo from '../components/AnjazLogo';
import { StatusPill, PriorityBadge } from '../components/StatusPill';
import { Colors, Typography, Shadows } from '../theme';

// ============================================================
// TaskDetailScreen — Full task view with progress & actions
// ============================================================

const InfoCard = ({ label, value, highlight }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, highlight && { color: Colors.danger }]}>{value}</Text>
  </View>
);

const TaskDetailScreen = ({ route, navigation }) => {
  const task = route?.params?.task || {
    id: '1',
    title: 'تحديث تقرير المشروع',
    team: 'إدارة المشاريع',
    assignee: 'أحمد',
    priority: 'عالية',
    due: 'اليوم',
    dueIsToday: true,
    status: 'طلب',
    progress: 40,
    description:
      'تحديث وتجهيز تقرير المشروع الشهري وإرساله للإدارة قبل نهاية اليوم. يشمل التقرير جميع البيانات المالية ومؤشرات الأداء الرئيسية.',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1B3E" />

      {/* Header */}
      <LinearGradient
        colors={['#0D1B3E', '#1A2F5A']}
        style={styles.headerBar}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>›</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <AnjazLogo size={24} borderRadius={7} />
          <Text style={styles.headerTitle}>تفاصيل المهمة</Text>
        </View>
        <View style={{ width: 36 }} />
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Due today alert */}
        {task.dueIsToday && (
          <View style={styles.alertBanner}>
            <Text style={styles.alertIcon}>🔴</Text>
            <Text style={styles.alertText}>مستحقة اليوم</Text>
          </View>
        )}

        {/* Task title + status */}
        <View style={styles.titleRow}>
          <StatusPill status={task.status} />
          <Text style={styles.taskTitle}>{task.title}</Text>
        </View>

        {/* Info grid 2x2 */}
        <View style={styles.infoGrid}>
          <InfoCard label="الأولوية" value={task.priority} />
          <InfoCard label="الاستحقاق" value={task.due} highlight={task.dueIsToday} />
          <InfoCard label="الفريق" value={task.team} />
          <InfoCard label="المسؤول" value={task.assignee} />
        </View>

        {/* Description */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>وصف المهمة</Text>
          <Text style={styles.descriptionText}>
            {task.description ||
              'تحديث وتجهيز تقرير المشروع الشهري وإرساله للإدارة قبل نهاية اليوم. يشمل التقرير جميع البيانات المالية ومؤشرات الأداء الرئيسية.'}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.sectionCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressPctLabel}>
              {task.progress}٪ مكتمل
            </Text>
            <Text style={styles.sectionLabel}>نسبة الإنجاز</Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={['#0D1B3E', '#00C2FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${task.progress}%` }]}
            />
          </View>
        </View>

        {/* Action buttons */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#0D1B3E', '#1A2F5A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.completeBtn}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,194,255,0.12)']}
              start={{ x: 0.6, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.completeBtnText}>✓  إكمال المهمة</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>طلب تحديث</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>إعادة تعيين المسؤول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  headerBar: {
    paddingTop: Platform.OS === 'ios' ? 46 : (StatusBar.currentHeight || 24),
    paddingBottom: 12, paddingHorizontal: 14,
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: 'rgba(0,194,255,0.12)',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: 'rgba(0,194,255,0.12)',
    borderWidth: 1, borderColor: 'rgba(0,194,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { color: Colors.cyan, fontSize: 22, fontWeight: '700', marginTop: -2 },
  headerCenter: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
  },
  headerTitle: {
    color: '#FFFFFF', fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extraBold, fontFamily: 'Cairo',
  },

  scroll: { flex: 1 },
  content: { padding: 14, paddingBottom: 30 },

  alertBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
    backgroundColor: Colors.dangerSoft, borderRadius: 14,
    borderWidth: 1.5, borderColor: 'rgba(255,75,107,0.3)',
    padding: 12, paddingHorizontal: 16, marginBottom: 14, gap: 8,
  },
  alertIcon: { fontSize: 16 },
  alertText: {
    color: Colors.danger, fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },

  titleRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 16,
  },
  taskTitle: {
    flex: 1, fontSize: Typography.sizes['5xl'],
    fontWeight: Typography.weights.black,
    color: Colors.navy, fontFamily: 'Cairo',
    textAlign: 'right', marginRight: 10, lineHeight: 32,
  },

  infoGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14,
  },
  infoCard: {
    width: '47%', backgroundColor: Colors.card,
    borderRadius: 14, borderWidth: 1, borderColor: Colors.border,
    padding: 14, alignItems: 'flex-end',
    ...Shadows.card,
  },
  infoLabel: {
    fontSize: Typography.sizes.md, color: Colors.textMuted,
    fontFamily: 'Cairo', marginBottom: 4,
  },
  infoValue: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold,
    color: Colors.text, fontFamily: 'Cairo',
  },

  sectionCard: {
    backgroundColor: Colors.card, borderRadius: 16,
    borderWidth: 1, borderColor: Colors.border,
    padding: 16, marginBottom: 14, ...Shadows.card,
  },
  sectionLabel: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold,
    color: Colors.textSec, fontFamily: 'Cairo',
    textAlign: 'right', marginBottom: 10,
  },
  descriptionText: {
    fontSize: Typography.sizes['2xl'], color: Colors.text,
    fontFamily: 'Cairo', textAlign: 'right', lineHeight: 28,
  },

  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  progressPctLabel: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold,
    color: Colors.cyan, fontFamily: 'Cairo',
  },
  progressTrack: {
    height: 8, backgroundColor: Colors.border,
    borderRadius: 4, overflow: 'hidden',
  },
  progressFill: { height: 8, borderRadius: 4 },

  completeBtn: {
    borderRadius: 16, padding: 15, alignItems: 'center',
    overflow: 'hidden', marginBottom: 12, ...Shadows.button,
  },
  completeBtnText: {
    color: '#FFFFFF', fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  secondaryActions: { flexDirection: 'row', gap: 10 },
  secondaryBtn: {
    flex: 1, padding: 12, borderRadius: 14,
    backgroundColor: Colors.cyanPale, borderWidth: 1.5,
    borderColor: Colors.cyan, alignItems: 'center',
  },
  secondaryBtnText: {
    color: Colors.cyanDark, fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold, fontFamily: 'Cairo',
  },
});

export default TaskDetailScreen;
