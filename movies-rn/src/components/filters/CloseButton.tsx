import { ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@fennex-sand/constants';

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps): ReactElement => {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Icon name='close' size={20} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.lightBorder,
    borderRadius: 10,
    padding: 6,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    color: Colors.light.gray,
  },
});
