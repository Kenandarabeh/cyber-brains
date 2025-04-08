import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrastText?: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText?: string;
      };
      background: {
        default: string;
        paper: string;
        dark?: string;
        menuHover?: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      divider?: string;
    };
  }

  interface ThemeOptions {
    palette?: {
      primary?: {
        main?: string;
        light?: string;
        dark?: string;
        contrastText?: string;
      };
      secondary?: {
        main?: string;
        light?: string;
        dark?: string;
        contrastText?: string;
      };
      background?: {
        default?: string;
        paper?: string;
        dark?: string;
        menuHover?: string;
      };
      text?: {
        primary?: string;
        secondary?: string;
      };
      divider?: string;
    };
  }
}
