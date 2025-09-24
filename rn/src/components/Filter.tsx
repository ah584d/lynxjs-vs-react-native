import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/common/colors';
import { Button } from '@/components/Button';

interface FilterProps {
  title: string;
  filters: string[];
  onFilterChange: (filter: string, index: number) => void;
  currentSelection?: number;
}

export const Filter = ({ title, filters, onFilterChange, currentSelection }: FilterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}: {getCurrentSelection(currentSelection)}
      </Text>
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => {
          const isSelected = index === currentSelection;
          const spacingStyle = { marginLeft: index === 0 ? 0 : 8 };
          return (
            <Button
              key={filter}
              title={filter}
              onPress={() => onFilterChange(filter, index)}
              customStyle={[isSelected ? styles.selectedFilterButton : undefined, spacingStyle]}
              customStyleText={isSelected ? styles.selectedFilterButtonText : undefined}
            />
          );
        })}
      </View>
    </View>
  );

  function getCurrentSelection(index?: number): string {
    if (index === undefined) {
      return 'All';
    }
    return filters[index];
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 16,
    marginBottom: 7,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  selectedFilterButton: {
    backgroundColor: Colors.light.green,
  },
  selectedFilterButtonText: {
    color: Colors.light.white,
  },
});
