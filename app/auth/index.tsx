import { ThemeView } from "@/components/theme-view";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Card, useTheme } from "heroui-native";
import { FC, memo } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeInUp,
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedView = Animated.createAnimatedComponent(View);

type OnboardingCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const onboardingCards: OnboardingCard[] = [
  {
    id: "1",
    title: "Welcome to RockoAI",
    description: "Your AI-powered companion for productivity and creativity",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80",
  },
  {
    id: "2",
    title: "Smart Conversations",
    description: "Engage in meaningful conversations with advanced AI technology",
    image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80",
  },
  {
    id: "3",
    title: "Creative Assistant",
    description: "Get help with writing, brainstorming, and creative projects",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80",
  },
  {
    id: "4",
    title: "Learn & Grow",
    description: "Expand your knowledge with AI-powered learning tools",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80",
  },
];

type OnboardingCardProps = {
  card: OnboardingCard;
  index: number;
  itemWidth: number;
  allItemsWidth: number;
  scrollOffsetX: SharedValue<number>;
};

const OnboardingCard: FC<OnboardingCardProps> = ({ card, index, itemWidth, allItemsWidth, scrollOffsetX }) => {
  const { width: screenWidth } = useWindowDimensions();

  const shift = (allItemsWidth - screenWidth) / 2;
  const initialLeft = index * itemWidth - shift;

  const rContainerStyle = useAnimatedStyle(() => {
    const normalizedOffset = ((scrollOffsetX.value % allItemsWidth) + allItemsWidth) % allItemsWidth;
    const left = ((initialLeft - normalizedOffset) % allItemsWidth) + shift;

    return {
      left,
    };
  });

  return (
    <AnimatedView className="absolute p-4" style={[{ width: itemWidth }, rContainerStyle]}>
      <Card className="flex-1 gap-2 p-0 bg-transparent border-0 rounded-xl overflow-hidden">
        <Card.Body className="flex-1 p-0 m-0">
          <Image
            source={{ uri: card.image }}
            style={{ width: itemWidth, height: 400, objectFit: "cover" }}
            className="w-full h-full"
            contentFit="cover"
            transition={200}
          />
          <View className="absolute inset-0 bg-black/40" />
          <View className="absolute bottom-0 left-0 right-0 p-6">
            <Text className="text-white text-2xl font-bold mb-2">{card.title}</Text>
            <Text className="text-white/90 text-base leading-6">{card.description}</Text>
          </View>
        </Card.Body>
      </Card>
    </AnimatedView>
  );
};

const MarqueeOnboarding: FC = () => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const scrollOffsetX = useSharedValue(0);
  const scrollSpeed = useSharedValue(40);

  const itemWidth = width * 0.85;
  const allItemsWidth = onboardingCards.length * itemWidth;

  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo?.timeSincePreviousFrame ?? 0) / 1000;
    scrollOffsetX.value += scrollSpeed.value * deltaSeconds;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scrollOffsetX.value -= event.changeX;
    })
    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(40, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });
    });

  const handleGetStarted = () => {
    router.push("/auth/sign-up");
  };

  return (
    <ThemeView style={{ flex: 1 }}>
      <View className="flex-1">
        {/* Header */}
        <View className="pb-6 px-6" style={{ paddingTop: Math.max(insets.top, 12) + 24 }}>
          <Text className="text-2xl font-bold text-center" style={{ color: colors.foreground }}>
            Expo, Firebase, & HeroUI Native
          </Text>
        </View>

        {/* Carousel */}
        <View className="flex-1">
          <GestureDetector gesture={gesture}>
            <AnimatedView entering={FadeInUp.delay(300).springify()} className="flex-1 space-x-4 flex-row items-center overflow-hidden">
              {onboardingCards.map((card, index) => (
                <OnboardingCard
                  key={card.id}
                  card={card}
                  index={index}
                  itemWidth={itemWidth}
                  allItemsWidth={allItemsWidth}
                  scrollOffsetX={scrollOffsetX}
                />
              ))}
            </AnimatedView>
          </GestureDetector>
        </View>

        {/* Bottom Actions */}
        <View className="px-6 pt-6" style={{ paddingBottom: Math.max(insets.bottom, 12) + 12 }}>
          <View className="gap-y-5">
            <Pressable
              onPress={handleGetStarted}
              className="w-full py-4 rounded-xl items-center justify-center"
              style={{ backgroundColor: colors.accent }}
            >
              <Text className="text-lg font-semibold" style={{ color: colors.accentForeground }}>
                Get Started
              </Text>
            </Pressable>

            <View className="flex-row justify-center items-center gap-x-1">
              <Text className="text-sm opacity-70" style={{ color: colors.foreground }}>
                Already have an account?
              </Text>
              <Link href="/auth/login" asChild>
                <Pressable>
                  <Text className="text-sm font-semibold" style={{ color: colors.accent }}>
                    Sign In
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ThemeView>
  );
};

export default memo(MarqueeOnboarding);
