import { ReactElement } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@fennex-sand/constants';
import { CloseButton } from './CloseButton';
import { useFadeAnimation } from './useFadeAnimation';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps): ReactElement => {
  const { animatedStyle, isVisible } = useFadeAnimation({
    visible: value.length > 0,
    delay: 100,
  });

  return (
    <View style={styles.container}>
      <Icon name='search' size={20} style={styles.icon} />
      <TextInput style={styles.inputSearch} value={value} onChangeText={onChangeText} placeholder='search' />
      {isVisible && (
        <Animated.View style={animatedStyle}>
          <CloseButton onPress={() => onChangeText('')} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: Colors.light.movieCardBackGround,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 8,
  },
  inputSearch: {
    flex: 1,
    height: '100%',
    color: Colors.light.text,
    marginLeft: 4,
  },
  icon: {
    color: Colors.light.green,
  },
});
