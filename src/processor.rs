// Helper functions (utils) go here
    
use solana_program::{
    account_info::AccountInfo,
    program_error::ProgramError,
    entrypoint::ProgramResult
};

pub fn transfer_lamports(
    from_account: &AccountInfo,
    to_account: &AccountInfo,
    amount_of_lamports: u64
) -> ProgramResult {

    if **from_account.try_borrow_lamports()? < amount_of_lamports {
        return Err(ProgramError::InsufficientFunds);
    }

    // Debit from_account and credit to_account
    **from_account.try_borrow_mut_lamports()? -= amount_of_lamports;
    **to_account.try_borrow_mut_lamports()? += amount_of_lamports;

    Ok(())
}
