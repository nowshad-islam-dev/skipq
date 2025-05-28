import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';

type UserType = 'normal' | 'queue';

export default function RegisterScreen() {
  const [userType, setUserType] = useState<UserType>('normal');

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    description: '',
    location: '',
  });

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Register</Text>

          {/* User Type Selector */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                userType === 'normal' && styles.activeToggle,
              ]}
              onPress={() => setUserType('normal')}
            >
              <Text
                style={[
                  styles.toggleText,
                  userType === 'normal' && styles.activeText,
                ]}
              >
                Normal User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                userType === 'queue' && styles.activeToggle,
              ]}
              onPress={() => setUserType('queue')}
            >
              <Text
                style={[
                  styles.toggleText,
                  userType === 'queue' && styles.activeText,
                ]}
              >
                Queue Maker
              </Text>
            </TouchableOpacity>
          </View>

          {/* Shared Fields */}
          {userType === 'normal' && (
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={form.username}
              onChangeText={(v) => updateField('username', v)}
            />
          )}

          {userType === 'queue' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Business Name"
                value={form.businessName}
                onChangeText={(v) => updateField('businessName', v)}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={form.description}
                onChangeText={(v) => updateField('description', v)}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={form.location}
                onChangeText={(v) => updateField('location', v)}
              />
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(v) => updateField('phone', v)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={(v) => updateField('password', v)}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  toggleText: {
    fontSize: 14,
    color: '#555',
  },
  activeToggle: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
