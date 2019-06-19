import 'styled-components';

declare module 'styled-components' {
  export interface IDefaultTheme {
    misc: {
      modalRadius: string;
    };

    color: {
      lightBlack: string;
      black: string;
      blueLight: string;
      blue: string;
      blueDark: string;
      blueHover: string;
      grayBorder: string;
      grayFadedBorder: string;
      grayText: string;
      grayTextDisabled: string;
      grayDisabled: string;
      grayBackground: string;
      grayLightDisabled: string;
      grayHover: string;
      purple: string;
      white: string;
      red: string;
    };
  }
}
