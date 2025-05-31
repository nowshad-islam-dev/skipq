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
  Dimensions,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

type ResetMethod = 'email' | 'phone';

export default function ForgotPassword() {
  const [method, setMethod] = useState<ResetMethod>('email');
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(false);
  const router = useRouter();

  const handleSendReset = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', `Please enter your ${method}`);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleTryAgain = () => {
    setIsSuccess(false);
    setInputValue('');
  };

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✅</Text>
            </View>
            <Text style={styles.successHeading}>
              Check Your {method === 'email' ? 'Email' : 'Phone'}
            </Text>
            <Text style={styles.successMessage}>
              We&apos;ve sent a password reset{' '}
              {method === 'email' ? 'link' : 'code'} to:
            </Text>
            <Text style={styles.successContact}>{inputValue}</Text>
            <Text style={styles.successSubtext}>
              {method === 'email'
                ? "Click the link in the email to reset your password. If you don't see it, check your spam folder."
                : 'Enter the verification code we sent to your phone to reset your password.'}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGoBack}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleTryAgain}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>
                Try Different {method === 'email' ? 'Email' : 'Phone'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Content */}
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <View style={styles.lockIcon}>
                <Text style={styles.lockText}>🔒</Text>
              </View>
            </View>

            <Text style={styles.heading}>Forgot Password?</Text>
            <Text style={styles.subheading}>
              No worries! Enter your {method} and we&apos;ll send you a reset{' '}
              {method === 'email' ? 'link' : 'code'}.
            </Text>

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

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {method === 'email' ? 'Email Address' : 'Phone Number'}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={
                    method === 'email'
                      ? 'Enter your email address'
                      : 'Enter your phone number'
                  }
                  placeholderTextColor="#9CA3AF"
                  value={inputValue}
                  onChangeText={setInputValue}
                  keyboardType={
                    method === 'email' ? 'email-address' : 'phone-pad'
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSendReset}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {isLoading
                    ? 'Sending...'
                    : `Send Reset ${method === 'email' ? 'Link' : 'Code'}`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>Remember your password? </Text>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.helpLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Security Note */}
            <View style={styles.securityNote}>
              <Text style={styles.securityIcon}>🛡️</Text>
              <Text style={styles.securityText}>
                For your security, reset links expire in 15 minutes and can only
                be used once.
              </Text>
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
    backgroundColor: '#F8FAFC',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height - 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  lockIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lockText: {
    fontSize: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  toggleContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
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
  activeToggle: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  secondaryButtonText: {
    color: '#6366F1',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  helpLink: {
    color: '#6366F1',
    fontWeight: '600',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  securityIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
  },
  // Success screen styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successIconContainer: {
    marginBottom: 32,
  },
  successIcon: {
    fontSize: 64,
  },
  successHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  successContact: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
    textAlign: 'center',
    marginBottom: 24,
  },
  successSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
});
