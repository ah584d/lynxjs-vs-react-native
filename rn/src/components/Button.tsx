import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/common/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;
}

export const Button = ({ title, onPress, customStyle, customStyleText }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress}>
      <Text style={[styles.text, customStyleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 8,
    margin: 4,
  },

  text: {
    fontSize: 14,
    color: Colors.light.text,
  },
});
