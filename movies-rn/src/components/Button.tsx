import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Button = ({ title, onPress, customStyle, customStyleText, disabled = false }: ButtonProps) => {
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <TouchableOpacity style={[style.container, customStyle]} onPress={onPress} disabled={disabled}>
      <Text style={[style.text, customStyleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.lightGray,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 54,
    },
    text: {
      fontSize: 14,
      color: colors.text,
    },
  }),
);
