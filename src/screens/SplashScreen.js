import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnjazLogo from '../components/AnjazLogo';
import { Colors, Typography } from '../theme';

const { width } = Dimensions.get('window');

// ============================================================
// SplashScreen — 2400ms auto-navigate to Login
// Navy gradient bg, glowing logo, animated loading bar
// ============================================================

const SplashScreen = ({ navigation }) => {
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // Fade in and scale up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animated loading bar to 60%
    Animated.timing(loadingAnim, {
      toValue: 0.6,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const loadingWidth = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  return (
    <LinearGradient
      colors={['#0D1B3E', '#1A2F5A', '#243B6E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      >
        {/* Ambient glow orb */}
        <Animated.View style={[styles.glowOrb, { opacity: glowAnim }]} />

        {/* Logo container */}
        <View style={styles.logoOuter}>
          <View style={styles.logoContainer}>
            <AnjazLogo size={76} borderRadius={22} />
          </View>
          {/* Gold sparkle badge */}
          <View style={styles.sparkleBadge}>
            <Text style={styles.sparkleIcon}>✦</Text>
          </View>
        </View>

        {/* App name */}
        <View style={styles.nameRow}>
          <Text style={styles.appName}>
            <Text style={styles.appNameWhite}>Anjaz </Text>
            <Text style={styles.appNameCyan}>AI</Text>
          </Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>حوّل كلامك إلى إنجاز</Text>

        {/* Loading bar */}
        <View style={styles.loadingTrack}>
          <Animated.View style={styles.loadingFillWrapper}>
            <LinearGradient
              colors={['#00C2FF', '#F5A623']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.loadingFill, { width: loadingWidth }]}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(0,194,255,0.15)',
    top: -80,
    alignSelf: 'center',
    // Simulated radial gradient via shadow
    shadowColor: '#00C2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 0,
  },
  logoOuter: {
    position: 'relative',
    marginBottom: 28,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,194,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00C2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 16,
  },
  sparkleBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  sparkleIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  nameRow: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 42,
    letterSpacing: -1,
  },
  appNameWhite: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontFamily: 'Cairo',
  },
  appNameCyan: {
    color: Colors.cyan,
    fontWeight: '900',
    fontFamily: 'Cairo',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 44,
    fontFamily: 'Cairo',
    fontWeight: '400',
  },
  loadingTrack: {
    width: 120,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  loadingFillWrapper: {
    height: 3,
  },
  loadingFill: {
    height: 3,
    borderRadius: 4,
  },
});

export default SplashScreen;
