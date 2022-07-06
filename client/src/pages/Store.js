import { useState, useRef } from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import Label from "../components/Label";

import { paperStore } from "../modules/paper";
import { useWallet } from "../components/WalletContext";
import { useError } from "../components/ErrorContext";

export default function Airdrop() {
  const { wallet, connection } = useWallet();
  const { error, setErrorMessage } = useError();
  const [loading, setLoading] = useState(false);

  const codeInputRef = useRef(null);
  const confirmCodeInputRef = useRef(null);

  const store = async () => {
    if (codeInputRef.current.value !== confirmCodeInputRef.current.value) {
      setErrorMessage("Passwords not the same");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const signature = await paperStore(
        connection,
        wallet,
        codeInputRef.current.value
      );

      setLoading(false);
      setErrorMessage("Stored. Your wallet must be 0 by now");
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
            <span>Store</span> your Solana
          </h1>
          <p>Password</p>
          <Input reference={codeInputRef} type="password" />
          <p>Confirm Password</p>
          <Input reference={confirmCodeInputRef} type="password" />
          <p>{error ? error : ""}</p>
          {!loading ? (
            <Button msg="Store Solana" func={store} />
          ) : (
            <Label content="Trying to store..." />
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
    min-height: 900px;
    height: 100vh;
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

  @media only screen and (max-width: 900px) {
    h1 {
      font-size: 4em;
    }

    p {
      font-size: 1.5em;
    }
  }
`;

const StyledNavHolder = styled.nav`
  min-width: 100vw;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
`;
