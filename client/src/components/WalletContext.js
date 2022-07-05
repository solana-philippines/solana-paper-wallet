import { useState, useEffect, useContext, createContext } from "react";

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { getProvider } from "../modules/utils";

export const WalletContext = createContext(null);

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);

  // for providing the connection to everyone
  const connection = new Connection(clusterApiUrl("devnet"), "finalized");

  useEffect(() => {}, []);

  const connect = async () => {
    setWallet(await getProvider());
  };

  return (
    <WalletContext.Provider value={{ wallet, connect, connection }}>
      {children}
    </WalletContext.Provider>
  );
}
