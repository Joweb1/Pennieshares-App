
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Constants from 'expo-constants';

export default function AppLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ height: Constants.statusBarHeight, backgroundColor: '#046DDC' }} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
