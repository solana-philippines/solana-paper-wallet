import { useState, useRef } from "react";
import styled from "styled-components";
import * as web3 from "@solana/web3.js";

import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import Label from "../components/Label";

import { paperRedeem } from "../modules/paper";
import { useWallet } from "../components/WalletContext";
import { useError } from "../components/ErrorContext";

export default function Airdrop() {
  const { wallet, connection } = useWallet();
  const { error, setErrorMessage } = useError();
  const [loading, setLoading] = useState(false);

  const codeInputRef = useRef(null);
  const hashInputRef = useRef(null);

  const redeem = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const signature = await paperRedeem(
        connection,
        wallet,
        codeInputRef.current.value,
        new web3.PublicKey(hashInputRef.current.value)
      );

      setLoading(false);
      setErrorMessage("Redeemed. Your wallet must be credited by now");
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      <StyledHeader>
        <div id="nav-padding"></div>
        <section>
          <h1>
            <span>Redeem</span> your Solana
          </h1>
          <p>Password</p>
          <Input reference={codeInputRef} type="password" />
          <p>Hash</p>
          <Input reference={hashInputRef} />
          <p>{error ? error : ""}</p>
          {!loading ? (
            <Button msg="Redeem Solana" func={redeem} />
          ) : (
            <Label content="Trying to Redeem..." />
          )}
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
    margin: 1em 0;
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
