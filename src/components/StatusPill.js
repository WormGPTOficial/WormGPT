import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusConfig, PriorityConfig, Typography } from '../theme';

// ============================================================
// StatusPill — colored task status badge
// ============================================================
export const StatusPill = ({ status, style }) => {
  const config = StatusConfig[status] || { bg: '#eee', text: '#666', border: '#ccc' };
  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: config.bg, borderColor: config.border },
        style,
      ]}
    >
      <Text style={[styles.pillText, { color: config.text }]}>{status}</Text>
    </View>
  );
};

// ============================================================
// PriorityBadge — colored priority indicator
// ============================================================
export const PriorityBadge = ({ priority, style }) => {
  const config = PriorityConfig[priority] || { bg: '#eee', text: '#666' };
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      <Text style={[styles.badgeText, { color: config.text }]}>{priority}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontSize: Typography.sizes.base,
    fontWeight: '700',
    fontFamily: 'Cairo',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.sizes.base,
    fontWeight: '700',
    fontFamily: 'Cairo',
  },
});
