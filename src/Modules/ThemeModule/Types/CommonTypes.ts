export type COLORS = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  text: string;
  onSurface: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  notification: string;
  white: string;
  black: string;
  success: string;
  transparent: string;
  adaptivePrimary: string;
  divider: string;
};

export type THEME_TYPE = {
  type: 'light' | 'dark';
  colors: COLORS;
};
