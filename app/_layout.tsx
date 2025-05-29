import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login/index" options={{ title: 'Login' }} />
      <Stack.Screen name="register/index" options={{ title: 'Register' }} />
      <Stack.Screen
        name="forgot-password/index"
        options={{ title: 'Forgot-Password' }}
      />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}
