import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from 'expo-router';
import { StackActions } from '@react-navigation/native';

export default function FingerprintAuthScreen() {
  const navigation = useNavigation();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsBiometricEnrolled(enrolled);
      }
    })();
  }, []);

  const authenticateWithBiometrics = async () => {
    if (!isBiometricSupported) {
      Alert.alert(
        'Biometrics Not Supported',
        'Your device does not support fingerprint or face authentication.'
      );
      return;
    }

    if (!isBiometricEnrolled) {
      Alert.alert(
        'Biometrics Not Enrolled',
        'Please set up fingerprint or face ID in your device settings to use this feature.'
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access the app',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    });

    if (result.success) {
      navigation.dispatch(StackActions.replace('(tabs)'));
    } else if (result.error === 'user_cancel') {
      // User cancelled, do nothing or show a message
      Alert.alert('Authentication Cancelled', 'You cancelled the authentication.');
    } else {
      Alert.alert('Authentication Failed', 'Could not authenticate. Please try again.');
    }
  };

  useEffect(() => {
    // Automatically trigger authentication if supported and enrolled
    if (isBiometricSupported && isBiometricEnrolled) {
      authenticateWithBiometrics();
    }
  }, [isBiometricSupported, isBiometricEnrolled]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>PennieShares</Text>
      <TouchableOpacity style={styles.fingerprintButton} onPress={authenticateWithBiometrics}>
        <Image source={require('../assets/images/fingerprint-icon.png')} style={styles.fingerprintIcon} />
      </TouchableOpacity>
      <Text style={styles.promptText}>
        {isBiometricSupported && isBiometricEnrolled
          ? 'Tap to authenticate with fingerprint'
          : 'Biometric authentication not available or not set up.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark theme background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
  },
  fingerprintButton: {
    backgroundColor: '#333333',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fingerprintIcon: {
    width: 80,
    height: 80,
    tintColor: '#00e676', // Greenish tint for the icon
  },
  promptText: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
