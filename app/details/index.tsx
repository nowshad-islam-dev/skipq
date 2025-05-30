import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const QueueDetailsScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample data - replace with actual data
  const businessData = {
    name: 'The Coffee Bean',
    description:
      'Premium artisanal coffee shop serving locally roasted beans with a cozy atmosphere. We specialize in specialty drinks, fresh pastries, and provide a perfect workspace for remote workers and students.',
    location: '123 Main Street, Downtown District, Coffee City',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop',
    ],
    queueInfo: {
      waitTime: '15-20 minutes',
      peopleInQueue: 12,
      closingTime: '6:00 PM',
    },
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  };

  const renderImageIndicators = () => {
    return (
      <View style={styles.indicatorContainer}>
        {businessData.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentImageIndex
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.imageScrollView}
          >
            {businessData.images.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.businessImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {renderImageIndicators()}
          <View style={styles.businessNameOverlay}>
            <Text style={styles.businessName}>{businessData.name}</Text>
          </View>
        </View>

        {/* Business Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{businessData.description}</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <View style={styles.locationHeader}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.sectionTitle}>Location</Text>
          </View>
          <Text style={styles.locationText}>{businessData.location}</Text>
        </View>

        {/* Queue Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Queue Status</Text>

          <View style={styles.queueItem}>
            <View style={styles.queueIconContainer}>
              <Ionicons name="time-outline" size={24} color="#666" />
            </View>
            <View style={styles.queueTextContainer}>
              <Text style={styles.queueValue}>
                {businessData.queueInfo.waitTime}
              </Text>
              <Text style={styles.queueLabel}>Estimated wait time</Text>
            </View>
          </View>

          <View style={styles.queueItem}>
            <View style={styles.queueIconContainer}>
              <Ionicons name="people-outline" size={24} color="#666" />
            </View>
            <View style={styles.queueTextContainer}>
              <Text style={styles.queueValue}>
                {businessData.queueInfo.peopleInQueue}
              </Text>
              <Text style={styles.queueLabel}>People in queue</Text>
            </View>
          </View>

          <View style={styles.queueItem}>
            <View style={styles.queueIconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#666" />
            </View>
            <View style={styles.queueTextContainer}>
              <Text style={styles.queueValue}>
                {businessData.queueInfo.closingTime}
              </Text>
              <Text style={styles.queueLabel}>Queue closes at</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Join Queue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Queue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    position: 'relative',
    height: 280,
  },
  imageScrollView: {
    height: 280,
  },
  businessImage: {
    width: width,
    height: 280,
  },
  businessNameOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  businessName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginLeft: 25,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  queueIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  queueTextContainer: {
    flex: 1,
  },
  queueValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  queueLabel: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  joinButton: {
    backgroundColor: '#ff4757',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default QueueDetailsScreen;
