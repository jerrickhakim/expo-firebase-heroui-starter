import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { colorKit, useTheme } from "heroui-native";

export default function TabLayout() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorKit.HEX(colors.accent), // icon/text color when active
        tabBarInactiveTintColor: colorKit.HEX(colors.mutedForeground), // icon/text color when inactive
        tabBarStyle: {
          backgroundColor: colors.surface1,
          borderTopColor: colors.surface1,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.surface1, // or any color you want
          },
          headerTintColor: colors.foreground, // header text and back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.surface1, // or any color you want
          },
          headerTintColor: colors.foreground, // header text and back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tabs>
  );
}
