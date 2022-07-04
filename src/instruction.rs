use borsh::{BorshSerialize, BorshDeserialize};

use solana_program::{
    pubkey::Pubkey,
    program_error::ProgramError,
};

use crate::error::CustomError;

// Store struct for deserializing instruction data
// Used for the "rest" of the instruction data
#[derive(BorshSerialize, BorshDeserialize)]
pub struct StorePayload {
    code: String
}

// Redeem struct for deserializing instruction data
// Used for the "rest" of the instruction data
#[derive(BorshSerialize, BorshDeserialize)]
pub struct RedeemPayload {
    code: String,
    hash: Pubkey
}

// Instructions available
pub enum Instruction {
    // Accounts expected
    // 0. [signer] The account of the person initializing the store
    // 1. [writable] The PDA of where the lamports will be held
    // 2. [] System program for account creation
    Store {
        // Password / Secret phrase to be used in storing
        code: String
    },

    // Accounts expected
    // 0. [signer] The account of the person initializing the Redeem 
    // 1. [] The PDA of where the lamports are currently held
    Redeem {
        // Password / Secret phrase that was used in storing
        code: String,

        // WARNING: The use of pubkey directly is TEMPORARY.
        // I will eventually use a hash seeded with Pubkey
        // Public key of the wallet used in storing
        hash: Pubkey
    }
}


//
//
// Instruction Mapping
//
// inst 0: Store
// inst 1: Redeem
//
//
impl Instruction {
    // Parses the Instruction data into relevant data structures
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (inst, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        Ok(match inst {
            // 0. Store Command
            // Store all SOL from signer account to Holder PDA
            0 => {
                // Deserialize the rest of the instruction data
                // based on Store payload
                let payload = StorePayload::try_from_slice(rest)
                    .expect("Failed to try from slice for StorePayload");

                // return Instruction::Store { code }
                Self::Store {
                    code: payload.code
                }
            },

            // 1. Redeem Command
            // Redeem all SOL from Holder PDA to signer account
            1 => {
                // Deserialize the rest of the instruction data
                // based on Redeem payload
                let payload = RedeemPayload::try_from_slice(rest)
                    .expect("Failed to try from slice for RedeemPayload");

                // return Instruction::Redeem { code, hash }
                Self::Redeem {
                    code: payload.code,
                    hash: payload.hash
                }
            },

            // *. Instruction command was not recognized
            _ => return Err(CustomError::InvalidInstructionCommand.into())
        })
    }
}


// Unit Tests
