import * as borsh from '@project-serum/borsh';
import * as web3 from '@solana/web3.js';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

const PROGRAM_ID = 'ELUr5zjYLapKTVNaKXUFu3A5CUM21YMUhf6VSxhnZrB9';

const StoreSchema = borsh.struct([
  borsh.u8('inst'),
  borsh.str('code')
]);

async function paperStore(connection, provider, code) {
  // build instruction buffer
  let buffer = Buffer.alloc(1000);

  StoreSchema.encode({
    inst: 0,
    code
  }, buffer);

  buffer = buffer.slice(0, StoreSchema.getSpan(buffer));

  // PDA findProgramAddress
  const [userAccountPDA, bump] =
    await web3.PublicKey.findProgramAddress([
      Buffer.from(code),
      provider.publicKey.toBuffer()
    ], new web3.PublicKey(PROGRAM_ID));

  // create solana Instruction
  const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: provider.publicKey,
        isSigner: true,
        isWritable: false
      },
      {
        pubkey: userAccountPDA,
        isSigner: false,
        isWritable: true 
      },
      {
        pubkey: web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false
      },
    ],
    data: buffer,
    programId: new web3.PublicKey(PROGRAM_ID)
  });

  // create Transaction
  const transaction = new web3.Transaction();

  // add instruction to transaction
  transaction.add(instruction);

  // add feepayer to transction
  transaction.feePayer = provider.publicKey;

  // add recent blockhash to transaction
  const blockhashPromise =
    await connection.getLatestBlockhash(connection.commitment);
  const blockhash = await blockhashPromise.blockhash;

  transaction.recentBlockhash = blockhash;

  // sign transaction
  const signedTransaction = await provider.signTransaction(transaction);

  const signature = await connection.sendRawTransaction(signedTransaction.serialize());

  await connection.confirmTransaction(signature);

  return signature;
}


// wallet 1 hash: 38AUuVE5SunNhv6BaQMFCYKtK4E2QGVPGuzCxAYw7SUM
// treasury hash: Wd7Cmk63QmZU1t8ivf5mYsmMeBNRYqj8BTFoUGPX8ht
const RedeemSchema = borsh.struct([
  borsh.u8('inst'),
  borsh.str('code'),
  borsh.publicKey('hash')
]);

async function paperRedeem(connection, provider, code, hash) {
  // build instruction buffer
  let buffer = Buffer.alloc(1000);

  RedeemSchema.encode({
    inst: 1,
    code,
    hash
  }, buffer);

  buffer = buffer.slice(0, RedeemSchema.getSpan(buffer));

  // PDA findProgramAddress
  const [userAccountPDA, bump] =
    await web3.PublicKey.findProgramAddress([
      Buffer.from(code),
      hash.toBuffer()
    ], new web3.PublicKey(PROGRAM_ID));

  // create solana Instruction
  const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: provider.publicKey,
        isSigner: true,
        isWritable: false
      },
      {
        pubkey: userAccountPDA,
        isSigner: false,
        isWritable: true
      },
      {
        pubkey: web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false
      },
    ],
    data: buffer,
    programId: new web3.PublicKey(PROGRAM_ID)
  });

  // create Transaction
  const transaction = new web3.Transaction();

  // add instruction to transaction
  transaction.add(instruction);

  // add feepayer to transction
  transaction.feePayer = provider.publicKey;

  // add recent blockhash to transaction
  const blockhashPromise =
    await connection.getLatestBlockhash(connection.commitment);
  const blockhash = await blockhashPromise.blockhash;

  transaction.recentBlockhash = blockhash;

  // sign transaction
  const signedTransaction = await provider.signTransaction(transaction);

  const signature = await connection.sendRawTransaction(signedTransaction.serialize());

  await connection.confirmTransaction(signature);

  return signature;
}

export {
  paperStore,
  paperRedeem
};
