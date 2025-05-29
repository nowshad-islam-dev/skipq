import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyTokens = [
  {
    id: '1',
    serviceName: 'Green Hospital',
    tokenNumber: 17,
    peopleAhead: 3,
    estimatedWait: '10 min',
  },
  {
    id: '2',
    serviceName: 'Star Cinema',
    tokenNumber: 8,
    peopleAhead: 1,
    estimatedWait: '5 min',
  },
];

export default function NotificationScreen() {
  const [tokens, setTokens] = useState(dummyTokens);

  // Simulate real-time updates (every 10 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => ({
          ...token,
          peopleAhead: Math.max(0, token.peopleAhead - 1),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLeaveQueue = (id: string) => {
    Alert.alert('Leave Queue', 'Are you sure you want to leave this queue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Leave',
        style: 'destructive',
        onPress: () => {
          setTokens((prev) => prev.filter((token) => token.id !== id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Queues</Text>
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.serviceName}>{item.serviceName}</Text>
            <Text style={styles.token}>Token #: {item.tokenNumber}</Text>
            <Text style={styles.details}>People ahead: {item.peopleAhead}</Text>
            <Text style={styles.details}>
              Estimated wait: {item.estimatedWait}
            </Text>

            {/* --- Leave Button */}
            <TouchableOpacity
              style={styles.leaveButton}
              onPress={() => handleLeaveQueue(item.id)}
            >
              <Text style={styles.leaveButtonText}>Leave Queue</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No active tokens.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1e40af',
  },
  token: { fontSize: 14, marginBottom: 4 },
  details: { fontSize: 13, color: '#555' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  leaveButton: {
    marginTop: 10,
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    borderRadius: 6,
  },
  leaveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
