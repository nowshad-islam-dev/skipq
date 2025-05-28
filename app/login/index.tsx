import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

type LoginMethod = 'email' | 'phone';

export default function LoginScreen() {
  const [method, setMethod] = useState<LoginMethod>('email');
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Login</Text>

          {/* --- Method Toggle --- */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                method === 'email' && styles.activeToggle,
              ]}
              onPress={() => setMethod('email')}
            >
              <Text
                style={[
                  styles.toggleText,
                  method === 'email' && styles.activeText,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                method === 'phone' && styles.activeToggle,
              ]}
              onPress={() => setMethod('phone')}
            >
              <Text
                style={[
                  styles.toggleText,
                  method === 'phone' && styles.activeText,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
          </View>

          {/* --- Form Input Field --- */}

          <TextInput
            style={styles.input}
            placeholder={method === 'email' ? 'Email' : 'Phone Number'}
            keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
            value={inputValue}
            onChangeText={setInputValue}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* --- Links to other views --- */}

          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Create a new account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => router.push('/forgot-password')}
          >
            <Text style={styles.linkText}>Forgot Password?</Text>
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
    marginBottom: 16,
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
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
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
  link: {
    marginBottom: 8,
  },
  linkText: {
    color: '#3B82F6',
    fontSize: 14,
    textAlign: 'right',
  },
});
