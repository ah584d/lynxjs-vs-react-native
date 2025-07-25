import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/common/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const NavigationHeader = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Navigation Header</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.light.background,
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    color: Colors.light.text,
    fontWeight: 'bold',
  },
});
