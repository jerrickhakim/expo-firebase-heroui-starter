import { ThemeView } from "@/components/theme-view";
import { Button, useTheme } from "heroui-native";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useAuthStore } from "@/stores/authStore";

export default function MyComponent() {
  const { toggleTheme, colors } = useTheme();
  const { user } = useAuthStore();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const credits = [
    {
      name: "Firebase",
      description: "Backend services and authentication",
      url: "https://firebase.google.com/",
    },
    {
      name: "HeroUI Native",
      description: "Beautiful React Native UI components",
      url: "https://github.com/heroui-inc/heroui-native",
    },
    {
      name: "Expo",
      description: "React Native development platform",
      url: "https://expo.dev/",
    },
    {
      name: "NativeWind",
      description: "Tailwind CSS for React Native",
      url: "https://www.nativewind.dev/",
    },
  ];

  return (
    <ThemeView className="flex-1 w-full">
      <ScrollView className="flex-1 p-4">
        <Text style={{ color: colors.foreground }} className="text-3xl font-bold mb-8">
          Let's Explore, {user?.displayName || "User"}
        </Text>

        <View className="flex-1 mb-8">
          <Text style={{ color: colors.foreground }} className="text-xl font-semibold mb-4">
            Built with ❤️ using:
          </Text>

          {credits.map((credit, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openLink(credit.url)}
              className="mb-4 p-4 rounded-lg border"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.surface1,
              }}
            >
              <Text style={{ color: colors.foreground }} className="text-lg font-semibold">
                {credit.name}
              </Text>
              <Text style={{ color: colors.mutedForeground }} className="text-sm mt-1">
                {credit.description}
              </Text>
              <Text style={{ color: colors.accent }} className="text-xs mt-2">
                Tap to visit →
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="p-4">
        <Button variant="primary" onPress={() => toggleTheme()} className="w-full">
          Toggle Theme
        </Button>
      </View>
    </ThemeView>
  );
}
