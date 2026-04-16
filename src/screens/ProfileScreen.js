import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';
import { Colors, Typography, Shadows } from '../theme';
import { profileSettings, subscriptionPlans } from '../data/mockData';

// ============================================================
// ProfileScreen — User profile + settings + subscription modal
// ============================================================

const SubscriptionModal = ({ visible, onClose }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalSheet}>
        <View style={styles.modalHandle} />
        <Text style={styles.modalTitle}>خطط الاشتراك</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {subscriptionPlans.map((plan) => (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                plan.highlighted && styles.planCardHighlighted,
              ]}
            >
              {plan.highlighted && (
                <LinearGradient
                  colors={['rgba(0,194,255,0.06)', 'rgba(13,27,62,0.04)']}
                  style={StyleSheet.absoluteFillObject}
                />
              )}
              <View style={styles.planHeader}>
                <Text style={[styles.planPrice, plan.highlighted && { color: Colors.cyan }]}>
                  {plan.price}
                </Text>
                <Text style={styles.planName}>{plan.nameAr}</Text>
              </View>
              {plan.features.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <Text style={styles.featureText}>{f}</Text>
                  <Text style={styles.featureCheck}>✓</Text>
                </View>
              ))}
              {plan.highlighted && (
                <TouchableOpacity activeOpacity={0.85}>
                  <LinearGradient
                    colors={['#0D1B3E', '#1A2F5A']}
                    style={styles.planCTA}
                  >
                    <Text style={styles.planCTAText}>ابدأ الآن</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeBtnText}>إغلاق</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ProfileScreen = ({ navigation }) => {
  const [showSubscription, setShowSubscription] = useState(false);

  return (
    <View style={styles.container}>
      <TopBar title="حسابي" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile header card */}
        <LinearGradient
          colors={['#0D1B3E', '#243B6E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          {/* Ambient glow */}
          <View style={styles.ambientGlow} />

          <View style={styles.profileRow}>
            {/* Avatar */}
            <View style={styles.avatarOuter}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>أح</Text>
              </View>
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeText}>✦</Text>
              </View>
            </View>

            {/* User info */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>أحمد العتيبي</Text>
              <Text style={styles.profileRole}>مدير المشاريع</Text>
              {/* Plan badge */}
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>✦ خطة Pro</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Settings list */}
        <View style={styles.settingsList}>
          {profileSettings.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingRow}
              onPress={() => {
                if (item.id === '2') setShowSubscription(true);
              }}
              activeOpacity={0.75}
            >
              <Text style={styles.chevron}>›</Text>
              {item.badge && (
                <LinearGradient
                  colors={['#0D1B3E', '#1A2F5A']}
                  style={styles.proBadge}
                >
                  <Text style={styles.proBadgeText}>{item.badge}</Text>
                </LinearGradient>
              )}
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>{item.icon}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </ScrollView>

      <SubscriptionModal
        visible={showSubscription}
        onClose={() => setShowSubscription(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 14, paddingBottom: 30 },

  profileCard: {
    borderRadius: 24, padding: 26, paddingHorizontal: 20,
    marginBottom: 16, overflow: 'hidden', ...Shadows.button,
  },
  ambientGlow: {
    position: 'absolute', top: -30, right: -30,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(0,194,255,0.06)',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 16 },
  avatarOuter: { position: 'relative' },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(0,194,255,0.15)',
    borderWidth: 2.5, borderColor: 'rgba(0,194,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF', fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.navyMid,
  },
  avatarBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },

  profileInfo: { alignItems: 'flex-end' },
  profileName: {
    color: '#FFFFFF', fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.extraBold, fontFamily: 'Cairo', marginBottom: 4,
  },
  profileRole: {
    color: 'rgba(255,255,255,0.55)', fontSize: Typography.sizes.xl, fontFamily: 'Cairo', marginBottom: 8,
  },
  planBadge: {
    backgroundColor: 'rgba(245,166,35,0.2)',
    borderWidth: 1, borderColor: 'rgba(245,166,35,0.4)',
    borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4,
  },
  planBadgeText: {
    color: Colors.gold, fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },

  settingsList: { gap: 8, marginBottom: 16 },
  settingRow: {
    backgroundColor: Colors.card, borderRadius: 16,
    borderWidth: 1, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center',
    padding: 16, paddingHorizontal: 16, ...Shadows.card,
  },
  settingIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center',
    marginLeft: 12,
  },
  settingIconText: { fontSize: 20 },
  settingContent: { flex: 1, alignItems: 'flex-end', marginLeft: 8 },
  settingTitle: {
    fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold,
    color: Colors.text, fontFamily: 'Cairo',
  },
  settingSubtitle: {
    fontSize: Typography.sizes.md, color: Colors.textSec, fontFamily: 'Cairo', marginTop: 2,
  },
  proBadge: {
    borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 6,
  },
  proBadgeText: {
    color: Colors.cyan, fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },
  chevron: { color: Colors.textMuted, fontSize: 20, fontWeight: '700' },

  logoutBtn: {
    backgroundColor: Colors.dangerSoft, borderRadius: 16,
    borderWidth: 2, borderColor: 'rgba(255,75,107,0.15)',
    padding: 15, alignItems: 'center',
  },
  logoutText: {
    color: Colors.danger, fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold, fontFamily: 'Cairo',
  },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.card, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 20,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 16,
  },
  modalTitle: {
    fontSize: Typography.sizes['3xl'], fontWeight: Typography.weights.extraBold,
    color: Colors.text, fontFamily: 'Cairo', textAlign: 'right', marginBottom: 16,
  },

  planCard: {
    borderRadius: 18, borderWidth: 1.5,
    borderColor: Colors.border, padding: 18, marginBottom: 12,
    overflow: 'hidden',
  },
  planCardHighlighted: { borderColor: Colors.cyan },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  planName: { fontSize: Typography.sizes['3xl'], fontWeight: Typography.weights.black, color: Colors.navy, fontFamily: 'Cairo' },
  planPrice: { fontSize: Typography.sizes.lg, color: Colors.textSec, fontFamily: 'Cairo' },
  featureRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  featureText: { fontSize: Typography.sizes.xl, color: Colors.textSec, fontFamily: 'Cairo' },
  featureCheck: { color: Colors.success, fontSize: 16, fontWeight: '700' },
  planCTA: {
    borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 12, ...Shadows.button,
  },
  planCTAText: { color: '#FFFFFF', fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.bold, fontFamily: 'Cairo' },
  closeBtn: {
    marginTop: 12, padding: 14, borderRadius: 14,
    backgroundColor: Colors.bg, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center',
  },
  closeBtnText: { color: Colors.textSec, fontSize: Typography.sizes['2xl'], fontFamily: 'Cairo' },
});

export default ProfileScreen;
