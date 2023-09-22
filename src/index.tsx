import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap";
import "./assets/custom.scss";
import { App } from './App';
import { WeaponProvider } from './components/WeaponContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WeaponProvider>
    <App />
    </WeaponProvider>
  </React.StrictMode>
);
