import { type ReactElement } from '@lynx-js/react';
import { runOnBackground } from '@lynx-js/react';
import styles from './filter.module.scss';

interface FilterProps {
  filters: (number | string | null)[];
  onFilterChange: (activeIndex: number) => () => void;
  currentSelection?: number;
}
export const Filter = ({ filters, onFilterChange, currentSelection }: FilterProps): ReactElement => {
  const handleFilterClickMainThread = (index: number) => () => {
    'main thread';
    runOnBackground(() => {
      const backgroundHandler = onFilterChange(index);
      backgroundHandler();
    })();
  };

  return (
    <view className={styles['filter-container']}>
      {filters.map((filter, index) => {
        const isSelected = index === currentSelection;
        return (
          <view
            className={isSelected ? styles['filter-button-active'] : styles['filter-button']}
            main-thread:bindtap={handleFilterClickMainThread(index)}
            key={filter || `all-${index}`}>
            <text>{filter}</text>
          </view>
        );
      })}
    </view>
  );
};
