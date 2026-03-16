import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NotifierWrapper } from "react-native-notifier";
import "react-native-reanimated";
// gesture
import { useIsAuthenticated } from "@/stores/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

import "@/app/globals.css";

import AuthProvider, { useAuth } from "@/providers/AuthProvider";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "auth",
};

function AppContent() {
  const { loading } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!loading) {
      // Hide the splash screen when authentication is loaded
      SplashScreen.hideAsync();
    }
  }, [loading]);

  // Show nothing while authentication is loading
  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "transparent", // Let theme handle the background
        },
      }}
    >
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      {/* Expo Router includes all routes by default. Adding Stack.Protected creates exceptions for these screens. */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <HeroUINativeProvider>
          <AuthProvider>
            <GestureHandlerRootView>
              <NotifierWrapper>
                <AppContent />
              </NotifierWrapper>
            </GestureHandlerRootView>

            <StatusBar style="auto" />
          </AuthProvider>
        </HeroUINativeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
