import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function usePulseCardAnimation(scrollVelocity: number): Animated.Value {
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

export function useShimmerAnimation(isLoading: boolean): [Animated.AnimatedInterpolation<string | number>, Animated.AnimatedInterpolation<string | number>] {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isLoading) {
      // Start shimmer animation
      animationRef.current = Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      );
      animationRef.current.start();
    } else {
      // Stop animation and reset
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      shimmerAnimation.setValue(0);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [isLoading, shimmerAnimation]);

  const shimmerTranslateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200], // Move from left edge to right edge
  });

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return [shimmerTranslateX, shimmerOpacity];
}
