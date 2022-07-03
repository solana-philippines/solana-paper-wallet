import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Nav() {
  return (
    <StyledNav>
      <Link to="/instruction">Start Here</Link>
      <Link to="/faucet">Get SOL</Link>
      <Link to="/">Store</Link>
      <Link to="/redeem">Redeem</Link>
    </StyledNav>
  );
} 

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 10px
  }
`;
