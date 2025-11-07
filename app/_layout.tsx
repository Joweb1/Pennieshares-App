import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { NetworkErrorScreen } from '../components/NetworkErrorScreen';
import { usePushNotifications } from '../hooks/usePushNotifications';

export default function AppLayout() {
  const isConnected = useNetworkStatus();
  usePushNotifications(); // Initialize push notifications

  if (isConnected === false) {
    return <NetworkErrorScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ height: Constants.statusBarHeight, backgroundColor: '#00005c' }} />
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
