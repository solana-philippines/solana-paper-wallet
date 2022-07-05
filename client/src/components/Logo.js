import styled from 'styled-components';

import * as colors from '../modules/colors';

export default function Logo({ size }) {
  return (
    <StyledLogo size={size}></StyledLogo>
  );
}

const StyledLogo = styled.div`
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  border-radius: 100%;
  background-image: linear-gradient(to left top, #db1fff, #00ffa2);
`;
