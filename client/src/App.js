import './App.css';

import { useState, useRef, useEffect } from 'react';
import * as web3 from '@solana/web3.js';
import styled from 'styled-components';

function App() {
  const [connected, setConnected] = useState(false); 

  const connectWallet = (e) => {
    setConnected(true);
  };

  const connectButton = connected
    ? null
    : (<button type="button" onClick={connectWallet}>Connect</button>);

  return (
    <StyledMain>
      <h1>Solana Paper Wallet</h1>
      { connectButton }
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
`;

export default App;
