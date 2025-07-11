import { Injectable } from '@angular/core';
import { ThemeMode, ThemeStyle } from '../types/enums';
import { Subject } from 'rxjs';

const STORAGE_KEY = 'template-storage-key-theme-mode';

export interface ThemeSettings {
  mode: ThemeMode;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeMode: ThemeMode = ThemeMode.SYSTEM;
  themeStyle: ThemeStyle = ThemeStyle.LIGHT;
  themeUpdateSubject: Subject<ThemeStyle> = new Subject();

  private darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {}

  initialize() {
    this.darkThemeQuery.addEventListener(
      'change',
      this.handleSystemThemeChange.bind(this)
    );

    try {
      const storageValue = localStorage.getItem(STORAGE_KEY);
      this.changeThemeMode(
        storageValue !== null ? (storageValue as ThemeMode) : ThemeMode.SYSTEM
      );
    } catch (error) {
      this.themeStyle = ThemeStyle.LIGHT;
    }

    this.applyThemeStyle();
  }

  _getSystemThemeStyle() {
    return this.darkThemeQuery.matches ? ThemeStyle.DARK : ThemeStyle.LIGHT;
  }

  changeThemeMode(themeMode: ThemeMode) {
    this.themeMode = themeMode;
    if (this.themeMode === ThemeMode.SYSTEM) {
      this.themeStyle = this._getSystemThemeStyle();
    } else {
      this.themeStyle =
        this.themeMode === ThemeMode.DARK ? ThemeStyle.DARK : ThemeStyle.LIGHT;
    }
    localStorage.setItem(STORAGE_KEY, this.themeMode);
    this.applyThemeStyle();
  }

  private handleSystemThemeChange(event: MediaQueryListEvent) {
    if (this.themeMode === ThemeMode.SYSTEM) {
      this.themeStyle = event.matches ? ThemeStyle.DARK : ThemeStyle.LIGHT;
    }
    this.applyThemeStyle();
  }

  clear() {
    this.themeMode = ThemeMode.SYSTEM;
    this.themeStyle = ThemeStyle.LIGHT;
    this.applyThemeStyle();
    localStorage.removeItem(STORAGE_KEY);
  }

  isDarkTheme(): boolean {
    return this.themeStyle === ThemeStyle.DARK;
  }

  applyThemeStyle() {
    if (document.body.classList.contains('dark-mode')) {
      if (this.themeStyle === ThemeStyle.LIGHT) {
        document.body.classList.remove('dark-mode');
      }
    } else {
      if (this.themeStyle === ThemeStyle.DARK) {
        document.body.classList.add('dark-mode');
      }
    }
    this.themeUpdateSubject.next(this.themeStyle);
  }
}
