use borsh::{BorshSerialize, BorshDeserialize};

use solana_program::{
    pubkey::Pubkey,
    program_error::ProgramError,
};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct StorePayload {
    code: String
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct RedeemPayload {
    code: String,
    hash: Pubkey
}

pub enum Instruction {
    Store {
        code: String
    },
    Balance {
        code: String,
        hash: Pubkey
    },
    Redeem {
        code: String,
        hash: Pubkey
    }
}

impl Instruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (cmd, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;

        Ok(match cmd {
            0 => {
                let payload = StorePayload::try_from_slice(rest).expect("Failed to try from slice for StorePayload");
                Self::Store { code: payload.code }
            },
            1 => {
                let payload = RedeemPayload::try_from_slice(rest).expect("Failed to try from slice for RedeemPayload");
                Self::Redeem {
                    code: payload.code,
                    hash: payload.hash
                }
            },
            _ => return Err(ProgramError::InvalidInstructionData)
        })
    }
}

