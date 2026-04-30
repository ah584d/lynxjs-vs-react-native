import { type ReactElement, type ReactNode } from '@lynx-js/react';
import { useThemeStore } from '@/hooks/LX_useThemeStore';
import styles from './themeProvider.module.scss';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const theme = useThemeStore(state => state.theme);

  const themeClass = theme === 'dark' ? styles.dark : styles.light;

  return <view className={themeClass}>{children}</view>;
}
