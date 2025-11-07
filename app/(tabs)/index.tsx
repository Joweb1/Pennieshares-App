import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, useColorScheme, Animated } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from 'expo-router';
import { StackActions } from '@react-navigation/native';

export default function IndexScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme(); // 'light' or 'dark'
  const isDark = colorScheme === 'dark';
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current; // For fingerprint animation

  useEffect(() => {
    // Animation for fingerprint icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

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
      disableDeviceFallback: false,
    });

    if (result.success) {
      // Navigate to webapp with incognito disabled
      navigation.dispatch(StackActions.replace('webapp', { incognitoEnabled: false }));
    } else if (result.error === 'user_cancel') {
      Alert.alert('Authentication Cancelled', 'You cancelled the authentication.');
    } else {
      Alert.alert('Authentication Failed', 'Could not authenticate. Please try again.');
    }
  };

  const handleOtherLogin = (incognito: boolean) => {
    // Navigate to webapp with incognito enabled/disabled based on button
    navigation.dispatch(StackActions.replace('webapp', { incognitoEnabled: incognito }));
  };

  const styles = getThemedStyles(colorScheme);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../assets/images/icon.png')} style={styles.logoIcon} resizeMode="contain" />
        </View>

        <Text style={styles.appName}>Pennieshares</Text>

        <Animated.Image
          source={require('../../assets/images/fingerprint-icon.png')}
          style={[styles.fingerprintIcon, { transform: [{ scale: pulseAnim }] }]}
          resizeMode="contain"
          tintColor={isDark ? '#046DDC' : '#07008D'}
        />

        <Text style={styles.instruction}>
          Click to log in with Fingerprint
        </Text>

        <TouchableOpacity style={styles.verifyButton} onPress={authenticateWithBiometrics}>
          <Text style={styles.verifyButtonText}>Verify Fingerprint</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerLinks}>
        <TouchableOpacity onPress={() => handleOtherLogin(true)}>
          <Text style={styles.link}>Switch Account</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity onPress={() => handleOtherLogin(true)}>
          <Text style={styles.link}>Login with Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getThemedStyles = (colorScheme: 'light' | 'dark' | null | undefined) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    pageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: 480,
      padding: 14,
      backgroundColor: isDark ? '#111827' : '#ffffff',
    },
    contentContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    avatarContainer: {
      width: 66,
      height: 66,
      borderRadius: 48,
      backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    logoIcon: {
      width: 96,
      height: 96,
    },
    appName: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 48,
      color: isDark ? '#046DDC' : '#07008D',
    },
    fingerprintIcon: {
      width: 96,
      height: 96,
      marginBottom: 20,
    },
    instruction: {
      marginBottom: 24,
      textAlign: 'center',
      color: isDark ? '#f9fafb' : '#07008D',
    },
    verifyButton: {
      paddingVertical: 12,
      paddingHorizontal: 48,
      borderRadius: 9999,
      elevation: 8,
      backgroundColor: isDark ? '#046DDC' : '#07008D',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    verifyButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    footerLinks: {
      width: '100%',
      textAlign: 'center',
      paddingBottom: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      flexWrap: 'wrap',
      fontSize: 14,
    },
    link: {
      fontWeight: '500',
      textDecorationLine: 'none',
      color: isDark ? '#046DDC' : '#07008D',
    },
    divider: {
      color: '#4b5563',
    },
  });
};