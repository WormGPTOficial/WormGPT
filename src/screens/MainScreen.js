import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNav from '../components/BottomNav';
import ConversationsScreen from './ConversationsScreen';
import TasksScreen from './TasksScreen';
import RadarScreen from './RadarScreen';
import ProfileScreen from './ProfileScreen';

// ============================================================
// MainScreen — Shell with custom bottom nav + 4 tab screens
// ============================================================

const MainScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('conversations');

  const renderTab = () => {
    switch (activeTab) {
      case 'conversations':
        return <ConversationsScreen navigation={navigation} />;
      case 'tasks':
        return <TasksScreen navigation={navigation} />;
      case 'radar':
        return <RadarScreen navigation={navigation} />;
      case 'profile':
        return <ProfileScreen navigation={navigation} />;
      default:
        return <ConversationsScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenArea}>
        {renderTab()}
      </View>
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenArea: {
    flex: 1,
  },
});

export default MainScreen;
