import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '../theme';

// ============================================================
// BottomNav — 4-tab bottom navigation bar
// Active tab: full color icon, navy bold label, gradient underline
// Inactive: grayscale 40% opacity
// ============================================================

const tabs = [
  { id: 'conversations', label: 'المحادثات', icon: '💬', activeIcon: '💬' },
  { id: 'tasks', label: 'المهام', icon: '✅', activeIcon: '✅' },
  { id: 'radar', label: 'الرادار', icon: '📡', activeIcon: '📡' },
  { id: 'profile', label: 'حسابي', icon: '👤', activeIcon: '👤' },
];

const BottomNav = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrap}>
                <Text style={[styles.icon, !isActive && styles.inactiveIcon]}>
                  {tab.icon}
                </Text>
                {isActive && (
                  <LinearGradient
                    colors={['#0D1B3E', '#00C2FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.activeLine}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  isActive ? styles.activeLabel : styles.inactiveLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
  inner: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: 3,
    position: 'relative',
  },
  icon: {
    fontSize: 22,
  },
  inactiveIcon: {
    opacity: 0.4,
  },
  activeLine: {
    position: 'absolute',
    bottom: -4,
    width: 24,
    height: 2.5,
    borderRadius: 2,
  },
  label: {
    fontSize: Typography.sizes.md,
    fontFamily: 'Cairo',
    marginTop: 4,
  },
  activeLabel: {
    color: Colors.navy,
    fontWeight: Typography.weights.bold,
  },
  inactiveLabel: {
    color: Colors.textMuted,
    fontWeight: Typography.weights.regular,
  },
});

export default BottomNav;
