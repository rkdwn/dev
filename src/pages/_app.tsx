import { theme } from "@/theme/palette";
import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import "./global.css";

const App = ({ Component, pageProps }: AppProps) => {
  //
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
