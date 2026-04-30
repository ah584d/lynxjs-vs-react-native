import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Zustand store for managing app theme (light/dark mode)
 * Note: Theme preference is NOT persisted - resets to 'light' on app restart
 * TODO: Add persistence when LynxJS supports localStorage or native storage
 *
 * Theming in LynxJS works through the ThemeProvider component, not DOM manipulation.
 * The provider applies the 'dark' class which triggers CSS variable changes.
 */
export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',

  setTheme: (theme: Theme) => {
    console.log('🎨 Setting theme to:', theme);
    set({ theme });
  },

  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('🔄 Toggling theme from', currentTheme, 'to', newTheme);
    set({ theme: newTheme });
  },
}));

