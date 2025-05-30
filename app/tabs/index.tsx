import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categories = ['ALL', 'Hospitals', 'Restaurants', 'Movies'];
const dummyServices = [
  {
    id: 1,
    name: 'Apollo Hospital',
    type: 'Hospitals',
    waitTime: '15 min',
    queueLength: 12,
    image:
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Pizza Inn',
    type: 'Restaurants',
    waitTime: '8 min',
    queueLength: 5,
    image:
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Cinema Star',
    type: 'Movies',
    waitTime: '25 min',
    queueLength: 18,
    image:
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: 'City General Hospital',
    type: 'Hospitals',
    waitTime: '30 min',
    queueLength: 25,
    image:
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    name: 'Burger Palace',
    type: 'Restaurants',
    waitTime: '12 min',
    queueLength: 8,
    image:
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export default function QueueScreen() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = useMemo(() => {
    let results = dummyServices;

    if (selectedCategory !== 'ALL') {
      results = results.filter((service) => service.type === selectedCategory);
    }

    if (query.trim() !== '') {
      const lowerQuery = query.toLocaleLowerCase();
      results = results.filter((service) =>
        service.name.toLowerCase().includes(lowerQuery)
      );
    }
    return results;
  }, [query, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <Text style={styles.title}>Browse Services</Text>
        <Text style={styles.subtitle}>Find and join queues near you</Text>
      </View>

      {/* --- Categories Filter --- */}
      <View style={styles.categoryList}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryTag,
                selectedCategory === cat && styles.categoryTagActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --- Search Bar --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          placeholder="Search services..."
          placeholderTextColor="#888"
          returnKeyType="search"
        />
      </View>

      {/* --- Services List --- */}
      <ScrollView
        style={styles.serviceList}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((service) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceType}>{service.type}</Text>
              </View>

              <View style={styles.waitBox}>
                <Text style={styles.waitLabel}>Wait Time</Text>
                <Text style={styles.waitValue}>{service.waitTime}</Text>
              </View>
            </View>
            <View>
              <Image
                resizeMode="cover"
                style={styles.serviceImage}
                source={{ uri: service.image }}
              />
            </View>

            <View style={styles.queueInfo}>
              <Text style={styles.queueText}>
                {service.queueLength} people in queue
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Queue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => router.push('/details')}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },

  // Categories
  categoryList: {
    paddingBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTagActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },

  // Service Cards
  serviceList: {
    flex: 1,
  },
  serviceImage: {
    width: 120,
    height: 90,
    borderRadius: 5,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  serviceType: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  waitBox: {
    backgroundColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'flex-end',
  },
  waitLabel: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600',
  },
  waitValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  queueInfo: {
    marginBottom: 16,
  },
  queueText: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#3B82F6',
    fontSize: 15,
    fontWeight: '600',
  },

  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: { flex: 1, fontSize: 16, color: '#333' },
});
