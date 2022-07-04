import styled from 'styled-components';

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <StyledMain>
      <h1>Not Found Yo</h1>
      <Link to="/">Go Back Home</Link>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default NotFound;
