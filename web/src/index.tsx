import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
import * as serviceWorker from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Session from '@components/Session'
import '@utils/rulesExtension';
import '@styles/index.scss';

const defaultSession = {
  initial: true,
  loading: true,
  token: "",
  user: null
}

const root = document.getElementById('root')

if(root!.hasChildNodes()) {
  ReactDOM.hydrate(
    <Session defaults={defaultSession}>
      <App />
    </Session>,
  root);
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Session defaults={defaultSession}>
        <App />
      </Session>
    </React.StrictMode>,
    root);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if(process.env.NODE_ENV === 'production') {
  serviceWorker.register({
      onUpdate: (registration: any) => {
          alert('New version available!  Ready to update?');
          window.location.reload();
          if (registration && registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
      }
  });
} else {
  serviceWorker.unregister();
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
