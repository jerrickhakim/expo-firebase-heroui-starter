import * as Haptics from "expo-haptics";
import { useTheme } from "heroui-native";
import { Platform, ToastAndroid } from "react-native";
import { Notifier, NotifierComponents } from "react-native-notifier";

// Core notification types
type NotificationType = "error" | "success" | "warning" | "info";

// Impact haptic types for physical feedback
type ImpactHapticType = "light" | "medium" | "heavy" | "soft" | "rigid";

// Notification haptic types for semantic feedback
type NotificationHapticType = "success" | "warning" | "error";

// UI interaction haptic types
type UIHapticType = "selection";

// All haptic feedback types
type HapticFeedbackType = ImpactHapticType | NotificationHapticType | UIHapticType;

// Options for haptic feedback
type HapticOption = HapticFeedbackType | boolean | "auto";

interface NotificationConfig {
  title: string;
  description?: string;
  duration?: number;
  onPress?: () => void;
}

interface UseAlertReturn {
  showAlert: (type: NotificationType, title: string, description?: string, haptic?: HapticOption) => Promise<void>;

  // Simple haptic feedback methods
  haptic: {
    light: () => Promise<void>;
    medium: () => Promise<void>;
    heavy: () => Promise<void>;
    soft: () => Promise<void>;
    rigid: () => Promise<void>;
    success: () => Promise<void>;
    warning: () => Promise<void>;
    error: () => Promise<void>;
    selection: () => Promise<void>;
  };
}

/**
 * Professional notification and haptic feedback hook
 *
 * Features:
 * - Cross-platform notifications (iOS alerts, Android toasts)
 * - Comprehensive haptic feedback system
 * - Auto-haptic selection based on notification type
 * - Organized feedback categories (impact, notification, UI)
 * - Type-safe configuration
 *
 * @example
 * ```typescript
 * const { showAlert, haptic, notify } = useAlert();
 *
 * // Show notification with auto-haptic
 * await notify.success("Login successful!", true);
 *
 * // Custom notification
 * await showAlert("error", {
 *   title: "Login Failed",
 *   description: "Invalid credentials",
 *   onPress: () => console.log("Alert tapped")
 * }, "error");
 *
 * // Direct haptic feedback
 * await haptic.impact.medium();
 * await haptic.notification.success();
 * ```
 */
export default function useAlert(): UseAlertReturn {
  const { colors } = useTheme();

  /**
   * Shows a notification with haptic feedback
   * Supports your preferred usage: showAlert("error", "Title", "Description", "error")
   */
  const showAlert = async (
    type: NotificationType = "info",
    title: string = "",
    description?: string,
    haptic?: HapticOption
  ): Promise<void> => {
    if (haptic && typeof haptic === "string" && haptic in hapticMethods) {
      await hapticMethods[haptic as keyof typeof hapticMethods]?.();
    }

    // Show platform-specific notification
    if (Platform.OS === "ios") {
      Notifier.showNotification({
        title,
        description,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: type === "warning" ? "warn" : type,
          backgroundColor: getAlertColor(type),
        },
      });
    } else if (Platform.OS === "android") {
      const message = description ? `${title}: ${description}` : title;
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  /**
   * Gets the appropriate color for alert type
   */
  const getAlertColor = (type: NotificationType): string => {
    switch (type) {
      case "success":
        return colors.success || "#17C964";
      case "error":
        return colors.danger || "#F31260";
      case "warning":
        return colors.warning || "#F5A524";
      case "info":
      default:
        return colors.accent || "#006FEE";
    }
  };

  // Simple haptic feedback methods - direct Haptics calls
  const hapticMethods = {
    light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    soft: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
    rigid: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
    success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
    error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
    selection: () => Haptics.selectionAsync(),
  };

  return {
    showAlert,
    haptic: hapticMethods,
  };
}
