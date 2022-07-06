import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as colors from "../modules/colors";

import Logo from "./Logo";
import Icon from "./Icon";

import { useWallet } from "./WalletContext";

// variable to prevent double connecting
let mounted = false;

export default function Navbar() {
  const [displayMobileNav, setDisplayMobileNav] = useState(false);
  const { wallet, connect } = useWallet();

  useEffect(() => {
    if (!mounted) {
      // connect();
      mounted = true; // prevent double connection
    }
  }, []);

  const open = () => {
    // toggle display
    setDisplayMobileNav((prev) => !prev);
  };

  return (
    <>
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

      <StyledMobileNav display={displayMobileNav.toString()}>
        <div id="mobile-nav-header">
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
          <StyledButton onClick={open}>
            <Icon type="menu" />
          </StyledButton>
        </div>

        {displayMobileNav && (
          <div id="mobile-nav-links">
            <aside id="left">
              <Logo size="20px" />
              <h2>Paper Wallet</h2>
            </aside>
            <aside id="right">
              <Link to="/">Home</Link>
              <Link to="/airdrop">Airdrop</Link>
              <Link to="/store">Store</Link>
              <Link to="/redeem">Redeem</Link>
            </aside>
          </div>
        )}
      </StyledMobileNav>
    </>
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

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const StyledMobileNav = styled.nav`
  ${({ display }) => display === "true" && `background-color: black;`}

  display: none;
  box-sizing: border-box;
  width: 100vw;
  padding: 1em 2em;

  @media only screen and (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  #mobile-nav-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #mobile-nav-links {
    box-sizing: border-box;
    margin-top: 2em;
    padding-bottom: 1em;
    width: 100%;
    display: flex;
    justify-content: space-between;

    #left {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    #right {
      display: flex;
      flex-direction: column;

      a {
        text-align: right;
        text-decoration: none;
        color: white;
        font-size: 2em;
        font-family: Lato Regular;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const StyledButton = styled.span`
  font-size: 2em;

  &:hover {
    cursor: pointer;
  }
`;
