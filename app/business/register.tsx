import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function BusinessRegistrationForm() {
  const [serviceName, setServiceName] = useState<string | undefined>('');
  const [serviceDescription, setServiceDescription] = useState<
    string | undefined
  >('');
  const [serviceTime, setServiceTime] = useState<string | undefined>('');
  const [location, setLocation] = useState<string | undefined>('');
  const [images, setImages] = useState<string[]>([]);

  const handleAddPhotos = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission denied', 'Please allow access to your gallery.');
      return;
    }

    const propmtForImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImages((prev) => {
          if (prev.length >= 4) return prev; // Prevent overfill (maximum 4 images)
          return [...prev, uri];
        });
      }
      Alert.alert('Add Image', 'Add one more image?', [
        {
          text: 'Add',
          // Call again to pick another image
          onPress: () => {
            propmtForImage();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    };
    // start the first image prompt
    propmtForImage();
  };

  const handleRegister = () => {
    // Registration logic would go here
    console.log('Register pressed', {
      serviceName,
      serviceDescription,
      serviceTime,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Business Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Service name"
            placeholderTextColor="#999"
            value={serviceName}
            onChangeText={setServiceName}
          />

          {/* Business Description Input */}
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Service description"
            placeholderTextColor="#999"
            value={serviceDescription}
            onChangeText={setServiceDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Service Time Input */}
          <TextInput
            style={styles.input}
            placeholder="Average wating time"
            placeholderTextColor="#999"
            value={serviceTime}
            onChangeText={setServiceTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Service location"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />

          {/* Photos Section */}
          <View style={styles.photoPreviewContainer}>
            {images.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <>
                <Text style={styles.addPhotosTitle}>Add photos</Text>
                <Text style={styles.addPhotosSubtitle}>
                  Showcase your business with photos
                </Text>
              </>
            )}
            {images.length < 4 && (
              <TouchableOpacity
                style={styles.addPhotosButton}
                onPress={handleAddPhotos}
              >
                <Text style={styles.addPhotosButtonText}>Add photos</Text>
              </TouchableOpacity>
            )}
            {images.length >= 4 && (
              <Text style={{ marginTop: 12, color: 'gray' }}>
                Maximum 4 images allowed
              </Text>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Add Service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    padding: 20,
    paddingTop: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#333333',
    fontFamily: 'System',
  },
  descriptionInput: {
    height: 120,
    paddingTop: 16,
  },

  photosTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    fontFamily: 'System',
  },

  addPhotosTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    fontFamily: 'System',
  },
  addPhotosSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'System',
  },
  addPhotosButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addPhotosButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'System',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: '#ff4444',
    width: 20,
    height: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  removeImageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  photoPreviewContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#dddddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: 200,
    backgroundColor: '#fafafa',
  },

  registerButton: {
    backgroundColor: '#0f4afa',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginVertical: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
