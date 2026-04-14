import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnjazLogo from './AnjazLogo';
import { Colors, Typography } from '../theme';

// ============================================================
// TopBar — appears on every screen except chat detail
// Navy gradient background, 90px height including status bar
// ============================================================

const TopBar = ({ title, onBack, showSearch = true, navigation }) => {
  return (
    <LinearGradient
      colors={['#0D1B3E', '#1A2F5A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D1B3E" />
      <View style={styles.content}>
        {/* Left: Back button or placeholder */}
        <View style={styles.left}>
          {onBack ? (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Text style={styles.backIcon}>›</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        {/* Center: Logo + Title */}
        <View style={styles.center}>
          <AnjazLogo size={28} />
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Right: Search + Avatar */}
        <View style={styles.right}>
          {showSearch && (
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          )}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>أ</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 46 : StatusBar.currentHeight || 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,194,255,0.12)',
  },
  content: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  right: {
    width: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
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
  },
  backIcon: {
    color: Colors.cyan,
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  placeholder: {
    width: 36,
  },
  title: {
    color: '#FFFFFF',
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extraBold,
    fontFamily: 'Cairo',
    marginLeft: 6,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,194,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(0,194,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.cyan,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Cairo',
  },
});

export default TopBar;
