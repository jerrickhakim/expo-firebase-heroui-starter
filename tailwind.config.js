/** @type {import('tailwindcss').Config} */

import heroUINativePlugin from "heroui-native/tailwind-plugin";

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [heroUINativePlugin],
};
