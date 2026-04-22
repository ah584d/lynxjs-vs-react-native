import { ReactElement, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMovieStore } from '@fennex-sand/hooks';
import { useHamburgerAnimation } from '@/hooks/animations/useAnimations';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';

export const Hamburger = (): ReactElement => {
  const setOpenMenu = useMovieStore(state => state.setOpenMenu);
  const menuOpened = useMovieStore(state => state.menuOpened);
  const style = useThemedStyles(styles.light, styles.dark);

  const { toggleMenuAnimation, topBarAnimatedStyle, bottomBarAnimatedStyle, middleBarAnimatedStyle } = useHamburgerAnimation();

  useEffect(() => {
    toggleMenuAnimation(menuOpened);
  }, [menuOpened, toggleMenuAnimation]);

  return (
    <Pressable style={() => [style.menuButton, { opacity: 1 }]} onPress={onMenuPress}>
      <Animated.View style={[style.bar, topBarAnimatedStyle]} />
      <Animated.View style={[style.bar, middleBarAnimatedStyle]} />
      <Animated.View style={[style.bar, bottomBarAnimatedStyle]} />
    </Pressable>
  );

  function onMenuPress() {
    setOpenMenu(!menuOpened);
    toggleMenuAnimation(!menuOpened);
  }
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    menuButton: {
      width: 35,
      height: 35,
      borderRadius: 8,
      borderColor: colors.green,
      borderWidth: 1.5,
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 8,
    },
    bar: {
      height: 2,
      width: 20,
      backgroundColor: colors.grayBorder,
    },
  }),
);
