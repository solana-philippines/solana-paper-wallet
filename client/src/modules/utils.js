import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { jsPDF } from "jspdf";

import { useError } from "../components/ErrorContext";

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

export async function airdrop(connection, walletPubkey) {
  try {
    await connection.requestAirdrop(walletPubkey, 1 * LAMPORTS_PER_SOL);
  } catch (e) {
    console.error(e);
  }
}

export function getPrintable(txSignature, code, hash) {
  const doc = new jsPDF();

  doc.text("Tx: " + txSignature, 10, 10);
  doc.addImage("/assets/logo.png", "PNG", 10, 20, 20, 20, "logo", "NONE", 0);
  doc.text(code.slice(0, 1) + "..." + code.slice(-1), 10, 50);
  doc.text(hash, 10, 60);
  doc.text("---------- CUT HERE ----------", 10, 70);
  doc.save("printable.pdf");
}
