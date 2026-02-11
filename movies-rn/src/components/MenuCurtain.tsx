import { ReactElement, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Colors } from '@fennex-sand/constants';
import { useMovieStore } from '@fennex-sand/hooks';
import { useMenuPageAnimation } from '@/hooks/useAnimations';
import { Hamburger } from './Hamburger';
import { PerformanceMetrics } from './PerformanceMetrics';

export function MenuCurtain(): ReactElement {
  const menuOpened = useMovieStore(state => state.menuOpened);

  const { slideIn, slideOut, animatedStyle } = useMenuPageAnimation();

  useEffect(() => {
    if (menuOpened) {
      slideIn();
    } else {
      slideOut();
    }
  }, [menuOpened, slideIn, slideOut]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      console.log(`====> DEBUG onStart: `);
    })
    .onChange(event => {
      console.log(`====> DEBUG onChange: `);
    })
    .onEnd(() => {
      console.log(`====> DEBUG onEnd: `);
    });
  return (
    // <GestureHandlerRootView style={styles.container}>
    //   <GestureDetector gesture={panGesture}>
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.menuButton}>
        <Hamburger />
        <PerformanceMetrics style={styles.performanceMetrics} />
      </View>
    </Animated.View>
    //   </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.lightGreen,
    opacity: 0.96,
    height: '113%',
    width: '110%',
    position: 'absolute',
    top: -100,
    left: 0,
    zIndex: 30,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: Colors.light.black,
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    marginTop: 70,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  performanceMetrics: {
    marginTop: 20,
    marginHorizontal: 16,
  },
});
