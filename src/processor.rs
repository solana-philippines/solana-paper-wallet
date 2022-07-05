// Helper functions (utils) go here
    
use solana_program::{
    account_info::AccountInfo,
    program_error::ProgramError,
    entrypoint::ProgramResult,
    pubkey::Pubkey
};

use crate::error::CustomError;

// Initial input validations
pub fn validate_input(
    user_account: &AccountInfo,
    holder_pda: &Pubkey
) -> ProgramResult {

    // PDA key being accessed is not the intended
    if user_account.key != holder_pda {
        return Err(CustomError::InvalidCredentials.into());
    }

    Ok(())
}

// Transfer lamports between accounts
pub fn transfer_lamports(
    from_account: &AccountInfo,
    to_account: &AccountInfo,
    amount_of_lamports: u64
) -> ProgramResult {

    if **from_account.try_borrow_lamports()? < amount_of_lamports {
        return Err(ProgramError::InsufficientFunds);
    }

    // Debit from_account
    **from_account.try_borrow_mut_lamports()? -= amount_of_lamports;

    // Credit to_account
    **to_account.try_borrow_mut_lamports()? += amount_of_lamports;

    // Credit amount - Debit amount == 0 or it'll fail
    Ok(())
}
