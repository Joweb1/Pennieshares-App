import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import NetInfo from '@react-native-community/netinfo';

export function NetworkErrorScreen() {
  const handleTryAgain = () => {
    NetInfo.fetch(); // Re-fetch network status
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('../assets/images/no-internet.jpg')} // Changed to .jpg
        style={styles.image}
      />
      <ThemedText type="title" style={styles.title}>Network Unavailable</ThemedText>
      <ThemedText style={styles.message}>
        It looks like you're not connected to the internet.
        Please check your connection and try again.
      </ThemedText>
      <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
        <ThemedText type="link">Try Again</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F0F0', // Light gray background
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF', // Blue button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
});