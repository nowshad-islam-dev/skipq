import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function PersonalInfoScreen() {
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('0123456789');

  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSaveChanges = () => {
    if (!currentPassword) {
      Alert.alert('Required', 'Please enter your current password.');
      return;
    }

    if (changingPassword && newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'New passwords do not match.');
      return;
    }

    // TODO: Validate currentPassword with backend

    console.log({
      email,
      phone,
      currentPassword,
      ...(changingPassword && {
        newPassword,
        confirmPassword,
      }),
    });

    Alert.alert('Saved', 'Your information has been updated.');
    setCurrentPassword('');
    setChangingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit and save your data</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {!changingPassword ? (
        <TouchableOpacity onPress={() => setChangingPassword(true)}>
          <Text style={styles.changePasswordText}>Update Password</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}

      <Text style={styles.label}>
        To save your changes provide your current password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    marginVertical: 5,
  },
  changePasswordText: {
    color: '#fff',
    width: 140,
    borderRadius: 6.5,
    backgroundColor: '#007AFF',
    marginTop: 5,
    fontWeight: 'bold',
    paddingVertical: 8.5,
    paddingLeft: 4,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
});
