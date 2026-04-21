import { ReactElement } from 'react';
import styles from './emptySearchResult.module.scss';

export const EmptySearchResult = (): ReactElement => {
  return (
    <view className={styles.emptySearchContainer}>
      <text className={styles.emptySearchTitle}>No movies found</text>
      <text className={styles.emptySearchSubtitle}>Try searching with different keywords</text>
    </view>
  );
};
