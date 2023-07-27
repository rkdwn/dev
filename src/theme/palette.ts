import { Theme } from "@emotion/react";

export const colorTheme = {
  main: "main",
  mainDark: "mainDark",
  second: "second",
  gray: "gray",
  error: "error",
  blueGray: "blueGray",
  lightGray: "lightGray"
};

export type ColorType = keyof typeof colorTheme;

export interface Palette {
  main: string;
  mainDark: string;
  second: string;
  gray: string;
  error: string;
  blueGray: string;
  lightGray: string;
}

const theme: Theme = {
  // ABE39D
  palette: {
    main: "#A27AFF",
    mainDark: "#7A40FF",
    second: "#ABE39D",
    gray: "#546E7A",
    error: "#F50057",
    blueGray: "#ECEFF1",
    lightGray: "#F4F6F7"
  }
};

export { theme };
