import { useThemeColor } from "heroui-native";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const background = useThemeColor("background");

  // Use custom colors if provided, otherwise use theme colors
  const backgroundColor = lightColor || darkColor || background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
