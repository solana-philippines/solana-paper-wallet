import styled from 'styled-components';

import Container from '../components/Container';
import Section from '../components/Section';
import Label from '../components/Label';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Logo from '../components/Logo';

export default function Home() {
  return (
    <>
      <StyledHeader>
        <section>
          <Logo size="60px"/>
          <h1>Solana at your <span>Fingertips</span></h1>
          <p>Store your Solana on paper then forget about it</p>
          <Label type={"handyman"} content="Now on Devnet" />
        </section>
      </StyledHeader>
      <StyledNavHolder>
        <Navbar />
      </StyledNavHolder>
      <Container>
        <Section columns={2}>
          <StyledIcon>
            <div id="circle"></div>
            <h2 id="content">What is paper wallet?</h2>
          </StyledIcon>
          <p>Paper Wallet is a tool you can use to store your Solana away from your Keypair Wallet. This is done by using a seed phrase and a hash to store your Solana in a PDA by the Paper Program.</p>
        </Section>
        <Section columns={2}>
          <h2>Why on Devnet?</h2>
          <p>I still have a lot to do with securing the code, so I want to make sure I do my maximum first before I deploy it to mainnet.</p>
        </Section>
      </Container>

      <StyledHowTo>
        <Section columns={2}>
          <Section columns={1}>
            <h1>How to test Paper Wallet</h1>
          </Section>
          <Section columns={1}>
            <Label type="front_hand" content="Claim from Airdrop"/>
            <Label type="savings" content="Store your Solana"/>
            <Label type="payments" content="Redeem in a different wallet"/>
          </Section>
        </Section>
      </StyledHowTo>

      <Container>
        <Footer />
      </Container>
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
