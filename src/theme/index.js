// ============================================================
// Anjaz AI — Design System
// ============================================================

export const Colors = {
  // Primary Navy
  navy: '#0D1B3E',
  navyMid: '#1A2F5A',
  navyLight: '#243B6E',

  // Cyan (AI accent)
  cyan: '#00C2FF',
  cyanDark: '#0096CC',
  cyanSoft: '#E0F7FF',
  cyanPale: '#F0FBFF',

  // Gold (premium / Gulf market)
  gold: '#F5A623',
  goldDark: '#D4891A',
  goldSoft: '#FFF3DC',

  // Semantic
  danger: '#FF4B6B',
  dangerSoft: '#FFF0F3',
  dangerLight: 'rgba(255,75,107,0.12)',
  success: '#00C896',
  successSoft: '#E6FBF5',
  warning: '#FF8C42',
  warningSoft: '#FFF4EE',

  // Purple (status)
  purple: '#7C6FFF',
  purpleSoft: '#F0EEFF',

  // Backgrounds
  bg: '#F4F8FF',
  card: '#FFFFFF',
  border: '#D6EEFF',

  // Text
  text: '#0D1B3E',
  textSec: '#5A6A8A',
  textMuted: '#96A8C8',

  // Overlays
  overlayDark: 'rgba(0,0,0,0.06)',
  overlayNavy: 'rgba(13,27,62,0.4)',
  overlayCyan: 'rgba(0,194,255,0.12)',
  overlayWhite: 'rgba(255,255,255,0.05)',
};

export const Typography = {
  family: 'Cairo',
  weights: {
    regular: '400',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
  sizes: {
    xs: 9,
    sm: 10,
    base: 11,
    md: 12,
    lg: 13,
    xl: 14,
    '2xl': 16,
    '3xl': 18,
    '4xl': 19,
    '5xl': 22,
    '6xl': 23,
    '7xl': 30,
    '8xl': 42,
  },
};

export const Radii = {
  badge: 8,
  small: 12,
  button: 16,
  card: 18,
  cardLarge: 20,
  profile: 24,
  splash: 34,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  button: {
    shadowColor: '#0D1B3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
    elevation: 8,
  },
  gold: {
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cyan: {
    shadowColor: '#00C2FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  success: {
    shadowColor: '#00C896',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 12,
  },
};

export const Gradients = {
  navy: ['#0D1B3E', '#1A2F5A'],
  navyWide: ['#0D1B3E', '#1A2F5A', '#243B6E'],
  splashBg: ['#0D1B3E', '#1A2F5A', '#243B6E'],
  gold: ['#F5A623', '#D4891A'],
  success: ['#00A07A', '#00C896'],
  progress: ['#0D1B3E', '#00C2FF'],
  loadingBar: ['#00C2FF', '#F5A623'],
};

// Status pill configs
export const StatusConfig = {
  طلب: { bg: Colors.cyanSoft, text: Colors.cyanDark, border: Colors.cyan },
  مراجعة: { bg: Colors.warningSoft, text: Colors.warning, border: Colors.warning },
  تنفيذ: { bg: Colors.purpleSoft, text: Colors.purple, border: Colors.purple },
  موافقة: { bg: Colors.goldSoft, text: Colors.goldDark, border: Colors.gold },
  إغلاق: { bg: Colors.successSoft, text: Colors.success, border: Colors.success },
};

// Priority badge configs
export const PriorityConfig = {
  عالية: { bg: Colors.dangerLight, text: Colors.danger },
  متوسطة: { bg: 'rgba(255,140,66,0.12)', text: Colors.warning },
  منخفضة: { bg: 'rgba(0,200,150,0.12)', text: Colors.success },
};
