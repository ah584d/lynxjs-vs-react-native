import { ReactElement, useEffect, useRef } from 'react';
import { CloseButton } from '../../atoms/CloseButton/LX_CloseButton';
import styles from './searchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps): ReactElement => {
  const inputId = 'search-input';
  const lastValueRef = useRef<string>(value);

  // Use setValue method to update input value from outside
  useEffect(() => {
    // Only update if value changed and component is mounted
    if (lastValueRef.current !== value) {
      lynx
        .createSelectorQuery()
        .select(`#${inputId}`)
        .invoke({
          method: 'setValue',
          params: {
            value: value || '',
          },
          success: () => {
            lastValueRef.current = value;
          },
          fail: res => {
            // Silently handle case when input is not yet mounted
            console.warn('Input not ready:', res);
          },
        })
        .exec();
    }
  }, [value]);

  return (
    <view className={styles.container}>
      <text>🔍</text>
      <input id={inputId} className={styles.inputSearch} bindinput={e => onChangeText(e.detail.value)} placeholder='search' />
      {value?.length > 0 && <CloseButton onPress={() => onChangeText('')} />}
    </view>
  );
};
