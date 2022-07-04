import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Store from './Store';
import Redeem from './Redeem';
import Airdrop from './Airdrop';
import NotFound from './NotFound';
import HowTo from './HowTo';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Store />} />
        <Route exact path="/redeem" element={<Redeem />} />
        <Route exact path="/faucet" element={<Airdrop />} />
        <Route exact path="/instruction" element={<HowTo />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
