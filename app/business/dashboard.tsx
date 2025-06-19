import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QueueManagement = () => {
  const [tokens, setTokens] = useState([
    {
      id: 123,
      name: 'Alex',
      avatar: require('../../assets/avatars/mock.webp'),
    },
    {
      id: 124,
      name: 'Jordan',
      avatar: require('../../assets/avatars/mock.webp'),
    },
    {
      id: 125,
      name: 'Chris',
      avatar: require('../../assets/avatars/mock.webp'),
    },
    {
      id: 126,
      name: 'Taylor',
      avatar: require('../../assets/avatars/mock.webp'),
    },
    {
      id: 127,
      name: 'Shawon',
      avatar: require('../../assets/avatars/mock.webp'),
    },
    { id: 128, name: 'Sam', avatar: require('../../assets/avatars/mock.webp') },
    { id: 129, name: 'Bob', avatar: require('../../assets/avatars/mock.webp') },
  ]);

  const [selectedToken, setSelectedToken] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('');

  const handleTokenPress = (token: any) => {
    setSelectedToken(selectedToken?.id === token.id ? null : token);
  };

  const handleDispatch = (tokenId: number) => {
    Alert.alert(
      'Dispatch Token',
      `Are you sure you want to dispatch token #${tokenId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Dispatch',
          onPress: () => {
            setTokens(tokens.filter((token) => token.id !== tokenId));
            setSelectedToken(null);
            Alert.alert('Success', 'Token dispatched successfully');
          },
        },
      ]
    );
  };

  const handleDelete = (tokenId: number) => {
    Alert.alert(
      'Delete Token',
      `Are you sure you want to delete token #${tokenId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTokens(tokens.filter((token) => token.id !== tokenId));
            setSelectedToken(null);
            Alert.alert('Success', 'Token deleted successfully');
          },
        },
      ]
    );
  };

  const handleUpdateInformation = () => {
    Alert.alert('Success', 'Service information updated successfully');
  };

  const tokenItemHeight = 80;
  const visibleTokenCount = 5;
  const scrollViewHeight = tokenItemHeight * visibleTokenCount;

  return (
    <SafeAreaView style={styles.container}>
      {/* Upcoming Tokens */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Tokens</Text>

        <FlatList
          data={tokens}
          keyExtractor={(item) => item.id.toString()}
          style={[styles.tokensScrollView, { height: scrollViewHeight }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          renderItem={({ item: token }) => (
            <View key={token.id} style={styles.tokenContainer}>
              <TouchableOpacity
                style={[
                  styles.tokenItem,
                  selectedToken?.id === token.id && styles.selectedTokenItem,
                ]}
                onPress={() => handleTokenPress(token)}
                activeOpacity={0.7}
              >
                <View style={styles.avatar}>
                  <Image source={token.avatar} style={styles.avatarImage} />
                </View>
                <View style={styles.tokenInfo}>
                  <Text style={styles.customerName}>
                    Customer: {token.name}
                  </Text>
                  <Text style={styles.tokenNumber}>Token #{token.id}</Text>
                </View>
              </TouchableOpacity>

              {selectedToken?.id === token.id && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.dispatchButton]}
                    onPress={() => handleDispatch(token.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionButtonText}>Dispatch</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(token.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />

        <View style={styles.tokenCounter}>
          <Text style={styles.counterText}>
            Showing {Math.min(visibleTokenCount, tokens.length)} of{' '}
            {tokens.length} tokens
          </Text>
        </View>
      </View>

      {/* Service Information */}
      <ScrollView style={styles.section}>
        <Text style={styles.sectionTitle}>Service Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Service Name</Text>
          <TextInput
            style={styles.textInput}
            value={serviceName}
            onChangeText={setServiceName}
            placeholder="Enter service name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Current Status</Text>
          <TextInput
            style={styles.textInput}
            value={currentStatus}
            onChangeText={setCurrentStatus}
            placeholder="Enter current status"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Estimated Wait Time</Text>
          <TextInput
            style={styles.textInput}
            value={estimatedWaitTime}
            onChangeText={setEstimatedWaitTime}
            placeholder="Enter estimated wait time"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateInformation}
          activeOpacity={0.8}
        >
          <Text style={styles.updateButtonText}>Update Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minHeight: 200,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  tokensScrollView: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  tokenContainer: {
    marginBottom: 4,
  },
  tokenCounter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    height: 80,
  },
  selectedTokenItem: {
    backgroundColor: '#f0f4ff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8e8e8',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  tokenInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tokenNumber: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dispatchButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#0f4afa',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QueueManagement;
