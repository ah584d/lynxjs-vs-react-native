import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useCardAnimation(scrollVelocity: number): Animated.Value {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const isScrolling = Math.abs(scrollVelocity) > 0.1;
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
