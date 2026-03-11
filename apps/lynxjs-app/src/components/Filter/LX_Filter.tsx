import { type ReactElement } from '@lynx-js/react';
import { runOnBackground } from '@lynx-js/react';
import styles from './filter.module.scss';

interface FilterProps {
  filters: (number | string | null)[];
  onFilterChange: (activeIndex: number) => () => void;
  currentSelection?: number;
}
export const Filter = ({ filters, onFilterChange, currentSelection }: FilterProps): ReactElement => {
  const handleFilterClick = (filterIndex: number) => {
    'main thread';
    runOnBackground(() => {
      const backgroundHandler = onFilterChange(filterIndex);
      backgroundHandler();
    });
  };

  return (
    <view className={styles['filter-container']}>
      {filters.map((filter, index) => {
        const isSelected = index === currentSelection;
        return (
          <view
            className={isSelected ? styles['filter-button-active'] : styles['filter-button']}
            main-thread:bindtap={handleFilterClick.bind(null, index)}
            key={filter || `all-${index}`}>
            <text>{filter}</text>
          </view>
        );
      })}
    </view>
  );
};
