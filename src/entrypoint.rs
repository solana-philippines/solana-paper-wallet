
/*
 *  What happens if I empty out the account from lamports?
 *
 *  What happens when I transfer all from an account will it close and zero out the data?
 *
 */
use solana_program::{
    // msg,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::{next_account_info, AccountInfo},
    system_instruction,
    program::invoke_signed,
    program_error::ProgramError,
    sysvar::{rent::Rent, Sysvar}
};

use borsh::{BorshSerialize, BorshDeserialize};

//
use crate::instruction::Instruction;
use crate::state::Holder;
use crate::processor::transfer_lamports;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {

    let instruction = Instruction::unpack(instruction_data)?;

    let account_info_iter = &mut accounts.iter();

    match instruction {
        Instruction::Store { code } => {
            let initializer = next_account_info(account_info_iter).expect("Failed next_account_info initializer");
            let user_account = next_account_info(account_info_iter)?;
            let system_program = next_account_info(account_info_iter)?;

            // Compute pda
            let (pda, bump_seed) = Pubkey::find_program_address(&[code.as_bytes(), initializer.key.as_ref()], program_id);

            if user_account.key != &pda {
              return Err(ProgramError::InvalidAccountData);
            }

            // Compute rent
            let rent = Rent::get()?;
            let account_len: usize = 1; // For u8 bump_seed
            let rent_lamports = rent.minimum_balance(account_len);


            // Create PDA account
            invoke_signed(
                &system_instruction::create_account(
                  initializer.key,
                  user_account.key,
                  initializer.lamports(),
                  account_len.try_into().expect("Failed to convert usize to u64"),
                  program_id
                ),
                &[initializer.clone(), user_account.clone(), system_program.clone()],
                &[&[code.as_bytes(), initializer.key.as_ref(), &[bump_seed]]]
            )?;

            // Update pda
            let holder = Holder { bump_seed };
            holder.serialize(&mut &mut user_account.data.borrow_mut()[..])?;

            let test = Holder::try_from_slice(&user_account.data.borrow()).unwrap();
        },


        Instruction::Redeem { code, hash } => {
            let initializer = next_account_info(account_info_iter).expect("Failed next_account_info initializer");
            let user_account = next_account_info(account_info_iter)?;

            // let system_program = next_account_info(account_info_iter)?;

            // Compute pda with code and hash (if they don't generate 
            // the right pda transfer of lampports wont happen
            let (pda, bump_seed) =
                Pubkey::find_program_address(
                    &[code.as_bytes(), hash.as_ref()],
                    program_id
                );

            if *user_account.key != pda {
                return Err(ProgramError::InvalidAccountData);
            }

            transfer_lamports(user_account, initializer, user_account.lamports())?;

            // Zero out data
            // *user_account.data.borrow_mut() = &mut [];
        },


        Instruction::Balance { code, hash } => {
        }
    }

    Ok(())
}


#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
