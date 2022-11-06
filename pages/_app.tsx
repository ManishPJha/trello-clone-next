import App, { AppProps, AppContext } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, Wrapper } from "@/src/store";

import AppTheme from "@/src/Layouts/themes/AppTheme.json";

import "nprogress/nprogress.css";

type withAppPorps =  Pick<AppProps, "Component" | "pageProps"> & {
  // example: string;
};

const MainApp = ({ Component, pageProps }: withAppPorps) => {

  const { props, store } = Wrapper.useWrappedStore(pageProps);
 
  
  // console.log(`catched states are ------->`,store.getState());

  return (
    <ChakraProvider theme={extendTheme(AppTheme)}>
      <NProgress
        color="#0079bf"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default Wrapper.withRedux(MainApp);
