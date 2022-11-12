import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { Wrapper } from "@/src/store";

import AppTheme from "@/src/Layouts/themes/AppTheme.json";

import "nprogress/nprogress.css";

type withAppPorps = Pick<AppProps, "Component" | "pageProps"> & {
  // example: string;
};

const MainApp = ({ Component, pageProps }: withAppPorps) => {
  const Router = useRouter();

  return (
    <ChakraProvider theme={extendTheme(AppTheme)}>
      <NProgress
        color="#0079bf"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />
      <Component {...pageProps} router={Router} />
    </ChakraProvider>
  );
};

export default Wrapper.withRedux(MainApp);
