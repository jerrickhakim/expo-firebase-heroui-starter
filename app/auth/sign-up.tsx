import { ThemeView } from "@/components/theme-view";
import useAlert from "@/hooks/use-alert";
import { signUp } from "@/integrations/firebase.client";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { TextField, useTheme } from "heroui-native";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

// Zod validation schema
const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);
  const { setUser } = useAuthStore();
  const { showAlert, haptic } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      const user = await signUp(data.email, data.password);

      setUser(user);

      await showAlert("success", "Success!", "Your account has been created successfully.", "success");

      router.replace("/(tabs)");
    } catch (error: any) {
      const errorCodeLookup = {
        "auth/email-already-in-use": "An account with this email already exists.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password is too weak.",
        "auth/too-many-requests": "Too many requests. Please try again later.",
      };

      const errorMessage = Object.keys(errorCodeLookup).includes(error.code)
        ? errorCodeLookup[error.code as keyof typeof errorCodeLookup]
        : "An error occurred during sign up.";

      await showAlert("error", "Sign Up Failed", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

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
            {/* Sign Up Form */}
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
                          placeholder="Enter your email"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          onSubmitEditing={() => passwordInputRef.current?.focus()}
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

              {/* Password Input */}
              <View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField className="w-full">
                      <TextField.Label>Password</TextField.Label>
                      <View style={{ position: "relative" }}>
                        <TextField.Input
                          ref={passwordInputRef}
                          placeholder="Enter your password"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showPassword}
                          returnKeyType="next"
                          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                          style={{ paddingLeft: 35, paddingRight: 45 }}
                        />
                        <View style={{ position: "absolute", left: 10, top: 12 }}>
                          <Ionicons name="lock-closed-outline" size={20} color={colors.foreground} style={{ opacity: 0.7 }} />
                        </View>
                        <TouchableOpacity
                          onPress={async () => {
                            await haptic.selection();
                            setShowPassword(!showPassword);
                          }}
                          style={{ position: "absolute", right: 10, top: 12 }}
                        >
                          <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={colors.foreground}
                            style={{ opacity: 0.7 }}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.password && (
                        <TextField.Description style={{ color: colors.danger }}>{errors.password.message}</TextField.Description>
                      )}
                    </TextField>
                  )}
                />
              </View>

              {/* Confirm Password Input */}
              <View>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField className="w-full">
                      <TextField.Label>Confirm Password</TextField.Label>
                      <View style={{ position: "relative" }}>
                        <TextField.Input
                          ref={confirmPasswordInputRef}
                          placeholder="Confirm your password"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showConfirmPassword}
                          returnKeyType="done"
                          onSubmitEditing={handleSubmit(onSubmit)}
                          style={{ paddingLeft: 35, paddingRight: 45 }}
                        />
                        <View style={{ position: "absolute", left: 10, top: 12 }}>
                          <Ionicons name="lock-closed-outline" size={20} color={colors.foreground} style={{ opacity: 0.7 }} />
                        </View>
                        <TouchableOpacity
                          onPress={async () => {
                            await haptic.selection();
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                          style={{ position: "absolute", right: 10, top: 12 }}
                        >
                          <Ionicons
                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={colors.foreground}
                            style={{ opacity: 0.7 }}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.confirmPassword && (
                        <TextField.Description style={{ color: colors.danger }}>{errors.confirmPassword.message}</TextField.Description>
                      )}
                    </TextField>
                  )}
                />
              </View>

              {/* Sign Up Button */}
              <Pressable
                onPress={async () => {
                  await haptic.light();
                  handleSubmit(onSubmit)();
                }}
                className="mt-6 w-full py-4 rounded-md items-center justify-center"
                style={{ backgroundColor: colors.accent }}
                disabled={isLoading}
              >
                <Text style={{ color: colors.accentForeground }}>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
              </Pressable>
            </View>

            {/* Login Link */}
            <View className="mt-8 flex-row justify-center items-center">
              <Text className="text-sm opacity-70" style={{ color: colors.foreground }}>
                Already have an account?{" "}
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
