import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnjazLogo from '../components/AnjazLogo';
import { Colors, Typography, Shadows } from '../theme';

// ============================================================
// CreateTaskScreen — 3-step flow
// Step 1/2: AI Banner + Form
// Step 3: Success screen
// ============================================================

const TEAMS = ['إدارة المشاريع', 'فريق الشبكات', 'المشتريات', 'الدعم الفني'];
const PRIORITIES = ['عالية', 'متوسطة', 'منخفضة'];
const DUE_DATES = ['اليوم', 'غداً', 'تحديد تاريخ'];

const PRIORITY_COLORS = {
  عالية: Colors.danger,
  متوسطة: Colors.warning,
  منخفضة: Colors.success,
};

const WorkflowBar = () => {
  const steps = ['طلب', 'مراجعة', 'موافقة', 'تنفيذ', 'إغلاق'];
  return (
    <View style={styles.workflowRow}>
      {steps.map((step, i) => (
        <View key={i} style={styles.workflowStep}>
          {i === 0 ? (
            <LinearGradient
              colors={['#0D1B3E', '#00C2FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.workflowSegmentActive}
            />
          ) : (
            <View style={styles.workflowSegmentInactive} />
          )}
          <Text style={[styles.workflowLabel, i === 0 && styles.workflowLabelActive]}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const CreateTaskScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('تحديث تقرير المشروع');
  const [description, setDescription] = useState(
    'تحديث وتجهيز تقرير المشروع الشهري وإرساله للإدارة قبل نهاية اليوم'
  );
  const [team, setTeam] = useState('إدارة المشاريع');
  const [priority, setPriority] = useState('عالية');
  const [dueDate, setDueDate] = useState('اليوم');
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const handleCreate = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
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
            <Text style={styles.headerTitle}>تم الإنشاء</Text>
          </View>
          <View style={{ width: 36 }} />
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.successContent}>
          {/* Success circle */}
          <LinearGradient
            colors={['#00A07A', '#00C896']}
            style={styles.successCircle}
          >
            <Text style={styles.checkmark}>✓</Text>
          </LinearGradient>

          <Text style={styles.successTitle}>تم إنشاء المهمة بنجاح!</Text>

          {/* Task summary card */}
          <View style={styles.summaryCard}>
            {[
              { label: 'عنوان المهمة', value: title },
              { label: 'الفريق', value: team },
              { label: 'المسؤول', value: 'سارة المالكي' },
              { label: 'الأولوية', value: priority },
              { label: 'الاستحقاق', value: dueDate },
            ].map((row, i) => (
              <View key={i} style={[styles.summaryRow, i < 4 && styles.summaryRowBorder]}>
                <Text style={styles.summaryValue}>{row.value}</Text>
                <Text style={styles.summaryLabel}>{row.label}</Text>
              </View>
            ))}
          </View>

          {/* Workflow progress */}
          <View style={styles.workflowCard}>
            <Text style={styles.workflowTitle}>مسار العمل</Text>
            <WorkflowBar />
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Main', { screen: 'tasks' })}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#0D1B3E', '#1A2F5A']}
              style={styles.primarySuccessBtn}
            >
              <Text style={styles.primarySuccessBtnText}>عرض لوحة المهام</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondarySuccessBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.secondarySuccessBtnText}>العودة للمحادثة</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

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
          <Text style={styles.headerTitle}>إنشاء مهمة</Text>
        </View>
        <View style={{ width: 36 }} />
      </LinearGradient>

      <ScrollView style={styles.formScroll} keyboardShouldPersistTaps="handled">
        {/* AI Detection Banner */}
        <LinearGradient
          colors={['#0D1B3E', '#1A2F5A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aiBanner}
        >
          <View style={styles.aiBannerLeft}>
            <AnjazLogo size={32} borderRadius={9} />
          </View>
          <View style={styles.aiBannerContent}>
            <Text style={styles.aiBannerTitle}>اقتراح الذكاء الاصطناعي</Text>
            <Text style={styles.aiBannerSub}>
              تم استخراج التفاصيل من المحادثة تلقائياً
            </Text>
          </View>
          <View style={styles.aiBannerBadge}>
            <Text style={styles.aiBannerBadgeText}>✦ AI</Text>
          </View>
        </LinearGradient>

        {/* Form */}
        <View style={styles.formContent}>
          {/* Title */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>عنوان المهمة</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              textAlign="right"
              fontFamily="Cairo"
            />
          </View>

          {/* Description */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>وصف المهمة</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={2}
              textAlign="right"
              textAlignVertical="top"
            />
          </View>

          {/* Team */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>الفريق</Text>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setShowTeamDropdown(!showTeamDropdown)}
            >
              <Text style={styles.selectChevron}>▾</Text>
              <Text style={styles.selectValue}>{team}</Text>
            </TouchableOpacity>
            {showTeamDropdown && (
              <View style={styles.dropdown}>
                {TEAMS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.dropdownItem, t === team && styles.dropdownItemActive]}
                    onPress={() => {
                      setTeam(t);
                      setShowTeamDropdown(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, t === team && styles.dropdownItemTextActive]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Priority */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>الأولوية</Text>
            <View style={styles.toggleRow}>
              {PRIORITIES.map((p) => {
                const isActive = priority === p;
                const color = PRIORITY_COLORS[p];
                return (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.toggleBtn,
                      isActive && {
                        backgroundColor: `${color}22`,
                        borderColor: color,
                      },
                    ]}
                    onPress={() => setPriority(p)}
                  >
                    <Text
                      style={[
                        styles.toggleBtnText,
                        isActive && { color },
                      ]}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Due date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>تاريخ الاستحقاق</Text>
            <View style={styles.toggleRow}>
              {DUE_DATES.map((d) => {
                const isActive = dueDate === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.pillBtn,
                      isActive && styles.pillBtnActive,
                    ]}
                    onPress={() => setDueDate(d)}
                  >
                    <Text
                      style={[
                        styles.pillBtnText,
                        isActive && styles.pillBtnTextActive,
                      ]}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Create button */}
          <TouchableOpacity onPress={handleCreate} activeOpacity={0.85} style={{ marginTop: 8 }}>
            <LinearGradient
              colors={['#0D1B3E', '#1A2F5A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.createBtn}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,194,255,0.12)']}
                start={{ x: 0.6, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.createBtnText}>إنشاء المهمة</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.75}
          >
            <Text style={styles.cancelBtnText}>إلغاء</Text>
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
    paddingBottom: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,194,255,0.12)',
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

  formScroll: { flex: 1 },

  // AI Banner
  aiBanner: {
    margin: 14, borderRadius: 16,
    padding: 16, paddingHorizontal: 18,
    flexDirection: 'row', alignItems: 'center',
  },
  aiBannerLeft: { marginLeft: 12 },
  aiBannerContent: { flex: 1 },
  aiBannerTitle: {
    color: Colors.cyan, fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo', textAlign: 'right',
  },
  aiBannerSub: {
    color: 'rgba(255,255,255,0.6)', fontSize: Typography.sizes.md,
    fontFamily: 'Cairo', textAlign: 'right', marginTop: 2,
  },
  aiBannerBadge: {
    backgroundColor: 'rgba(245,166,35,0.2)',
    borderWidth: 1, borderColor: 'rgba(245,166,35,0.4)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  aiBannerBadgeText: {
    color: Colors.gold, fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },

  formContent: { paddingHorizontal: 14, paddingBottom: 30 },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: {
    fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semiBold,
    color: Colors.textSec, fontFamily: 'Cairo',
    textAlign: 'right', marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.cyanPale, borderWidth: 2, borderColor: Colors.border,
    borderRadius: 14, padding: 13, paddingHorizontal: 16,
    fontSize: Typography.sizes.xl, color: Colors.text, fontFamily: 'Cairo',
  },
  textarea: { minHeight: 72, paddingTop: 12 },

  selectBtn: {
    backgroundColor: Colors.cyanPale, borderWidth: 2, borderColor: Colors.border,
    borderRadius: 14, padding: 13, paddingHorizontal: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  selectValue: { fontSize: Typography.sizes.xl, color: Colors.text, fontFamily: 'Cairo' },
  selectChevron: { color: Colors.textMuted, fontSize: 16 },
  dropdown: {
    backgroundColor: Colors.card, borderRadius: 14, borderWidth: 1.5,
    borderColor: Colors.border, marginTop: 4, overflow: 'hidden', ...Shadows.card,
  },
  dropdownItem: { padding: 14, paddingHorizontal: 16 },
  dropdownItemActive: { backgroundColor: Colors.cyanPale },
  dropdownItemText: { fontSize: Typography.sizes.xl, color: Colors.textSec, fontFamily: 'Cairo', textAlign: 'right' },
  dropdownItemTextActive: { color: Colors.navy, fontWeight: Typography.weights.bold },

  toggleRow: { flexDirection: 'row', gap: 8 },
  toggleBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.card, alignItems: 'center',
  },
  toggleBtnText: { fontSize: Typography.sizes.xl, fontFamily: 'Cairo', color: Colors.textSec, fontWeight: Typography.weights.semiBold },

  pillBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.card, alignItems: 'center',
  },
  pillBtnActive: { backgroundColor: Colors.cyanSoft, borderColor: Colors.cyan },
  pillBtnText: { fontSize: Typography.sizes.xl, fontFamily: 'Cairo', color: Colors.textSec },
  pillBtnTextActive: { color: Colors.cyanDark, fontWeight: Typography.weights.bold },

  createBtn: {
    borderRadius: 16, padding: 15, alignItems: 'center',
    overflow: 'hidden', ...Shadows.button,
  },
  createBtnText: { color: '#FFFFFF', fontSize: Typography.sizes['3xl'], fontWeight: Typography.weights.bold, fontFamily: 'Cairo' },
  cancelBtn: {
    marginTop: 12, padding: 14, borderRadius: 16,
    borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center',
  },
  cancelBtnText: { color: Colors.textMuted, fontSize: Typography.sizes['2xl'], fontFamily: 'Cairo' },

  // Success screen
  successContent: { alignItems: 'center', padding: 20, paddingTop: 36 },
  successCircle: {
    width: 96, height: 96, borderRadius: 48,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    ...Shadows.success,
  },
  checkmark: { color: '#FFFFFF', fontSize: 46, fontWeight: '900' },
  successTitle: {
    fontSize: Typography.sizes['6xl'], fontWeight: Typography.weights.black,
    color: Colors.text, fontFamily: 'Cairo', marginBottom: 24, textAlign: 'center',
  },

  summaryCard: {
    width: '100%', backgroundColor: Colors.cyanPale,
    borderRadius: 18, borderWidth: 1.5, borderColor: Colors.border,
    marginBottom: 16, overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 14, paddingHorizontal: 18,
  },
  summaryRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  summaryLabel: { fontSize: Typography.sizes.xl, color: Colors.textSec, fontFamily: 'Cairo' },
  summaryValue: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Colors.navy, fontFamily: 'Cairo' },

  workflowCard: {
    width: '100%', backgroundColor: Colors.card,
    borderRadius: 18, borderWidth: 1, borderColor: Colors.border,
    padding: 16, marginBottom: 20,
  },
  workflowTitle: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold,
    color: Colors.text, fontFamily: 'Cairo', textAlign: 'right', marginBottom: 14,
  },
  workflowRow: { flexDirection: 'row', alignItems: 'flex-start' },
  workflowStep: { flex: 1, alignItems: 'center' },
  workflowSegmentActive: { width: '100%', height: 6, borderRadius: 3 },
  workflowSegmentInactive: { width: '100%', height: 6, borderRadius: 3, backgroundColor: Colors.border },
  workflowLabel: {
    fontSize: Typography.sizes.xs, color: Colors.textMuted,
    fontFamily: 'Cairo', marginTop: 4, textAlign: 'center',
  },
  workflowLabelActive: { color: Colors.navy, fontWeight: Typography.weights.bold },

  primarySuccessBtn: {
    width: 300, borderRadius: 16, padding: 15,
    alignItems: 'center', marginBottom: 12, ...Shadows.button,
  },
  primarySuccessBtnText: { color: '#FFFFFF', fontSize: Typography.sizes['3xl'], fontWeight: Typography.weights.bold, fontFamily: 'Cairo' },
  secondarySuccessBtn: {
    width: 300, borderRadius: 16, padding: 14,
    backgroundColor: Colors.goldSoft,
    borderWidth: 2, borderColor: 'rgba(245,166,35,0.3)', alignItems: 'center',
  },
  secondarySuccessBtnText: { color: Colors.goldDark, fontSize: Typography.sizes['3xl'], fontWeight: Typography.weights.bold, fontFamily: 'Cairo' },
});

export default CreateTaskScreen;
