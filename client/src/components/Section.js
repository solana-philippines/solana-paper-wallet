import styled from 'styled-components';

export default function Section({ columns, children }) {
  return (
      <StyledSection columns={columns}>
        { children }
      </StyledSection>
  );
}

const StyledSection = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  grid-gap: 3em;
  box-sizing: border-box;
  padding: 5em 2em;

  margin: 3em 0;

  h1 {
    text-align: center;
    font-family: Lato Black;
    font-size: 4em;
  }

  h2 {
    font-family: Lato Black;
    font-size: 3em;
  }

  p {
    font-family: Lato Regular;
    font-size: 1.5em;
  }
`;
