import { ThemeView } from "@/components/theme-view";
import useAlert from "@/hooks/use-alert";
import { login } from "@/integrations/firebase.client";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { TextField, useTheme } from "heroui-native";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const { setUser } = useAuthStore();
  const { showAlert, haptic } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const user = await login(data.email, data.password);

      setUser(user);

      await showAlert("success", "Success!", "You have been logged in successfully.", "success");

      router.replace("/(tabs)");
    } catch (error: any) {
      const errorCodeLookup = {
        "auth/user-not-found": "No account found with this email address.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-email": "Invalid email address.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/too-many-requests": "Too many failed attempts. Please try again later.",
      };

      const errorMessage = Object.keys(errorCodeLookup).includes(error.code)
        ? errorCodeLookup[error.code as keyof typeof errorCodeLookup]
        : "An error occurred during login.";

      await showAlert("error", "Login Failed", errorMessage, "error");
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
            {/* Login Form */}
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
                          onChangeText={(text) => {
                            onChange(text);
                          }}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          onSubmitEditing={() => passwordInputRef.current?.focus()}
                          style={{ paddingLeft: 35 }}
                          onEndEditing={() => {}}
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
                          onChangeText={(text) => {
                            onChange(text);
                          }}
                          onBlur={onBlur}
                          secureTextEntry={!showPassword}
                          returnKeyType="done"
                          onSubmitEditing={handleSubmit(onSubmit)}
                          style={{ paddingLeft: 35, paddingRight: 45 }}
                          onEndEditing={() => Keyboard.dismiss()}
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

              {/* Forgot Password Link */}
              <View className="items-end">
                <Link href="/auth/forgot-password" asChild>
                  <TouchableOpacity>
                    <Text className="text-sm font-medium" style={{ color: colors.accent }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/* Login Button */}
              {/* <Button
                animationConfig={{
                  scale: { config: { duration: 0, easing: Easing.linear } },
                  highlight: { config: { duration: 0, easing: Easing.linear } },
                }}
                onPress={handleSubmit(onSubmit)}
                variant="primary"
                isDisabled={isLoading}
                className="mt-6 w-full py-4"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button> */}

              <Pressable
                onPress={async () => {
                  await haptic.light();
                  handleSubmit(onSubmit)();
                }}
                className="mt-6 w-full py-4 rounded-md items-center justify-center"
                style={{ backgroundColor: colors.accent }}
                disabled={isLoading}
              >
                <Text style={{ color: colors.accentForeground }}>{isLoading ? "Signing In..." : "Sign In"}</Text>
              </Pressable>
            </View>

            {/* Sign Up Link */}
            <View className="mt-8 flex-row justify-center items-center">
              <Text className="text-sm opacity-70" style={{ color: colors.foreground }}>
                Don't have an account?{" "}
              </Text>
              <Link href="/auth/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-semibold" style={{ color: colors.accent }}>
                    Sign Up
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
