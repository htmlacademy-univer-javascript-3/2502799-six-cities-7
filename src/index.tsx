import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {offers} from './mocks/offers.ts';
import {reviews} from './mocks/reviews.ts';
import {OFFERS_COUNT} from './const.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerCounts={OFFERS_COUNT} offers={offers} reviews={reviews} />
  </React.StrictMode>
);
