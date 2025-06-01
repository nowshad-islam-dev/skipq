import { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useMode } from '../context/mode-context';

const Home = () => {
  const router = useRouter();
  const { mode, loading } = useMode();

  useEffect(() => {
    if (loading) return; // Wait for mode to load

    if (mode === 'business') {
      router.replace('/business');
    } else {
      router.replace('/tabs');
    }
  }, [mode, loading, router]);
  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons name="account-group" size={80} color="#F9405F" />

      <Text style={styles.title}>Manage your queues</Text>
      <Text style={styles.subtitle}>
        Join virtual queues for various services and service providers.
      </Text>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: '#F9405F',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#F7F3F4',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
  },
  registerText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
