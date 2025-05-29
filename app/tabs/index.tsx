import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const categories = ['All', 'Hospitals', 'Restaurants', 'Movies'];

const dummyServices = [
  { id: 1, name: 'Apollo Hospital', type: 'Hospitals' },
  { id: 2, name: 'Pizza Inn', type: 'Restaurants' },
  { id: 3, name: 'Cinema Star', type: 'Movies' },
];

export default function QueueScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered =
    selectedCategory === 'All'
      ? dummyServices
      : dummyServices.filter((service) => service.type === selectedCategory);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Browse Services
      </Text>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: selectedCategory === cat ? '#3B82F6' : '#E5E7EB',
              marginRight: 10,
            }}
          >
            <Text style={{ color: selectedCategory === cat ? '#fff' : '#000' }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services */}
      <ScrollView>
        {filtered.map((service) => (
          <View
            key={service.id}
            style={{
              backgroundColor: '#F3F4F6',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {service.name}
            </Text>
            <Text style={{ color: '#6B7280' }}>{service.type}</Text>

            <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#10B981',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff' }}>Join Queue</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#3B82F6',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff' }}>Show Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
