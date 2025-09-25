import { ThemeView } from "@/components/theme-view";
import { Button, useTheme } from "heroui-native";
import { Text } from "react-native";

import { logout } from "@/integrations/firebase.client";
import { useAuthStore } from "@/stores/authStore";

export default function MyComponent() {
  const { toggleTheme, colors } = useTheme();
  const { user } = useAuthStore();

  return (
    <ThemeView className="flex-1 items-center justify-between w-full p-4" useSafeArea={false}>
      <Text style={{ color: colors.foreground }} className="text-3xl font-bold mt-10">
        Welcome, {user?.email}
      </Text>

      <Button variant="danger" onPress={() => logout()} className="w-full">
        Logout
      </Button>
    </ThemeView>
  );
}
