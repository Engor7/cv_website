import { defineStore } from 'pinia';

export const useInterfaceStateStore = defineStore('interfaceState', {
  state: () => ({
    theme: 'light',
    isPageHeaderFixed: false,
    isScrolling: false,
  }),
  actions: {
    initTheme() {
      const themeFromStorage = localStorage.getItem('theme');

      if (themeFromStorage) this.setTheme(themeFromStorage);
      else {
        this.setTheme('light');
        if (!window.matchMedia) this.setTheme('light');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
          this.setTheme('dark');
      }
    },
    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    },
    setTheme(theme) {
      localStorage.setItem('theme', (this.theme = theme));
    },
    startScroll() {
      this.isScrolling = true;
    },
    stopScroll() {
      this.isScrolling = false;
    },
  },
});
