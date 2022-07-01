use solana_program::{
    msg,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::{next_account_info, AccountInfo},
    system_instruction
};

use crate::instruction::Instruction;

entrypoint!(process_instruction);
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {

    let instruction = Instruction::unpack(instruction_data)?;

    let account_info_iter = &mut accounts.iter();
    let initializer = next_account_info(account_info_iter)?;
    let user_account = next_account_info(account_info_iter)?;

    match instruction {
        Instruction::Store { code } => {
            let (pda, bump_seed) = Pubkey::find_program_address(&[code.as_bytes()], program_id);

            msg!("pda.key: {}", pda);
            msg!("user_account.key: {}", user_account.key);

            // invoke_signed(
            //     &system_instruction::create_account(
            //     );
            // );
        },

        Instruction::Redeem { code, hash } => {
        }
    }

    Ok(())
}


