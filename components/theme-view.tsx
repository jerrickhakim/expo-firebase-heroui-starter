import { useTheme } from "heroui-native";
import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemeViewProps = ViewProps & {
  className?: string;
  useSafeArea?: boolean;
};

export function ThemeView({ style, className, useSafeArea, ...otherProps }: ThemeViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ backgroundColor: colors.background, paddingTop: useSafeArea ? insets.top : 0 }, style]}
      className={className}
      {...otherProps}
    />
  );
}
