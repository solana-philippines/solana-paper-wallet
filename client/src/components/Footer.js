
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Section from '../components/Section';
import * as colors from '../modules/colors';

export default function Footer() {
  return (
    <StyledFooter>
      <Section columns={2}>
        <h2 style={{ textAlign: "left" }}>Paper Wallet</h2>
        <StyledFooterNav>
          <Link to="/">Home</Link>
          <Link to="/">Airdrop</Link>
          <Link to="/">Store</Link>
          <Link to="/">Redeem</Link>
        </StyledFooterNav>
      </Section>
      <StyledCopyright>
        <p>&copy; Kristian Quirapas</p>
      </StyledCopyright>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 5em 0;

  h1 {
    font-family: Lato Bold;
    font-size: 2em;
  }

  p {
    color: ${colors.GREY};
    font-family: Lato Regular;
    font-size: 1.5em;
  }

  a {
    font-size: 1em;
    font-family: Lato Bold;
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledFooterNav = styled.nav`
  margin: 3em 5em;
  display: flex;
  flex-direction: column;
  text-align: right;

  a {
    font-size: 2em;
    font-family: Lato Regular;
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledCopyright = styled.div`
  border-top: 1px solid #474747;
  padding: 2em 0;
  font-family: Lato Regular;
`;
