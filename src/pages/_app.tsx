import { theme } from "@/theme/palette";
import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "./global.css";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/router";

const ApolloClientProvider = dynamic(() => import("@/contexts/ApolloContext"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const LayoutComponent = ["/login"].includes(router.pathname)
    ? ({ children }: { children: React.ReactNode }) => <>{children}</>
    : Layout;
  return (
    <ThemeProvider theme={theme}>
      <ApolloClientProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ApolloClientProvider>
    </ThemeProvider>
  );
};

export default App;
