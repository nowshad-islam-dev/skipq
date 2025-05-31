import { Stack } from 'expo-router';

import { ModeProvider } from '../context/mode-context';

export default function RootLayout() {
  return (
    <ModeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="login/index" options={{ title: 'Login' }} />
        <Stack.Screen name="register/index" options={{ title: 'Register' }} />
        <Stack.Screen
          name="forgot-password/index"
          options={{ title: 'Forgot-Password' }}
        />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="business" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile/personal-info/index"
          options={{ title: 'Personal Information' }}
        />
        <Stack.Screen
          name="profile/settings/index"
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="profile/queue-history/index"
          options={{ title: 'Queue History' }}
        />
        <Stack.Screen
          name="details/index"
          options={{ title: 'Service Detail' }}
        />
      </Stack>
    </ModeProvider>
  );
}
