# expo-firebase-heroui-starter

> 🚨 **Deprecation Notice (January 2, 2026)**: This repository is no longer maintained. Due to HeroUI updates and my preference for starting fresh with Expo, I recommend using the updated starter instead: **[expo-firebase-starter](https://github.com/jerrickhakim/expo-firebase-starter)**
> [Demo](https://expo-firebase-starter.vercel.app/)\*\*

TLDR: Update ENV for firebase config, `npm i` `npm run dev`

A modern React Native mobile application built with Firebase authentication, featuring a clean UI and seamless user experience across iOS, Android, and Web platforms.

## 🚀 Features

- **Firebase Authentication** - Complete user registration, login, and password management
- **Protected Routing** - Route-based authentication guards using Expo Router
- **Theme Support** - Dynamic light/dark theme switching with system preference detection
- **Modern UI** - Beautiful components using HeroUI Native with Tailwind CSS styling
- **Form Validation** - Robust form handling with React Hook Form and Zod validation
- **Haptic Feedback** - Enhanced user interaction with native haptic responses
- **Cross-Platform** - Runs natively on iOS, Android, and Web
- **State Management** - Efficient state handling with Zustand
- **TypeScript** - Fully typed for better development experience

## 🛠️ Tech Stack

### Core Framework

- **[React Native](https://reactnative.dev/)** - Cross-platform mobile development
- **[Expo](https://expo.dev/)** - Development platform and toolchain
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based navigation

### UI & Styling

- **[HeroUI Native](https://github.com/heroui-inc/heroui-native)** - Beautiful React Native UI components
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Authentication & Backend

- **[Firebase](https://firebase.google.com/)** - Authentication, Firestore, and Storage
- **[React Native AsyncStorage](https://github.com/react-native-async-storage/async-storage)** - Persistent auth state

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### State Management

- **[Zustand](https://zustand.surge.sh/)** - Lightweight state management

### Development Tools

- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[ESLint](https://eslint.org/)** - Code linting and formatting

## 📱 Project Structure

```
expo-firebase-heroui-starter/
├── app/                    # App screens (file-based routing)
│   ├── (tabs)/            # Bottom tab navigation
│   │   ├── index.tsx      # Home screen
│   │   └── explore.tsx    # Explore/Credits screen
│   ├── auth/              # Authentication screens
│   │   ├── login.tsx      # Login screen
│   │   ├── sign-up.tsx    # Registration screen
│   │   └── forgot-password.tsx
│   └── _layout.tsx        # Root layout with auth guards
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── integrations/          # External service integrations
│   └── firebase.client.ts # Firebase configuration
├── providers/             # React context providers
├── stores/                # Zustand state stores
└── constants/             # App constants and themes
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (macOS) or Android Studio (for emulators)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expo-firebase-heroui-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Create a `.env` file in the root directory:

   ```bash
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

The app implements a complete authentication system:

1. **Unauthenticated users** see login/registration screens
2. **Protected routes** automatically redirect to auth screens
3. **Authenticated users** access the main app with bottom tabs
4. **Persistent sessions** using Firebase Auth with AsyncStorage

## 🎨 Theming

- **Automatic theme detection** based on system preferences
- **Manual theme toggle** available in the Explore tab
- **Consistent color system** across light and dark modes
- **Custom theme configuration** in the root layout

## 📦 Key Dependencies

| Package           | Purpose                   | License    |
| ----------------- | ------------------------- | ---------- |
| `expo`            | Development platform      | MIT        |
| `react-native`    | Mobile framework          | MIT        |
| `firebase`        | Authentication & backend  | Apache 2.0 |
| `heroui-native`   | UI component library      | MIT        |
| `nativewind`      | Tailwind for React Native | MIT        |
| `react-hook-form` | Form management           | MIT        |
| `zustand`         | State management          | MIT        |
| `zod`             | Schema validation         | MIT        |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Credits

Built with love using these amazing technologies:

- **[Firebase](https://firebase.google.com/)** - Backend services and authentication
- **[HeroUI Native](https://github.com/heroui-inc/heroui-native)** - Beautiful React Native UI components
- **[Expo](https://expo.dev/)** - React Native development platform
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zustand](https://zustand.surge.sh/)** - Small, fast, and scalable state management
