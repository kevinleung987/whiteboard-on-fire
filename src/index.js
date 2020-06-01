import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyCbWB8Vf9cX4tHozXCVFTj2eH2K9nBYEs0",
  authDomain: "fir-firstweek.firebaseapp.com",
  databaseURL: "https://fir-firstweek.firebaseio.com",
  projectId: "fir-firstweek",
  storageBucket: "fir-firstweek.appspot.com",
  messagingSenderId: "940617187800",
  appId: "1:940617187800:web:d0006ab8a5cf892d5b32ad",
  measurementId: "G-YGNZG7KEQH",
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <SuspenseWithPerf
      fallback={<p>loading firebase...</p>}
    >
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
