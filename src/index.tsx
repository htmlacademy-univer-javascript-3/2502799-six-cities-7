import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offerCounts: number = 67;

root.render(
  <React.StrictMode>
    <App offerCounts={offerCounts}/>
  </React.StrictMode>
);
