import { ReactElement, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMovieStore } from '@fennex-sand/hooks';
import { Colors } from '@/common/colors';
import { useMenuAnimation } from '@/hooks/useAnimations';

export const Menu = (): ReactElement => {
  const setOpenMenu = useMovieStore(state => state.setOpenMenu);
  const menuOpened = useMovieStore(state => state.menuOpened);

  const { toggleMenuAnimation, topBarAnimatedStyle, bottomBarAnimatedStyle, middleBarAnimatedStyle } = useMenuAnimation();

  useEffect(() => {
    toggleMenuAnimation(menuOpened);
  }, [menuOpened, toggleMenuAnimation]);

  return (
    <Pressable style={({ pressed }) => [styles.menuButton, { opacity: pressed ? 1 : 1 }]} onPress={onMenuPress}>
      <Animated.View style={[styles.bar, topBarAnimatedStyle]} />
      <Animated.View style={[styles.bar, middleBarAnimatedStyle]} />
      <Animated.View style={[styles.bar, bottomBarAnimatedStyle]} />
    </Pressable>
  );

  function onMenuPress() {
    setOpenMenu(!menuOpened);
    toggleMenuAnimation(!menuOpened);
  }
};

const styles = StyleSheet.create({
  menuButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    borderColor: Colors.light.green,
    borderWidth: 1.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bar: {
    height: 2,
    width: 20,
    backgroundColor: Colors.light.grayBorder,
  },
});
