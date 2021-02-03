import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
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

ReactDOM.render(
  <React.StrictMode>
    <Session defaults={defaultSession}>
      <App />
    </Session>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
