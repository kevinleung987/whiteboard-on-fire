import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";
import { firebaseConfig } from "./config/firebaseConfig";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <SuspenseWithPerf fallback={<p>loading firebase...</p>}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SuspenseWithPerf>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
