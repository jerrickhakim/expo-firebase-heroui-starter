import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Platform, useColorScheme } from "react-native";

export default function AuthLayout() {
  const [foreground, background] = useThemeColor(["foreground", "background"]);
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerTransparent: Platform.select({
          ios: true,
          android: false,
        }),
        headerBlurEffect: colorScheme === "dark" ? "dark" : "light",
        headerTintColor: foreground,
        headerStyle: {
          backgroundColor: Platform.select({
            ios: background,
            android: background,
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
          backgroundColor: background,
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
