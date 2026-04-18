import { type ReactElement } from '@lynx-js/react';
import { runOnBackground } from '@lynx-js/react';
import classNames from 'classnames';
import styles from './filter.module.scss';

interface FilterProps {
  filters: (number | string | null)[];
  onFilterChange: (activeIndex: number) => () => void;
  currentSelection?: number;
}
export const Filter = ({ filters, onFilterChange, currentSelection }: FilterProps): ReactElement => {
  return (
    <view className={styles['filter-container']}>
      {filters.map((filter, index) => {
        const isSelected = index === currentSelection;

        const handleClick = () => {
          const backgroundHandler = onFilterChange(index);
          backgroundHandler();
        };

        return (
          <view className={classNames(styles['filter-button'], { [styles['filter-button-active']]: isSelected })} bindtap={handleClick} key={filter || `all-${index}`}>
            <text>{filter}</text>
          </view>
        );
      })}
    </view>
  );
};
