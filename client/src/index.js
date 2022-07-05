import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Airdrop from './pages/Airdrop';
import Store from './pages/Store';
import Redeem from './pages/Redeem';
import NotFound from './pages/NotFound';

import { WalletProvider } from './components/WalletContext';
import { ErrorProvider } from './components/ErrorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/airdrop" element={<Airdrop />} />
            <Route exact path="/store" element={<Store />} />
            <Route exact path="/redeem" element={<Redeem />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </ErrorProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
