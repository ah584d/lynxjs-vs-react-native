import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@fennex-sand/constants';
import { Button } from '@/components/Button';

interface FilterProps {
  filters: string[];
  onFilterChange: (index: number) => void;
  currentSelection?: number;
  title?: string;
}

export const Filter = ({ filters, onFilterChange, currentSelection, title }: FilterProps) => {
  return (
    <View style={[styles.container, { marginVertical: !title ? 12 : 0 }]}>
      {!!title && (
        <Text style={styles.title}>
          {title}: {getCurrentSelection(currentSelection)}
        </Text>
      )}
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => {
          const isSelected = index === currentSelection;
          const spacingStyle = { marginLeft: index === 0 ? 0 : 8 };
          return (
            <Button
              key={filter}
              title={filter}
              onPress={onFilterChange.bind(null, index)}
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
