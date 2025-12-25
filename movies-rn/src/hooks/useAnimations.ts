import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function usePulseCardAnimation(scrollVelocity: number): Animated.Value {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const isScrolling = Math.abs(scrollVelocity) > 0.1;
  useEffect(() => {
    if (isScrolling) {
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
      animationRef.current = Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      );
      animationRef.current.start();
    } else {
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
    outputRange: [-200, 200],
  });

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return [shimmerTranslateX, shimmerOpacity];
}

export function useMenuAnimation() {
  const topBarRotation = useSharedValue(0);
  const bottomBarRotation = useSharedValue(0);
  const topBarTranslateY = useSharedValue(0);
  const bottomBarTranslateY = useSharedValue(0);
  const middleBarOpacity = useSharedValue(1);

  const toggleMenuAnimation = (targetState: boolean) => {
    const duration = 300;

    if (targetState) {
      // Transform to X shape - when menu opens
      topBarRotation.value = withTiming(45, { duration });
      bottomBarRotation.value = withTiming(-45, { duration });
      topBarTranslateY.value = withTiming(5, { duration });
      bottomBarTranslateY.value = withTiming(-5, { duration });
      middleBarOpacity.value = withTiming(0, { duration });
    } else {
      // Transform back to hamburger - when menu closes
      topBarRotation.value = withTiming(0, { duration });
      bottomBarRotation.value = withTiming(0, { duration });
      topBarTranslateY.value = withTiming(0, { duration });
      bottomBarTranslateY.value = withTiming(0, { duration });
      middleBarOpacity.value = withTiming(1, { duration });
    }
  };

  const topBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: topBarTranslateY.value }, { rotate: `${topBarRotation.value}deg` }],
  }));

  const bottomBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomBarTranslateY.value }, { rotate: `${bottomBarRotation.value}deg` }],
  }));

  const middleBarAnimatedStyle = useAnimatedStyle(() => ({
    opacity: middleBarOpacity.value,
  }));

  return {
    toggleMenuAnimation,
    topBarAnimatedStyle,
    bottomBarAnimatedStyle,
    middleBarAnimatedStyle,
  };
}

export function useMenuPageAnimation() {
  const translateX = useSharedValue(-100); // Start hidden (off-screen to the left)

  const slideIn = () => {
    translateX.value = withTiming(0, {
      duration: 900,
      easing: Easing.out(Easing.cubic), // Start fast, finish slowly
    });
  };

  const slideOut = () => {
    translateX.value = withTiming(-100, {
      duration: 500,
      easing: Easing.in(Easing.cubic), // Start slow, then accelerate
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  return {
    slideIn,
    slideOut,
    animatedStyle,
  };
}
