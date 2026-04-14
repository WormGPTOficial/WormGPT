import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';
import { Colors, Typography, Shadows } from '../theme';
import { radarAlerts, workflowSteps } from '../data/mockData';

// ============================================================
// RadarScreen — Smart Radar with stats, alerts, workflow
// ============================================================

const STATS = [
  {
    id: '1', label: 'المهام النشطة', value: '10',
    color: Colors.cyan, bg: Colors.cyanSoft,
    shadow: 'rgba(0,194,255,0.08)',
  },
  {
    id: '2', label: 'المعلقة', value: '6',
    color: Colors.warning, bg: Colors.goldSoft,
    shadow: 'rgba(255,140,66,0.08)',
  },
  {
    id: '3', label: 'تضارب', value: '3',
    color: Colors.danger, bg: Colors.dangerSoft,
    shadow: 'rgba(255,75,107,0.08)',
  },
  {
    id: '4', label: 'مكتملة', value: '37',
    color: Colors.success, bg: Colors.successSoft,
    shadow: 'rgba(0,200,150,0.08)',
  },
];

const ALERT_COLORS = {
  danger: Colors.danger,
  warning: Colors.warning,
  cyan: Colors.cyan,
  gold: Colors.gold,
};

const AlertRow = ({ alert, isLast }) => {
  const color = ALERT_COLORS[alert.color] || Colors.cyan;
  return (
    <View style={[styles.alertRow, !isLast && styles.alertRowBorder]}>
      <Text style={styles.alertMessage}>{alert.message}</Text>
      <View style={[styles.alertBadge, { backgroundColor: `${color}20` }]}>
        <Text style={[styles.alertBadgeText, { color }]}>{alert.type}</Text>
      </View>
      <Text style={styles.alertIcon}>{alert.icon}</Text>
    </View>
  );
};

const WorkflowProgress = () => {
  const steps = workflowSteps;
  return (
    <View style={styles.workflowCard}>
      <Text style={styles.cardTitle}>مسار العمل الحالي</Text>
      <View style={styles.workflowRow}>
        {steps.map((step, i) => {
          const isActive = step.active && step.completed;
          const isPending = step.active && !step.completed;
          const isFuture = !step.active;
          const isLast = i === steps.length - 1;

          return (
            <View key={step.id} style={styles.workflowStepWrap}>
              <View style={styles.workflowStepInner}>
                {/* Circle */}
                {isActive ? (
                  <LinearGradient
                    colors={['#0D1B3E', '#1A2F5A']}
                    style={styles.stepCircleActive}
                  >
                    <View style={styles.stepCircleBorderActive} />
                    <Text style={styles.stepCircleTextActive}>{i + 1}</Text>
                  </LinearGradient>
                ) : isPending ? (
                  <View style={styles.stepCirclePending}>
                    <Text style={styles.stepCircleTextPending}>{i + 1}</Text>
                  </View>
                ) : (
                  <View style={styles.stepCircleFuture}>
                    <Text style={styles.stepCircleTextFuture}>{i + 1}</Text>
                  </View>
                )}

                {/* Connector line */}
                {!isLast && (
                  isActive ? (
                    <LinearGradient
                      colors={['#0D1B3E', '#00C2FF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.connectorActive}
                    />
                  ) : (
                    <View style={styles.connectorFuture} />
                  )
                )}
              </View>
              <Text style={[
                styles.stepLabel,
                isActive && styles.stepLabelActive,
                isPending && styles.stepLabelPending,
              ]}>
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RadarScreen = () => {
  return (
    <View style={styles.container}>
      <TopBar title="الرادار الذكي" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Stats grid 2×2 */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View
              key={stat.id}
              style={[
                styles.statCard,
                { backgroundColor: stat.bg, borderColor: `${stat.color}40` },
              ]}
            >
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: stat.color }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Radar alerts */}
        <View style={styles.alertsCard}>
          <Text style={styles.cardTitle}>تنبيهات الرادار</Text>
          {radarAlerts.map((alert, i) => (
            <AlertRow
              key={alert.id}
              alert={alert}
              isLast={i === radarAlerts.length - 1}
            />
          ))}
        </View>

        {/* Workflow progress */}
        <WorkflowProgress />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 14, paddingBottom: 24 },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14,
  },
  statCard: {
    width: '47%', borderRadius: 18, padding: 18,
    alignItems: 'flex-end', borderWidth: 1,
    ...Shadows.card,
  },
  statValue: {
    fontSize: Typography.sizes['7xl'],
    fontWeight: Typography.weights.black, fontFamily: 'Cairo', marginBottom: 4,
  },
  statLabel: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.semiBold, fontFamily: 'Cairo',
  },

  alertsCard: {
    backgroundColor: Colors.card, borderRadius: 20,
    padding: 18, marginBottom: 14, ...Shadows.card,
  },
  cardTitle: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold,
    color: Colors.text, fontFamily: 'Cairo',
    textAlign: 'right', marginBottom: 14,
  },
  alertRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'flex-end', paddingVertical: 12, gap: 10,
  },
  alertRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  alertMessage: {
    flex: 1, fontSize: Typography.sizes.xl, color: Colors.text,
    fontFamily: 'Cairo', textAlign: 'right',
  },
  alertBadge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8,
  },
  alertBadgeText: {
    fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  alertIcon: { fontSize: 18, width: 24, textAlign: 'center' },

  workflowCard: {
    backgroundColor: Colors.card, borderRadius: 20,
    padding: 18, ...Shadows.card,
  },
  workflowRow: {
    flexDirection: 'row', alignItems: 'flex-start', marginTop: 4,
  },
  workflowStepWrap: { flex: 1, alignItems: 'center' },
  workflowStepInner: {
    flexDirection: 'row', alignItems: 'center', width: '100%',
  },

  stepCircleActive: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  stepCircleBorderActive: {
    position: 'absolute', width: 38, height: 38,
    borderRadius: 19, borderWidth: 2, borderColor: Colors.cyan,
  },
  stepCircleTextActive: {
    color: '#FFFFFF', fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  stepCirclePending: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.cyanSoft,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  stepCircleTextPending: {
    color: Colors.cyan, fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  stepCircleFuture: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  stepCircleTextFuture: {
    color: Colors.textMuted, fontSize: Typography.sizes.md, fontFamily: 'Cairo',
  },

  connectorActive: { flex: 1, height: 3, borderRadius: 2 },
  connectorFuture: { flex: 1, height: 3, borderRadius: 2, backgroundColor: Colors.border },

  stepLabel: {
    fontSize: Typography.sizes.xs, color: Colors.textMuted,
    fontFamily: 'Cairo', marginTop: 6, textAlign: 'center',
  },
  stepLabelActive: { color: Colors.navy, fontWeight: Typography.weights.bold },
  stepLabelPending: { color: Colors.cyan, fontWeight: Typography.weights.semiBold },
});

export default RadarScreen;
