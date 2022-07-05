
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function getProvider() {
  if (!("solana" in window)) {
    console.error("[ Wallet error ] Solana is not available in this browser");
    return null;
  }

  // Opens wallet to connect
  await window.solana.connect();

  const provider = window.solana;
  if (provider.isPhantom) {
    return provider;
  } else {
    console.error("[ Wallet error ] Provider is not Phantom");
    return null;
  }
}

export async function airdrop(connection, wallet) {
  await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);
}
