
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Section from '../components/Section';

export default function NotFound() {
  return (
    <StyledMain>
      <StyledDiv>
        <Section>
          <h1 style={{margin: 0}}>Uh oh! 404 buddy</h1>
        </Section>
        <Navbar />
      </StyledDiv>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background-image: radial-gradient(circle, #00ffa2, #00eed8, #00d7ff, #00bcff, #617df2, #9355d4, #8d036e, #610e42, #340f20, #000000, #000000, #000000);
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
