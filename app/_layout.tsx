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
        <HeroUINativeProvider
          config={{
            colorScheme: "system",
            theme: {
              light: {
                colors: {
                  // Base colors
                  background: "#FFFFFF",
                  foreground: "#11181C",
                  default: "#FEFEFE",

                  // Semantic colors
                  surface: "#FFFFFF",
                  surfaceForeground: "#11181C",
                  panel: "#FFFFFF",

                  // Accent colors
                  accent: "#006FEE",
                  accentForeground: "#FFFFFF",

                  // Status colors
                  success: "#17C964",
                  successForeground: "#FFFFFF",
                  warning: "#F5A524",
                  warningForeground: "#000000",
                  danger: "#F31260",
                  dangerForeground: "#FFFFFF",

                  // Muted colors
                  muted: "#F4F4F5",
                  mutedForeground: "#71717A",

                  // Border and divider
                  border: "#E4E4E7",
                  divider: "#E4E4E7",

                  // Link
                  link: "#006FEE",

                  // Additional surfaces
                  surface1: "#FFFFFF",
                  surface2: "#F4F4F5",
                  surface3: "#E4E4E7",
                },
              },
              dark: {
                colors: {
                  // Base colors
                  background: "#000000",
                  foreground: "#ECEDEE",
                  default: "#121212", // Input non focused bg

                  // Semantic colors
                  surface: "#111111",
                  surfaceForeground: "#ECEDEE",
                  panel: "#111111",

                  // Accent colors
                  accent: "#006FEE",
                  accentForeground: "#FFFFFF",

                  // Status colors
                  success: "#17C964",
                  successForeground: "#FFFFFF",
                  warning: "#F5A524",
                  warningForeground: "#000000",
                  danger: "#F31260",
                  dangerForeground: "#FFFFFF",

                  // Muted colors
                  muted: "#191919",
                  mutedForeground: "#A1A1AA",

                  // Border and divider
                  border: "#27272A",
                  divider: "#27272A",

                  // Link
                  link: "#006FEE",

                  // Additional surfaces
                  surface1: "#080808",
                  surface2: "#191919",
                  surface3: "#27272A",
                },
              },
            },
          }}
        >
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
