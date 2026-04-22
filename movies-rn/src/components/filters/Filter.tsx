import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';

interface FilterProps {
  filters: string[];
  onFilterChange: (index: number) => void;
  currentSelection?: number;
  title?: string;
}

export const Filter = ({ filters, onFilterChange, currentSelection, title }: FilterProps) => {
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <View style={[style.container, { marginTop: !title ? 12 : 0 }]}>
      {!!title && (
        <Text style={style.title}>
          {title}: {getCurrentSelection(currentSelection)}
        </Text>
      )}
      <View style={style.filterContainer}>
        {filters.map((filter, index) => {
          const isSelected = index === currentSelection;
          const spacingStyle = { marginLeft: index === 0 ? 0 : 8 };
          return (
            <Button
              key={filter}
              title={filter}
              onPress={onFilterChange.bind(null, index)}
              customStyle={[isSelected ? style.selectedFilterButton : undefined, spacingStyle]}
              customStyleText={isSelected ? style.selectedFilterButtonText : undefined}
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

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 16,
      marginBottom: 7,
    },
    filterContainer: {
      flexDirection: 'row',
    },
    selectedFilterButton: {
      backgroundColor: colors.green,
    },
    selectedFilterButtonText: {
      color: colors.white,
    },
  }),
);
