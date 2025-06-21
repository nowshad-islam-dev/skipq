import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMode } from '../../context/mode-context';

export default function Home() {
  const { setModeState } = useMode();
  const router = useRouter();

  // Business state
  const [businessStatus, setBusinessStatus] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Business data
  const [businessData, setBusinessData] = useState({
    serviceName: 'Express Banking Services',
    description: 'Fast and reliable banking solutions',
    todayServed: 47,
    waitingTokens: 8,
    avgDispatchTime: '12 mins',
    totalTokensToday: 55,
    operatingHours: '9:00 AM - 5:00 PM',
    nextToken: 127,
    currentlyServing: 119,
  });

  const [upcomingTokens] = useState([
    { id: 120, name: 'Alex', estimatedTime: '5 mins', status: 'waiting' },
    { id: 121, name: 'Jordan', estimatedTime: '8 mins', status: 'waiting' },
    { id: 122, name: 'Chris', estimatedTime: '12 mins', status: 'waiting' },
    { id: 123, name: 'Taylor', estimatedTime: '15 mins', status: 'waiting' },
    { id: 124, name: 'Sam', estimatedTime: '18 mins', status: 'waiting' },
  ]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleModeSwitch = () => {
    return Alert.alert('Switch Mode', 'Switch to user mode?', [
      {
        text: 'OK',
        onPress: () => {
          setModeState('user');
          router.replace('/tabs');
        },
        style: 'default',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleBusinessToggle = () => {
    const newStatus = !businessStatus;
    setBusinessStatus(newStatus);
    Alert.alert(
      'Business Status',
      `Business is now ${newStatus ? 'OPEN' : 'CLOSED'}`,
      [{ text: 'OK' }]
    );
  };

  const navigateToQueueManagement = () => {
    router.push('/business/dashboard');
  };

  const handleDispatchNext = () => {
    Alert.alert(
      'Dispatch Token',
      `Dispatch token #${businessData.currentlyServing}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Dispatch',
          onPress: () => {
            setBusinessData((prev) => ({
              ...prev,
              currentlyServing: prev.currentlyServing + 1,
              todayServed: prev.todayServed + 1,
              waitingTokens: prev.waitingTokens - 1,
            }));
            Alert.alert('Success', 'Token dispatched successfully');
          },
        },
      ]
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeText}>Business Dashboard</Text>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          </View>
          <TouchableOpacity
            onPress={handleModeSwitch}
            style={styles.switchModeBtn}
          >
            <Text style={styles.switchModeText}>👤 User Mode</Text>
          </TouchableOpacity>
        </View>

        {/* Business Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.businessName}>
                {businessData.serviceName}
              </Text>
              <Text style={styles.businessDesc}>
                {businessData.description}
              </Text>
            </View>
            <View style={styles.statusToggle}>
              <Text
                style={[
                  styles.statusText,
                  { color: businessStatus ? '#4CAF50' : '#f44336' },
                ]}
              >
                {businessStatus ? 'OPEN' : 'CLOSED'}
              </Text>
              <Switch
                value={businessStatus}
                onValueChange={handleBusinessToggle}
                trackColor={{ false: '#f44336', true: '#4CAF50' }}
                thumbColor={businessStatus ? '#fff' : '#fff'}
              />
            </View>
          </View>
          <Text style={styles.operatingHours}>
            ⏰ {businessData.operatingHours}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{businessData.todayServed}</Text>
            <Text style={styles.statLabel}>Served Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{businessData.waitingTokens}</Text>
            <Text style={styles.statLabel}>Waiting</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {businessData.avgDispatchTime}
            </Text>
            <Text style={styles.statLabel}>Avg. Time</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {businessData.totalTokensToday}
            </Text>
            <Text style={styles.statLabel}>Total Tokens</Text>
          </View>
        </View>

        {/* Current Serving */}
        <View style={styles.currentServingCard}>
          <Text style={styles.cardTitle}>Currently Serving</Text>
          <View style={styles.currentTokenContainer}>
            <Text style={styles.currentTokenNumber}>
              #{businessData.currentlyServing}
            </Text>
            <TouchableOpacity
              style={styles.dispatchBtn}
              onPress={handleDispatchNext}
              disabled={!businessStatus}
            >
              <Text style={styles.dispatchBtnText}>Dispatch Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Tokens Preview */}
        <View style={styles.upcomingCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Upcoming Tokens</Text>
            <TouchableOpacity onPress={navigateToQueueManagement}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tokensScroll}
          >
            {upcomingTokens.slice(0, 5).map((token, index) => (
              <View key={token.id} style={styles.tokenPreview}>
                <Text style={styles.tokenId}>#{token.id}</Text>
                <Text style={styles.tokenName}>{token.name}</Text>
                <Text style={styles.tokenTime}>{token.estimatedTime}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={navigateToQueueManagement}
            >
              <Text style={styles.actionBtnText}>📋 Manage Queue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>📊 View Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>⚙️ Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>📢 Announcements</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
  switchModeBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  switchModeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  businessDesc: {
    fontSize: 14,
    color: '#666',
  },
  statusToggle: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  operatingHours: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  currentServingCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  currentTokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentTokenNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  dispatchBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dispatchBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  upcomingCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tokensScroll: {
    marginHorizontal: -8,
  },
  tokenPreview: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  tokenId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tokenName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tokenTime: {
    fontSize: 12,
    color: '#999',
  },
  quickActions: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
