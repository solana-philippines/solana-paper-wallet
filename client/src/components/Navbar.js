
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as colors from '../modules/colors';

import { useWallet } from './WalletContext';

export default function Navbar() {
  const { wallet, connect } = useWallet();

  return (
    <StyledNav>
      <Link to="/">Home</Link>
      <Link to="/airdrop">Airdrop</Link>
      <Link to="/">Store</Link>
      <Link to="/">Redeem</Link>

      { !wallet && 
      <StyledConnect type="button" onClick={connect}>Connect Wallet</StyledConnect>
      }
    </StyledNav>
  );
}


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

  &:hover, &:active, &:focus {
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
