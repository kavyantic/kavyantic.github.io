import { NEXT_DATA } from "next/dist/shared/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document(a: NEXT_DATA) {
  return (
    <Html lang="en">

      <Head />

      <body data-theme="navy" >
        <Main />
        {/* <NavigatorMenu/> */}
        <NextScript />
      </body>
    </Html>
  );
}
