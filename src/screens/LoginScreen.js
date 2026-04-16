import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnjazLogo from '../components/AnjazLogo';
import { Colors, Typography } from '../theme';

// ============================================================
// LoginScreen
// Top 40%: navy gradient with logo
// Bottom: white card (overlaps header) with form
// ============================================================

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleLogin = () => {
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D1B3E" />
      <ScrollView
        style={styles.flex}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top section — navy gradient */}
        <LinearGradient
          colors={['#0D1B3E', '#1A2F5A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.topSection}
        >
          {/* Logo container */}
          <View style={styles.logoOuter}>
            <View style={styles.logoContainer}>
              <AnjazLogo size={52} borderRadius={16} />
            </View>
            <View style={styles.sparkleBadge}>
              <Text style={styles.sparkleIcon}>✦</Text>
            </View>
          </View>

          {/* App name */}
          <Text style={styles.appName}>
            <Text style={styles.appNameWhite}>Anjaz </Text>
            <Text style={styles.appNameCyan}>AI</Text>
          </Text>

          <Text style={styles.subtitle}>حوّل كلامك إلى إنجاز</Text>
        </LinearGradient>

        {/* Form card — white, overlaps header */}
        <View style={styles.formCard}>
          <Text style={styles.greeting}>مرحباً بعودتك</Text>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>البريد الإلكتروني</Text>
            <TextInput
              style={[
                styles.input,
                emailFocused && styles.inputFocused,
              ]}
              placeholder="name@company.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="right"
              writingDirection="rtl"
            />
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>كلمة المرور</Text>
            <TextInput
              style={[
                styles.input,
                passFocused && styles.inputFocused,
              ]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
              secureTextEntry
              textAlign="right"
            />
          </View>

          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
          </TouchableOpacity>

          {/* Login button */}
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.85}>
            <LinearGradient
              colors={['#0D1B3E', '#1A2F5A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryBtn}
            >
              {/* Cyan shimmer overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(0,194,255,0.12)']}
                start={{ x: 0.6, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.primaryBtnText}>تسجيل الدخول</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* SSO button */}
          <TouchableOpacity style={styles.ssoBtn} activeOpacity={0.85}>
            <Text style={styles.ssoBtnText}>تسجيل الدخول بحساب الشركة (SSO)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  topSection: {
    paddingTop: Platform.OS === 'ios' ? 58 : (StatusBar.currentHeight || 24) + 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  logoOuter: {
    position: 'relative',
    marginBottom: 16,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,194,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00C2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 8,
  },
  sparkleBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  sparkleIcon: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  appName: {
    fontSize: 28,
    letterSpacing: -0.5,
    marginBottom: 6,
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
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontFamily: 'Cairo',
  },
  formCard: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: 480,
  },
  greeting: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extraBold,
    color: Colors.text,
    fontFamily: 'Cairo',
    textAlign: 'right',
    marginBottom: 22,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold,
    color: Colors.textSec,
    fontFamily: 'Cairo',
    textAlign: 'right',
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.cyanPale,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 13,
    paddingHorizontal: 16,
    fontSize: Typography.sizes['2xl'],
    color: Colors.text,
    fontFamily: 'Cairo',
    writingDirection: 'rtl',
  },
  inputFocused: {
    borderColor: Colors.cyan,
  },
  forgotWrap: {
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  forgotText: {
    color: Colors.cyan,
    fontSize: Typography.sizes.lg,
    fontFamily: 'Cairo',
    fontWeight: Typography.weights.semiBold,
  },
  primaryBtn: {
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#0D1B3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    fontFamily: 'Cairo',
  },
  ssoBtn: {
    backgroundColor: Colors.goldSoft,
    borderWidth: 2,
    borderColor: 'rgba(245,166,35,0.3)',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ssoBtnText: {
    color: Colors.goldDark,
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    fontFamily: 'Cairo',
  },
});

export default LoginScreen;
