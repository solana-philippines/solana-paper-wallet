import { useState, useRef, useEffect } from 'react';
import * as web3 from '@solana/web3.js';
import styled from 'styled-components';

import Nav from './Nav';

function Store() {
  return (
    <StyledMain>
      <h1>Solana Paper Wallet</h1>
      <h3>How to Test</h3>
      <ol>
        <li>Install Phantom Browser Extension</li>
        <li>Switch wallet network to Devnet</li>
        <li>Get Devnet SOL</li>
        <li>Store SOL into Paper Wallet with a Code</li>
        <li>Get Paper Wallet (Hash + Code)</li>
        <li>Create new wallet</li>
        <li>Get Devnet SOL for redeem transaction fee</li>
        <li>Redeem Paper Wallet into new wallet</li>
      </ol>
      <h3>Future Improvements</h3>
      <ol>
        <li>Find a way to eliminate transaction fee on redeem</li>
        <li>What if same wallet is used to store? Must increase lamports in PDA</li>
        <li>May wallet connection a one time thing</li>
        <li>Add more error handling and protection on program</li>
        <li>Make UI better and cleaner</li>
        <li>Deploy to production (Mainnet)</li>
      </ol>
      <h5>Lil Navigation</h5>
      <Nav />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  li {
    padding: 10px;
    margin: 5px 0;
    border-radius: 1em;
  }

  li:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;

export default Store;
