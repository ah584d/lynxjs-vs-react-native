import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface FilterProps {
  title: string;
  filters: string[];
  onFilterChange: (filter: string) => void;
  selectedFilterIndex?: number;
}

export const Filter = ({ title, filters, onFilterChange, selectedFilterIndex }: FilterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={filter} onPress={() => onFilterChange(filter)} style={[styles.filterButton, index === selectedFilterIndex && styles.selectedFilterButton]}>
            <Text style={[styles.filterButtonText, index === selectedFilterIndex && styles.selectedFilterButtonText]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 4,
    margin: 4,
  },
  selectedFilterButton: {
    backgroundColor: Colors.light.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedFilterButtonText: {
    color: Colors.light.background,
  },
});
