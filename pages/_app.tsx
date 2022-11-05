import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NProgress from "nextjs-progressbar";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor, Wrapper } from "@/src/store";

import AppTheme from "@/src/Layouts/themes/AppTheme.json";

import "nprogress/nprogress.css";

const App = ({ Component, pageProps }: AppProps) => {

  // if(typeof window === "undefined") {

  //   // const { store, props } = Wrapper.useWrappedStore(pageProps);
  //   const _store = configureStorewithSSR(store);
    
  //   return (
  //     <ChakraProvider theme={extendTheme(AppTheme)}>
  //       <NProgress
  //         color="#0079bf"
  //         startPosition={0.3}
  //         stopDelayMs={200}
  //         height={4}
  //       />
  //       <Provider store={_store} >
  //         {/* <PersistGate persistor={persistor}> */}
  //           <Component {...pageProps} />
  //         {/* </PersistGate> */}
  //       </Provider>
  //     </ChakraProvider>
  //   );
  // }

  return (
    <ChakraProvider theme={extendTheme(AppTheme)}>
      <NProgress
        color="#0079bf"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default Wrapper.withRedux(App);
