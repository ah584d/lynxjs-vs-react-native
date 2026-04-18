import { ReactElement } from 'react';
import { CloseButton } from '../../atoms/CloseButton/LX_CloseButton';
import styles from './searchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps): ReactElement => {
  return (
    <view className={styles.container}>
      <text>🔍</text>
      <input className={styles.inputSearch} bindinput={e => onChangeText(e.detail.value)} placeholder='search' />
      {value?.length > 0 && <CloseButton onPress={() => onChangeText('')} />}
    </view>
  );
};
