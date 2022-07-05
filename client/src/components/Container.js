
import styled from 'styled-components';

export default function Container({ children }) {
  return (
    <StyledMain>
      <StyledHolder>
        { children }
      </StyledHolder>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  position: relative;
  font-family: Lato Regular;
  background-color: black;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const StyledHolder = styled.div`
  position: relative;
  width: 100vw;
  max-width: 1000px;
`;
