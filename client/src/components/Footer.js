import styled from "styled-components";
import { Link } from "react-router-dom";

import Section from "../components/Section";
import Logo from "../components/Logo";
import * as colors from "../modules/colors";

export default function Footer() {
  return (
    <StyledFooter>
      <Section columns={2}>
        <StyledDiv>
          <Logo size="30px" />
          <h2 style={{ textAlign: "left", margin: "0 0.5em" }}>Paper Wallet</h2>
        </StyledDiv>
        <StyledFooterNav>
          <Link to="/">Home</Link>
          <Link to="/airdrop">Airdrop</Link>
          <Link to="/store">Store</Link>
          <Link to="/redeem">Redeem</Link>
        </StyledFooterNav>
      </Section>
      <StyledCopyright>
        <p>&copy; Kristian Quirapas</p>
      </StyledCopyright>
    </StyledFooter>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

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
  padding: 2em;
  font-family: Lato Regular;

  p {
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 900px) {
    text-align: center;
  }
`;
