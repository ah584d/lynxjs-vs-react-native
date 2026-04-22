import { ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createThemedStyles, useTheme, useThemedStyles } from '@/hooks/useTheme';

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps): ReactElement => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <Pressable style={({ pressed }) => [style.container, pressed && style.pressed]} onPress={onPress}>
      <Icon name='close' size={20} style={[style.icon, { color: colors.gray }]} />
    </Pressable>
  );
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.lightBorder,
      borderRadius: 10,
      padding: 6,
    },
    pressed: {
      opacity: 0.8,
    },
    icon: {
      color: colors.gray,
    },
  }),
);
