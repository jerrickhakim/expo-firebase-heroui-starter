import { Stack } from "expo-router";
import { useTheme } from "heroui-native";
import { Platform } from "react-native";

export default function AuthLayout() {
  const { colors, theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerTransparent: Platform.select({
          ios: true,
          android: false,
        }),
        headerBlurEffect: theme === "dark" ? "dark" : "light",
        headerTintColor: colors.foreground,
        headerStyle: {
          backgroundColor: Platform.select({
            ios: colors.background,
            android: colors.background,
          }),
        },
        // headerTitleStyle: {
        //   fontFamily: "Inter_600SemiBold",
        // },
        // headerRight: _renderThemeToggle,
        headerBackButtonDisplayMode: "minimal",
        gestureEnabled: true,
        gestureDirection: "horizontal",
        fullScreenGestureEnabled: true,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, headerTitle: "Welcome" }} />
      <Stack.Screen name="login" options={{ headerShown: true, headerTitle: "Login" }} />
      <Stack.Screen name="sign-up" options={{ headerShown: true, headerTitle: "Sign Up" }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: true, headerTitle: "Forgot Password" }} />
      <Stack.Screen name="action" options={{ headerShown: false, headerTitle: "Action" }} />
    </Stack>
  );
}
