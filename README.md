# PennieShares App

## Overview

PennieShares is a mobile application built with Expo and React Native, designed to provide a seamless and secure user experience. It incorporates features like biometric authentication, real-time network status monitoring, and push notifications to keep users informed and connected.

## Features

*   **Biometric Authentication**: Securely log in using fingerprint or face ID for enhanced security and convenience.
*   **Network Status Detection**: Automatically detects internet connectivity and displays a user-friendly error screen when offline.
*   **Push Notifications**: Receives important updates and alerts through push notifications.
*   **Intuitive Navigation**: Utilizes Expo Router for efficient and clear navigation within the application.
*   **Theming**: Supports both light and dark modes, adapting to user preferences.

## Technologies Used

*   **Expo**: A framework and platform for universal React applications.
*   **React Native**: For building native mobile applications using JavaScript and React.
*   **TypeScript**: For type-safe and scalable code.
*   **Expo Router**: File-based routing for Expo and React Native.
*   **Expo Local Authentication**: For biometric authentication.
*   **@react-native-community/netinfo**: For network connectivity detection.
*   **Expo Notifications**: For handling push notifications.
*   **Expo Constants**: For accessing device and app constants.
*   **Expo Splash Screen**: For managing the app's splash screen.
*   **Expo Web Browser**: For opening web links within the app.
*   **React Native WebView**: For embedding web content.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js and npm (or yarn)
*   Expo CLI (`npm install -g expo-cli`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pennieshares-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the App

1.  **Start the development server:**
    ```bash
    npx expo start
    ```
    This will open a new tab in your browser with the Expo Dev Tools.

2.  **Open on a device/emulator:**
    *   Scan the QR code with the Expo Go app on your physical device.
    *   Run on an Android emulator (`a`) or iOS simulator (`i`) from the Expo Dev Tools.
    *   Build a development client (`npx eas build --profile development`) for more advanced features.

## Project Structure

The project follows a standard Expo/React Native structure with file-based routing:

```
pennieshares-app/
├── app/                  # Main application screens and navigation
│   ├── _layout.tsx       # Root layout for the app
│   ├── +not-found.tsx    # Not found screen for routing
│   ├── FingerprintAuthScreen.tsx # Biometric authentication screen
│   └── (tabs)/           # Tab-based navigation
│       ├── _layout.tsx   # Layout for the tab navigator
│       ├── explore.tsx   # Explore tab screen
│       └── index.tsx     # Home tab screen
├── assets/               # Static assets like images and fonts
├── components/           # Reusable UI components
│   ├── ui/               # UI-specific components
│   └── ...               # Other general components
├── constants/            # Application-wide constants (e.g., Colors)
├── hooks/                # Custom React hooks (e.g., useNetworkStatus, usePushNotifications)
├── plugins/              # Expo plugins
├── scripts/              # Utility scripts
└── ...                   # Other configuration files (package.json, app.json, tsconfig.json, etc.)
```

## Configuration

*   **`app.json`**: Contains the main configuration for the Expo application, including name, slug, version, icons, splash screen settings, and platform-specific configurations (Android, iOS, web).
*   **`package.json`**: Defines project metadata, scripts, and dependencies.
*   **`tsconfig.json`**: TypeScript configuration.
*   **`eslint.config.js`**: ESLint configuration for code linting.

## Available Scripts

In the project directory, you can run:

*   `npm start` or `npx expo start`: Starts the Expo development server.
*   `npm run android`: Opens the app in an Android emulator.
*   `npm run ios`: Opens the app in an iOS simulator.
*   `npm run web`: Opens the app in a web browser.
*   `npm run reset-project`: Resets the project by moving starter code and creating a blank `app` directory.
*   `npm run lint`: Runs ESLint to check for code quality issues.

## Contributing

Contributions are welcome! Please ensure your code adheres to the existing style and conventions.

## Community

Join the Expo community for support and discussions:

*   [Expo on GitHub](https://github.com/expo/expo)
*   [Discord community](https://chat.expo.dev)