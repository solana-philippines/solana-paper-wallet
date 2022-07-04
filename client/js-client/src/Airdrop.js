import { useState, useRef, useEffect } from 'react';
import * as web3 from '@solana/web3.js';
import styled from 'styled-components';

import Nav from './Nav';

// const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'finalized');
const connection = new web3.Connection(process.env.REACT_APP_RPC_URL, 'finalized');

function Airdrop() {
  const [connected, setConnected] = useState(false); 
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const errorRef = useRef(null);

  useEffect(() => {
    errorRef.current.textContent = errorMsg;
  }, [errorMsg]);

  const connectWallet = async (e) => {
    try {
      // connecting Phantom wallet with window.solana
      const response = await window.solana.connect();
      setProvider(window.solana);
      setConnected(true);
      setErrorMsg("You're connected");
    } catch (e) {
      setErrorMsg("Failed to connect wallet. Try again");
    }
  };

  const airdrop = async (e) => {
    if (provider) {
      try {
        setLoading(true);
        setErrorMsg('Waiting for airdrop...');

        const signature = await connection.requestAirdrop(provider.publicKey, 1 * web3.LAMPORTS_PER_SOL);

        setLoading(false);
        setErrorMsg('Check your wallet for devnet SOL');
      } catch (e) {
        setLoading(false);
        setErrorMsg("Request for airdrop failed:", e);
      }
    }
  };

  const loadingUI = (<p>Loading</p>);

  const connectButton = connected && window.solana.isPhantom
    ? (<button type="button" onClick={airdrop}>Request SOL</button>)
    : (<button type="button" onClick={connectWallet}>Connect</button>);

  return (
    <StyledMain>
      <h1>Solana Paper Wallet</h1>
      <h3>Get Devnet SOL</h3>
      { loading ? loadingUI : connectButton }
      <h5>Lil Navigation</h5>
      <p ref={errorRef}></p>
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
`;

export default Airdrop;
