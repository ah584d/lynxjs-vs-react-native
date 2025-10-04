import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useCardAnimation(scrollVelocity: number) {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  // Check if scrolling is happening
  const isScrolling = Math.abs(scrollVelocity) > 0.1; // Consider scrolling if velocity > 0.1   // Animate scale based on scroll state
  useEffect(() => {
    if (isScrolling) {
      // Start pulsing animation while scrolling
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 0.9,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1.0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    } else {
      // Stop animation and return to 100% when not scrolling
      Animated.timing(scaleAnimation, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isScrolling, scaleAnimation]);

  return scaleAnimation;
}
