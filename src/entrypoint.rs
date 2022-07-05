// Testing imports


// Program imports
use solana_program::{
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::{next_account_info, AccountInfo},
    system_instruction,
    program::invoke_signed
};

use borsh::BorshSerialize;

use crate::instruction::Instruction;
use crate::state::Holder;
use crate::error::CustomError;
use crate::processor::{transfer_lamports, validate_input};

// Set the entrypoint (First function transactions interact with)
entrypoint!(process_instruction);


// Security checks
// 1. user_account == holder PDA
// 2. user_account.owner == program_id
// 3. if store -> check if data_is_empty()
// 4. if redeem -> check if data_is_empty()
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {

    let instruction = Instruction::unpack(instruction_data)?;

    let account_info_iter = &mut accounts.iter();

    match instruction {
        Instruction::Store { code } => {
            let initializer = next_account_info(account_info_iter)?;
            let user_account = next_account_info(account_info_iter)?;
            let system_program = next_account_info(account_info_iter)?;

            // Compute Holder PDA
            let (holder, bump_seed) = Pubkey::find_program_address(&[code.as_bytes(), initializer.key.as_ref()], program_id);

            // Account Validation
            let _ = validate_input(user_account, &holder)?;

            // Instruction Specific Data Validation
            if !user_account.data_is_empty() {
                return Err(CustomError::InvalidNotEmptyStore.into());
            }

            // Account len in bytes
            let account_len: usize = 1; // For u8 bump_seed
                                        
            // Debit entire lamports from signer account
            let rent_lamports = initializer.lamports();
            
            // Create Holder PDA account
            invoke_signed(
                &system_instruction::create_account(
                  initializer.key,
                  user_account.key,
                  rent_lamports,
                  account_len.try_into().expect("Failed to convert usize to u64"),
                  program_id
                ),
                &[initializer.clone(), user_account.clone(), system_program.clone()],
                &[&[code.as_bytes(), initializer.key.as_ref(), &[bump_seed]]]
            )?;

            // Update Holder PDA
            let holder = Holder { bump_seed };
            holder.serialize(&mut &mut user_account.data.borrow_mut()[..])?;
        },


        Instruction::Redeem { code, hash } => {
            let initializer = next_account_info(account_info_iter)?;
            let user_account = next_account_info(account_info_iter)?;

            // Compute pda with code and hash (if they don't generate 
            // the right pda transfer of lampports wont happen
            let (holder, _) =
                Pubkey::find_program_address(
                    &[code.as_bytes(), hash.as_ref()],
                    program_id
                );

            // Account Validation
            let _ = validate_input(user_account, &holder)?;

            // Instruction Specific Data Validation
            if user_account.data_is_empty() {
                return Err(CustomError::InvalidEmptyRedeem.into());
            }

            // Owner Validation
            // Holder PDA must be owned by program
            if user_account.owner != program_id {
                return Err(CustomError::InvalidAccountOwner.into());
            }

            // Transfer lamports to signer from Holder PDA
            transfer_lamports(user_account, initializer, user_account.lamports())?;

            // Empty data field after redeem
            let _ = &user_account.realloc(0, true)?;
        }
    }

    Ok(())
}


// Unit tests
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
