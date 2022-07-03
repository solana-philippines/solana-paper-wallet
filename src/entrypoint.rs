
/*
 *  What happens if I empty out the account from lamports?
 *
 *  What happens when I transfer all from an account will it close and zero out the data?
 *
 */
use solana_program::{
    msg,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::{next_account_info, AccountInfo},
    system_instruction,
    program::{invoke_signed},
    program_error::ProgramError,
    sysvar::{rent::Rent, Sysvar}
};

use borsh::{BorshSerialize, BorshDeserialize};

use crate::instruction::Instruction;

use crate::state::Holder;

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

            msg!("initializer as_ref {:?}", initializer.key.as_ref());
            msg!("user_account: {}", user_account.key);
            msg!("pda: {}", pda);

            if user_account.key != &pda {
              return Err(ProgramError::InvalidAccountData);
            }

            // Compute rent
            let rent = Rent::get()?;
            let account_len: usize = 1; // For u8 bump_seed
            let rent_lamports = rent.minimum_balance(account_len);


            // Create PDA account
            msg!("user balance before transfer: {}", initializer.lamports());
            msg!("pda balance before transfer: {}", user_account.lamports());
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
            msg!("user balance after transfer: {}", initializer.lamports());
            msg!("pda balance after transfer: {}", user_account.lamports());

            // Update pda
            let holder = Holder { bump_seed };
            holder.serialize(&mut &mut user_account.data.borrow_mut()[..])?;

            msg!("user account owner: {:?}", user_account.owner);

            let test = Holder::try_from_slice(&user_account.data.borrow()).unwrap();
            msg!("store bump_seed: {:?}", test.bump_seed);
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

            msg!("user 2 before {}", initializer.lamports());

            transfer_lamports(user_account, initializer, user_account.lamports())?;
            msg!("user 2 after {}", initializer.lamports());

            // Zero out data
            // *user_account.data.borrow_mut() = &mut [];

            msg!("Redeem success");
        },


        Instruction::Balance { code, hash } => {
        }
    }

    Ok(())
}

fn transfer_lamports(
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
