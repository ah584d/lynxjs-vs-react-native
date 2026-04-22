import { ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useMovieStore } from '@fennex-sand/hooks';
import { useCurtainAnimation } from '@/hooks/animations/useAnimations';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';
import { Hamburger } from './Hamburger';
import { PerformanceMetrics } from './PerformanceMetrics';

export function MenuCurtain(): ReactElement {
  const menuOpened = useMovieStore(state => state.menuOpened);
  const style = useThemedStyles(styles.light, styles.dark);

  const { slideIn, slideOut, animatedStyle } = useCurtainAnimation();

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
    <Animated.View style={[style.container, animatedStyle]}>
      <View style={style.hamburger}>
        <Hamburger />
      </View>
      <PerformanceMetrics customStyle={style.performanceMetrics} />
    </Animated.View>
    //   </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightGreen,
      opacity: 0.96,
      height: '150%',
      width: '110%',
      position: 'absolute',
      top: -150,
      left: -5,
      zIndex: 30,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      shadowColor: colors.black,
      shadowOffset: {
        width: 5,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
    },
    hamburger: {
      marginTop: 114,
      marginLeft: 16,
      alignItems: 'flex-start',
    },
    performanceMetrics: {
      marginTop: 20,
      marginHorizontal: 16,
    },
  }),
);
