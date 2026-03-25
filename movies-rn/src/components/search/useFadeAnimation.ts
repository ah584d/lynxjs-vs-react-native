import { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedStyle, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

interface UseFadeAnimationProps {
  visible: boolean;
  duration?: number;
  delay?: number;
}

interface UseFadeAnimationReturn {
  animatedStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  isVisible: boolean;
}

export const useFadeAnimation = ({ visible, duration = 200, delay = 0 }: UseFadeAnimationProps): UseFadeAnimationReturn => {
  const opacity = useSharedValue(visible ? 1 : 0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      // Fade in: show immediately then animate
      setIsVisible(true);
      opacity.value = withDelay(delay, withTiming(1, { duration }));
    } else {
      // Fade out: animate first, then hide after delay + duration
      opacity.value = withDelay(delay, withTiming(0, { duration }));

      // Hide the component after animation completes
      const totalTime = delay + duration;
      setTimeout(() => {
        setIsVisible(false);
      }, totalTime);
    }
  }, [visible, duration, delay, opacity]);

  return {
    animatedStyle,
    isVisible,
  };
};
