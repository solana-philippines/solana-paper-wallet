use solana_program::{program_error::ProgramError};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum CustomError {
    // This is custom program error 0x0
    #[error("Wrong credentials")]
    InvalidCredentials,

    // Custom program error 0x1... so on...
    #[error("Instruction command was not recognized")]
    InvalidInstructionCommand,

    #[error("Wrong account owner")]
    InvalidAccountOwner,

    #[error("Holder account not empty")]
    InvalidNotEmptyStore,

    #[error("Holder account is empty")]
    InvalidEmptyRedeem
}

impl From<CustomError> for ProgramError {
    fn from(e: CustomError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
