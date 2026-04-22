import { ReactElement } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';
import { useFadeAnimation } from '../../hooks/animations/useFadeAnimation';
import { CloseButton } from '../atoms/CloseButton';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps): ReactElement => {
  const { animatedStyle, isVisible } = useFadeAnimation({
    visible: value.length > 0,
    delay: 100,
  });
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <View style={style.container}>
      <Text>🔍</Text>
      <TextInput style={style.inputSearch} value={value} onChangeText={onChangeText} placeholder='search' />
      {isVisible && (
        <Animated.View style={animatedStyle}>
          <CloseButton onPress={() => onChangeText('')} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      height: 40,
      flexDirection: 'row',
      width: '80%',
      backgroundColor: colors.movieCardBackGround,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 12,
      paddingRight: 8,
    },
    inputSearch: {
      flex: 1,
      height: '100%',
      color: colors.text,
      marginLeft: 4,
    },
    icon: {
      color: colors.green,
    },
  }),
);
