import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import { colorKit, useThemeColor } from "heroui-native";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const [accent, muted, surface, foreground] = useThemeColor(["accent", "muted", "surface", "foreground"]);
  const colorScheme = useColorScheme();

  // return (
  //   <NativeTabs>
  //     <NativeTabs.Trigger name="index">
  //       <Label>Home</Label>
  //       <Icon sf="house.fill" drawable="custom_android_drawable" />
  //     </NativeTabs.Trigger>
  //     <NativeTabs.Trigger name="explore">
  //       <Icon sf="gear" drawable="custom_settings_drawable" />
  //       <Label>Explore</Label>
  //     </NativeTabs.Trigger>
  //   </NativeTabs>
  // );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorKit.HEX(accent), // icon/text color when active
        tabBarInactiveTintColor: colorKit.HEX(muted), // icon/text color when inactive
        tabBarStyle: {
          backgroundColor: surface,
          borderTopColor: surface,
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
            backgroundColor: surface, // or any color you want
          },
          headerTintColor: foreground, // header text and back button color
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
            backgroundColor: surface, // or any color you want
          },
          headerTintColor: foreground, // header text and back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tabs>
  );
}
