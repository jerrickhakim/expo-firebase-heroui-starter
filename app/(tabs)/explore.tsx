import { ThemeView } from "@/components/theme-view";
import { Button, useThemeColor } from "heroui-native";
import { Linking, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Appearance } from "react-native";

import { useAuthStore } from "@/stores/authStore";

export default function MyComponent() {
  const [foreground, border, surface, muted, accent] = useThemeColor([
    "foreground",
    "border",
    "surface",
    "muted",
    "accent",
  ]);
  const { user } = useAuthStore();
  const colorScheme = useColorScheme();

  const toggleTheme = () => {
    Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

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
        <Text style={{ color: foreground }} className="text-3xl font-bold mb-8">
          Let's Explore, {user?.displayName || "User"}
        </Text>

        <View className="flex-1 mb-8">
          <Text style={{ color: foreground }} className="text-xl font-semibold mb-4">
            Built with ❤️ using:
          </Text>

          {credits.map((credit, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openLink(credit.url)}
              className="mb-4 p-4 rounded-lg border"
              style={{
                borderColor: border,
                backgroundColor: surface,
              }}
            >
              <Text style={{ color: foreground }} className="text-lg font-semibold">
                {credit.name}
              </Text>
              <Text style={{ color: muted }} className="text-sm mt-1">
                {credit.description}
              </Text>
              <Text style={{ color: accent }} className="text-xs mt-2">
                Tap to visit →
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="p-4">
        <Button variant="primary" onPress={toggleTheme} className="w-full">
          Toggle Theme
        </Button>
      </View>
    </ThemeView>
  );
}
