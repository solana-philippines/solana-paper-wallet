import styled from "styled-components";

import * as colors from "../modules/colors";
import Icon from "./Icon";

export default function Label({ content, type }) {
  return (
    <StyledLabel>
      {type && <Icon type={type} />}
      {content}
    </StyledLabel>
  );
}

const StyledLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Lato Bold;
  font-size: 2em;
  padding: 0.5em 1.5em;
  background-color: ${colors.FOG};
  border-radius: 2em;

  box-sizing: border-box;

  span {
    box-sizing: border-box;
    font-size: 1em;
    margin-right: 15px;
  }
`;
