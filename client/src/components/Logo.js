import styled from "styled-components";

import * as colors from "../modules/colors";

export default function Logo({ size }) {
  return <StyledLogo src="/assets/logo.png" size={size}></StyledLogo>;
}

const StyledLogo = styled.img`
  width: ${({ size }) => size || "20px"};
  height: ${({ size }) => size || "20px"};
`;
