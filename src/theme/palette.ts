import { Theme } from "@emotion/react";

export const colorTheme = {
  main: "main",
  mainDark: "mainDark",
  second: "second",
  secondDark: "secondDark",
  gray: "gray"
};

export type ColorType = keyof typeof colorTheme;

export interface Palette {
  main: string;
  mainDark: string;
  second: string;
  secondDark: string;
  gray: string;
}

const theme: Theme = {
  palette: {
    main: "#ffcbcb",
    mainDark: "#ffb5b5",
    second: "#407088",
    secondDark: "#132743",
    gray: "#3A3A3A"
  }
};

export { theme };
