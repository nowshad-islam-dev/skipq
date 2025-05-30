import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const mockHistory = [
  {
    id: '1',
    serviceName: 'Green Hospital',
    status: 'Completed',
    joinedAt: '2024-05-10 09:30',
  },
  {
    id: '2',
    serviceName: 'Sunrise Restaurant',
    status: 'Left',
    joinedAt: '2024-05-08 18:15',
  },
  {
    id: '3',
    serviceName: 'Star Cinema',
    status: 'Completed',
    joinedAt: '2024-05-05 20:00',
  },
];

export default function QueueHistoryScreen() {
  const [history, setHistory] = useState(mockHistory);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setHistory((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const deleteAll = () => {
    Alert.alert(
      'Delete all queue history',
      'Are you sure you want to delete all history?',
      [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setHistory([]);
            setSelectedIds([]);
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage your queue history</Text>

      {history.length > 0 && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={deleteSelected}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Delete Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAll} style={styles.actionButton}>
            <Text style={styles.actionText}>Delete All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelect(item.id)}
            style={[styles.card, isSelected(item.id) && styles.cardSelected]}
          >
            <Text style={styles.serviceName}>{item.serviceName}</Text>
            <Text style={styles.detail}>Status: {item.status}</Text>
            <Text style={styles.detail}>Joined: {item.joinedAt}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No queue history available.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#BA361C',
    padding: 10,
    borderRadius: 6,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f7ff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: '#d0e8ff',
    borderColor: '#007BFF',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#444',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
});
