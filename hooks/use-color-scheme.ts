import { useEffect, useState } from "react";
import { Appearance, useColorScheme as useRNColorScheme } from "react-native";

export function useColorScheme() {
  const rnColorScheme = useRNColorScheme();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(rnColorScheme || "light");

  useEffect(() => {
    // Update state when RN color scheme changes
    if (rnColorScheme) {
      setColorScheme(rnColorScheme);
    }
  }, [rnColorScheme]);

  useEffect(() => {
    // Sync with document class for NativeWind
    if (typeof document !== "undefined") {
      if (colorScheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [colorScheme]);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);

    // For native platforms, update Appearance
    if (typeof document === "undefined") {
      Appearance.setColorScheme(newScheme);
    }
  };

  return { colorScheme, toggleColorScheme };
}
