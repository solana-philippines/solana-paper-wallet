import { useState, useRef } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';

import { airdrop } from '../modules/utils';
import { useWallet } from '../components/WalletContext';

export default function Airdrop() {
  const { wallet, connection } = useWallet();
  const [loading, setLoading] = useState(false);
  const addressInputRef = useRef(null);

  const getAirdrop = async () => {
    if (connection && wallet) {
      await airdrop(connection, wallet);
    } else {
    }
  }

  return (
    <>
      <StyledHeader>
        <section>
          <h1><span>Airdrop</span> Devnet Solana</h1>
          <p>Get some Devnet SOL for testing</p>
          <Input reference={addressInputRef} />
          <Button msg="Request Airdrop" func={getAirdrop} />
        </section>
      </StyledHeader>
      <StyledNavHolder>
        <Navbar />
      </StyledNavHolder>
    </>
  );
}

const StyledHeader = styled.header`
  position: relative;
  width: 100vw;
  min-height: 100vh;

  background-image: radial-gradient(circle, #00ffa2, #00eed8, #00d7ff, #00bcff, #617df2, #9355d4, #8d036e, #610e42, #340f20, #000000, #000000, #000000);

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    min-height: 700px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 5em;
    box-sizing: border-box;
  }

  img {
    margin: 2em;
  }

  h1 {
    margin: 0;
    font-family: Lato Regular;
    text-align: center;
    font-size: 5em;
    max-width: 800px;

    span {
      font-family: Lato Black;
    }
  }

  p {
    margin: 2em 0;
    font-family: Lato Regular;
    font-size: 2em;
    color: colors.GLASS;
  }
`;

const StyledNavHolder = styled.nav`
  min-width: 100vw;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
`;

const StyledHowTo = styled.section`
  width:  100%;
  background-image: linear-gradient(to right top, #000000, #340f20, #610e42, #8d036e, #b400a5, #9355d4, #617df2, #009cff, #00bcff, #00d7ff, #00eed8, #00ffa2);
`;

const StyledIcon = styled.div`
  position: relative;

  #circle {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10%;
    width: 300px;
    height: 300px;
    background-image: linear-gradient(to left top, #db1fff, #00ffa2);
  }

  #content {
    box-sizing: border-box;
    padding: 1em;
    text-align: left;
    position: relative;
  }
`;
