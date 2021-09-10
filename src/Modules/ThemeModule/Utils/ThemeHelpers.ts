import {THEME_TYPE} from '../Types/CommonTypes';

export const DayTheme: THEME_TYPE = {
  type: 'light',
  colors: {
    primary: '#2F80ED',
    accent: '#56CCF2',
    background: 'rgb(234,232,246)',
    surface: '#ffffff',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: 'rgba(0,0,0,0.10)',
    placeholder: 'rgba(0,0,0,0.54)',
    backdrop: 'rgba(0,0,0,0.5)',
    notification: '#ec407a',
    white: '#ffffff',
    black: '#000000',
    success: '#25a820',
    transparent: 'transparent',
    adaptivePrimary: '#2F80ED',
    divider: 'rgba(0,0,0,0.26)',
  },
};

export const NightTheme: THEME_TYPE = {
  type: 'dark',
  colors: {
    primary: '#2F80ED',
    accent: '#000000',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    onSurface: '#FFFFFF',
    text: '#FFFFFF',
    disabled: 'rgba(255,255,255,0.60)',
    placeholder: 'rgba(255,255,255,0.54)',
    backdrop: 'rgba(255,255,255,0.5)',
    notification: '#f8bbd0',
    white: '#ffffff',
    black: '#000000',
    success: '#25a820',
    transparent: 'transparent',
    adaptivePrimary: '#121212',
    divider: 'rgba(255,255,255,0.38)',
  },
};
