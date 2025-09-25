import { ThemeView } from "@/components/theme-view";
import useAlert from "@/hooks/use-alert";
import { auth } from "@/integrations/firebase.client";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { TextField, useTheme } from "heroui-native";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

// Zod validation schema
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const emailInputRef = useRef<any>(null);
  const { showAlert, haptic } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, data.email);

      setIsSuccess(true);
      await showAlert("success", "Reset Email Sent!", "Check your email for password reset instructions.", "success");
    } catch (error: any) {
      const errorCodeLookup = {
        "auth/user-not-found": "No account found with this email address.",
        "auth/invalid-email": "Invalid email address.",
        "auth/too-many-requests": "Too many requests. Please try again later.",
      };

      const errorMessage = Object.keys(errorCodeLookup).includes(error.code)
        ? errorCodeLookup[error.code as keyof typeof errorCodeLookup]
        : "An error occurred while sending reset email.";

      await showAlert("error", "Reset Failed", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <ThemeView style={{ flex: 1 }} className="px-6 py-8">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center">
              <View className="gap-y-2 items-center">
                <Ionicons name="checkmark-circle-outline" size={64} color={colors.success} />
                <Text className="text-xl font-semibold text-center mt-4" style={{ color: colors.foreground }}>
                  Check Your Email
                </Text>
                <Text className="text-sm text-center opacity-70 mt-2" style={{ color: colors.foreground }}>
                  We've sent password reset instructions to your email address.
                </Text>

                <Pressable
                  onPress={async () => {
                    await haptic.light();
                    setIsSuccess(false);
                    setValue("email", "");
                  }}
                  className="mt-6 w-full py-4 rounded-md items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Text style={{ color: colors.accentForeground }}>Send Another Email</Text>
                </Pressable>
              </View>

              {/* Login Link */}
              <View className="mt-8 flex-row justify-center items-center">
                <Text className="text-sm opacity-70" style={{ color: colors.foreground }}>
                  Remember your password?{" "}
                </Text>
                <Link href="/auth/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-sm font-semibold" style={{ color: colors.accent }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={{ flex: 1 }} className="px-6 py-8">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center">
            {/* Forgot Password Form */}
            <View className="gap-y-2">
              {/* Email Input */}
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField className="w-full">
                      <TextField.Label>Email</TextField.Label>
                      <View style={{ position: "relative" }}>
                        <TextField.Input
                          ref={emailInputRef}
                          placeholder="Enter your email"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="send"
                          onSubmitEditing={handleSubmit(onSubmit)}
                          style={{ paddingLeft: 35 }}
                        />
                        <View style={{ position: "absolute", left: 10, top: 12 }}>
                          <Ionicons name="mail-outline" size={20} color={colors.foreground} style={{ opacity: 0.7 }} />
                        </View>
                      </View>
                      {errors.email && (
                        <TextField.Description style={{ color: colors.danger }}>{errors.email.message}</TextField.Description>
                      )}
                    </TextField>
                  )}
                />
              </View>

              {/* Reset Password Button */}
              <Pressable
                onPress={async () => {
                  await haptic.light();
                  handleSubmit(onSubmit)();
                }}
                className="mt-6 w-full py-4 rounded-md items-center justify-center"
                style={{ backgroundColor: colors.accent }}
                disabled={isLoading}
              >
                <Text style={{ color: colors.accentForeground }}>{isLoading ? "Sending..." : "Send Reset Email"}</Text>
              </Pressable>
            </View>

            {/* Login Link */}
            <View className="mt-8 flex-row justify-center items-center">
              <Text className="text-sm opacity-70" style={{ color: colors.foreground }}>
                Remember your password?{" "}
              </Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-semibold" style={{ color: colors.accent }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
}
