import { type ReactElement } from '@lynx-js/react';
import { useThemeStore } from '@/hooks/LX_useThemeStore';
import styles from './themeToggle.module.scss';

export function ThemeToggle(): ReactElement {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <view className={styles['theme-toggle']} bindtap={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <text className={styles['theme-icon']}>{theme === 'light' ? '🌙' : '☀️'}</text>
    </view>
  );
}
