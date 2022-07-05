import { useState, useRef } from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";

import { airdrop } from "../modules/utils";
import { useWallet } from "../components/WalletContext";
import { useError } from "../components/ErrorContext";

export default function Airdrop() {
  const { wallet, connection } = useWallet();
  const { error, setErrorMessage } = useError();

  const [loading, setLoading] = useState(false);

  const getAirdrop = async () => {
    if (connection && wallet) {
      try {
        setLoading(true);
        setErrorMessage("Requesting for Airdrop...");

        // Request for airdrop
        await airdrop(connection, wallet);

        setLoading(false);
        setErrorMessage("Success. Check your wallet");
      } catch (e) {
        setLoading(false);
        setErrorMessage(e.message);
      }
    } else {
      setLoading(false);
      setErrorMessage("Connect your wallet first");
    }
  };

  return (
    <>
      <StyledHeader>
        <section>
          <h1>
            <span>Airdrop</span> Devnet Solana
          </h1>
          <p>{error ? error : "Get some Devnet SOL for testing"}</p>

          {!loading && <Button msg="Request Airdrop" func={getAirdrop} />}
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

  background-image: radial-gradient(
    circle,
    #00ffa2,
    #00eed8,
    #00d7ff,
    #00bcff,
    #617df2,
    #9355d4,
    #8d036e,
    #610e42,
    #340f20,
    #000000,
    #000000,
    #000000
  );

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
