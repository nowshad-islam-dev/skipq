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
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type loginMethod = 'email' | 'phone';

export default function LoginScreen() {
  const [form, setForm] = useState({
    inputValue: '',
    password: '',
  });

  const [method, setMethod] = useState<loginMethod>('email');
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    // Basic validation
    if (!form.inputValue || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Handle registration logic here
    console.log('Login data:', form);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="person" size={32} color="#6366F1" />
              </View>
            </View>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subheading}>Sign in to SkipQ</Text>
          </View>

          {/* Method Toggle */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleWrapper}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  method === 'email' && styles.activeToggle,
                ]}
                onPress={() => setMethod('email')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.toggleText,
                    method === 'email' && styles.activeText,
                  ]}
                >
                  📧 Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  method === 'phone' && styles.activeToggle,
                ]}
                onPress={() => setMethod('phone')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.toggleText,
                    method === 'phone' && styles.activeText,
                  ]}
                >
                  📱 Phone
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {/* --- Phone Field | Email Field --- */}
            <View
              style={[
                styles.inputContainer,
                focusedField === 'email' && styles.inputFocused,
              ]}
            >
              <Ionicons
                name={method === 'email' ? 'mail-outline' : 'call-outline'}
                size={20}
                color={focusedField === 'email' ? '#6366F1' : '#9CA3AF'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={form.inputValue}
                onChangeText={(v) => updateField('inputValue', v)}
                placeholder={
                  method === 'email'
                    ? 'Enter your email address'
                    : 'Enter your phone number'
                }
                placeholderTextColor="#9CA3AF"
                keyboardType={
                  method === 'email' ? 'email-address' : 'phone-pad'
                }
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Password Field */}
            <View
              style={[
                styles.inputContainer,
                focusedField === 'password' && styles.inputFocused,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={focusedField === 'password' ? '#6366F1' : '#9CA3AF'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={form.password}
                onChangeText={(v) => updateField('password', v)}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Options */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#1637AE" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerElement}>
              <Text style={styles.footerText}>Register a new account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.otherLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerElement}>
              <Text style={styles.footerText}>Forgot password? </Text>
              <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                <Text style={styles.otherLink}>Click here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  toggleContainer: { marginBottom: 24, alignItems: 'center' },
  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  toggleText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  activeToggle: { backgroundColor: '#6366F1', shadowColor: '#6366F1' },
  activeText: { color: '#fff', fontWeight: '600' },

  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 16,
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#9CA3AF',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  footerElement: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
  },
  otherLink: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '600',
  },
});
