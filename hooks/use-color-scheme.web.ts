import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const rnColorScheme = useRNColorScheme();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(rnColorScheme || "light");

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    // Update state when RN color scheme changes
    if (rnColorScheme && hasHydrated) {
      setColorScheme(rnColorScheme);
    }
  }, [rnColorScheme, hasHydrated]);

  useEffect(() => {
    // Sync with document class for NativeWind
    if (hasHydrated && typeof document !== "undefined") {
      if (colorScheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [colorScheme, hasHydrated]);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
  };

  if (hasHydrated) {
    return { colorScheme, toggleColorScheme };
  }

  return { colorScheme: "light", toggleColorScheme };
}
