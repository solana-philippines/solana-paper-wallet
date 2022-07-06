import styled from "styled-components";

import * as colors from "../modules/colors";

export default function Button({ msg, func }) {
  return (
    <StyledButton type="button" onClick={func}>
      {msg}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-family: Lato Bold;
  font-size: 2em;
  background-image: linear-gradient(to left top, #db1fff, #00ffa2);
  border: 0;
  border-radius: 2em;

  padding: 0.5em 1em;
  margin: 1em 0;

  width: 100%;
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

  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;
