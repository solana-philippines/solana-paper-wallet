import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as colors from "../modules/colors";

import Logo from "./Logo";
import { useWallet } from "./WalletContext";

// variable to prevent double connecting
let mounted = false;

export default function Navbar() {
  const { wallet, connect } = useWallet();

  useEffect(() => {
    if (!mounted) {
      connect();
      mounted = true; // prevent double connection
    }
  }, []);

  return (
    <StyledNav>
      <Logo size="30px" />
      <Link to="/">Home</Link>
      <Link to="/airdrop">Airdrop</Link>
      <Link to="/store">Store</Link>
      <Link to="/redeem">Redeem</Link>

      {!wallet ? (
        <StyledConnect type="button" onClick={connect}>
          Connect Wallet
        </StyledConnect>
      ) : (
        <StyledAddress>
          {wallet.publicKey.toString().slice(0, 5) +
            "..." +
            wallet.publicKey.toString().slice(-6, -1)}
        </StyledAddress>
      )}
    </StyledNav>
  );
}

const StyledAddress = styled.span`
  font-family: Lato Bold;
  font-size: 1em;
  background-image: linear-gradient(to left top, #db1fff, #00ffa2);
  border: 0;
  border-radius: 2em;

  padding: 0.5em 1em;
  margin: 1em 0;

  max-width: 500px;

  color: ${colors.WHITE};
`;

const StyledConnect = styled.button`
  font-family: Lato Bold;
  font-size: 1em;
  background-image: linear-gradient(to left top, #db1fff, #00ffa2);
  border: 0;
  border-radius: 2em;

  padding: 0.5em 1em;
  margin: 1em 0;

  max-width: 500px;

  color: ${colors.WHITE};

  &:hover,
  &:active,
  &:focus {
    background-image: linear-gradient(to right bottom, #db1fff, #00ffa2);
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledNav = styled.nav`
  width: 100%;
  max-width: 800px;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 4em 2em;

  a {
    color: ${colors.GLASS};
    font-size: 1.2em;
    font-family: Lato Regular;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:active {
    }
  }
`;
