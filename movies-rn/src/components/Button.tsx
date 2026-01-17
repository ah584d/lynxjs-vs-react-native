import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@fennex-sand/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Button = ({ title, onPress, customStyle, customStyleText, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.text, customStyleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.lightGray,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 54,
  },
  text: {
    fontSize: 14,
    color: Colors.light.text,
  },
});
