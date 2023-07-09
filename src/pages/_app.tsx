import "@/styles/theme.scss";
import "@/styles/globals.css";
import "@/styles/home.scss";
import "@/styles/navigator.scss";
import "@/styles/layout.scss";
import "@/styles/eye.scss";
import "@/styles/utils.scss";

import type { AppLayoutProps } from "next/app";

import { store } from "app/store";
import { Provider } from "react-redux";
import NavigatorMenu from "@/components/Navigator";
import { ReactNode, useEffect, useRef, useState } from "react";
import { mouseListenerId } from "@/constants";
import AnimatedPages from "@/components/animated/AnimatedPages";
import Cursor from "@/components/Cursor";
import LayoutTransition from "@/components/animated/LayoutAnimation";

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const mouseListenerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={mouseListenerId}
      ref={mouseListenerRef}
      style={{ backgroundColor:'red' }}
    >
      <Provider store={store}>
        {/* <LayoutTransition> */}
          {getLayout(
            <AnimatedPages>
              <Component {...pageProps} />
            </AnimatedPages>
          )}
        {/* </LayoutTransition> */}
        <Cursor listener={mouseListenerRef} />
      </Provider>
    </div>
  );
}
