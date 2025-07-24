
import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ActivityIndicator, View, BackHandler, ToastAndroid } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const backPressCount = useRef(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount.current < 1) {
        backPressCount.current += 1;
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);
        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://penniepoint.com/login' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
