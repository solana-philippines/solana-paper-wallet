
import { useState, useEffect, useContext, createContext } from 'react';

import { Connection, clusterApiUrl } from '@solana/web3.js';

import { getProvider } from '../modules/utils';

export const ErrorContext = createContext(null); 

export function useError() {
  return useContext(ErrorContext);
}

export function ErrorProvider({ children }) {
  const [error, setError] = useState('');

  const setErrorMessage = errorMessage => {
    setError(errorMessage);
  }

  return (
    <ErrorContext.Provider value={{error, setErrorMessage}}>
      { children }
    </ErrorContext.Provider>
  );
}
