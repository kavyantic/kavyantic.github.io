import "@/styles/globals.css";
import "@/styles/home.scss";
import "@/styles/navigator.scss";
import "@/styles/layout.scss"
import "@/styles/eye.scss"

import type { AppLayoutProps} from "next/app";


import { store } from "app/store";
import { Provider } from "react-redux";
import NavigatorMenu from "@/components/Navigator";
import { ReactNode, useEffect, useRef, useState } from "react";
import { mouseListenerId } from "@/constants";

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const mouseListenerRef = useRef<HTMLDivElement>(null);

  return (
    <div id={mouseListenerId} ref={mouseListenerRef} style={{ minHeight: "100vh" }}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <NavigatorMenu listener={mouseListenerRef} />
      </Provider>
     </div>
  );
}
