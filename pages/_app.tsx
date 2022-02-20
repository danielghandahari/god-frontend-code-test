import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import type { AppProps /*, AppContext */ } from "next/app";

// TODO USE?
// import "../public/css/styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default App;
