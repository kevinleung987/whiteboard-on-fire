import './index.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';

import App from './components/App';
import { firebaseConfig } from './config/firebaseConfig';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <SuspenseWithPerf fallback={<CircularProgress />}>
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
