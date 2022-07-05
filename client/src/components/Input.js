import styled from 'styled-components';

import * as colors from '../modules/colors';

export default function Input({ reference }) {
  return (
    <StyledInput ref={reference} type="text" />
  );
}

const StyledInput = styled.input`
  text-align: center;
  box-sizing: border-box;
  font-family: Lato Bold;
  padding: 0.5em 1.5em;
  font-size: 2em;
  background-color: ${colors.FOG};
  border: 5px solid transparent;
  border-radius: 2em;

  width: 100%;
  max-width: 500px;

  color: ${colors.WHITE};

  &:hover, &:active, &:focus {
    border: 5px solid ${colors.GLASS};
  }
`;
