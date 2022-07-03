// #![cfg(feature = "test-bpf")]

use {
    assert_matches::*,
    solana_program::{
        // msg,
        instruction::{AccountMeta, Instruction},
        pubkey::Pubkey,
        system_program
    },
    solana_sdk::{signature::Signer, signer::keypair::Keypair, transaction::Transaction, system_transaction::transfer},
    solana_validator::test_validator::*,
    borsh::{BorshSerialize, BorshDeserialize}
};

// Schema
#[derive(BorshSerialize, BorshDeserialize)]
pub struct StorePayload {
    code: String
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct RedeemPayload {
    code: String,
    hash: Pubkey
}

// #[test]
// fn test_store_sol() {
//     solana_logger::setup_with_default("solana_runtime::message=debug");
//
//     let program_id = Pubkey::new_unique();
//
//     let (test_validator, payer) = TestValidatorGenesis::default()
//         .add_program("target/deploy/solana_paper_wallet", program_id)
//         .start();
//
//     let rpc_client = test_validator.get_rpc_client();
//
//     let blockhash = rpc_client.get_latest_blockhash().unwrap();
//
//     // Construct instruction_data
//     let payload_struct = StorePayload {
//         code: "mycode".to_string()
//     };
//
//     let mut payload = payload_struct.try_to_vec().unwrap();
//     let mut instruction_data = vec![0];
//
//     instruction_data.append(&mut payload);
//
//     let (pda, bump_seed) = Pubkey::find_program_address(&[payload_struct.code.as_bytes(), payer.pubkey().as_ref()], &program_id);
//
//     let account_data = vec![
//       AccountMeta::new(payer.pubkey(), true),
//       AccountMeta::new(pda, false),
//       AccountMeta::new(system_program::ID, false),
//     ];
//
//     let mut transaction = Transaction::new_with_payer(
//         &[
//           Instruction {
//               program_id,
//               accounts: account_data,
//               data: instruction_data,
//           },
//         ],
//         Some(&payer.pubkey())
//     );
//     transaction.sign(&[&payer], blockhash);
//
//     assert_matches!(rpc_client.send_and_confirm_transaction(&transaction), Ok(_));
// }

#[test]
fn test_redeem_sol() {
    solana_logger::setup_with_default("solana_runtime::message=debug");

    let program_id = Pubkey::new_unique();

    let (test_validator, payer) = TestValidatorGenesis::default()
        .add_program("target/deploy/solana_paper_wallet", program_id)
        .start();

    

    let rpc_client = test_validator.get_rpc_client();

    let blockhash = rpc_client.get_latest_blockhash().unwrap();


    // new account 
    let user2 = Keypair::new();

    let mut transaction = transfer(&payer, &user2.pubkey(), 1000000, blockhash);
    transaction.sign(&[&payer], blockhash);
    rpc_client.send_and_confirm_transaction(&transaction);

    let balance = rpc_client.get_balance(&user2.pubkey()).expect("Failed to get balance from rpc_client");
    println!("AFTER TRANSFER user2 balance: {:?}", balance);

    // Construct instruction_data
    let payload_struct = StorePayload {
        code: "mycode".to_string()
    };

    let mut payload = payload_struct.try_to_vec().unwrap();
    let mut instruction_data = vec![0];

    instruction_data.append(&mut payload);

    let (pda, bump_seed) = Pubkey::find_program_address(&[payload_struct.code.as_bytes(), payer.pubkey().as_ref()], &program_id);

    let account_data = vec![
      AccountMeta::new(payer.pubkey(), true),
      AccountMeta::new(pda, false),
      AccountMeta::new(system_program::ID, false)
    ];

    println!("account_data: {:?}", account_data);


    let mut transaction = Transaction::new_with_payer(
        &[
          Instruction {
              program_id,
              accounts: account_data,
              data: instruction_data,
          },
        ],
        Some(&payer.pubkey())
    );
    transaction.sign(&[&payer], blockhash);


    assert_matches!(rpc_client.send_and_confirm_transaction(&transaction), Ok(_));


    // Construct instruction_data
    let payload_struct = RedeemPayload {
        code: "mycode".to_string(),
        hash: payer.pubkey()
    };

    let mut payload = payload_struct.try_to_vec().unwrap();
    let mut instruction_data = vec![1];

    instruction_data.append(&mut payload);

    let hash = payer;
    let (pda, bump_seed) = Pubkey::find_program_address(&[payload_struct.code.as_bytes(), hash.pubkey().as_ref()], &program_id);

    let account_data = vec![
      AccountMeta::new(user2.pubkey(), true),
      AccountMeta::new(pda, false),
      AccountMeta::new(system_program::ID, false),
    ];

    let mut transaction = Transaction::new_with_payer(
        &[
          Instruction {
              program_id,
              accounts: account_data,
              data: instruction_data,
          },
        ],
        Some(&user2.pubkey())
    );
    transaction.sign(&[&user2], blockhash);
    rpc_client.send_and_confirm_transaction(&transaction).expect("hotdog");


    let new_balance = rpc_client.get_balance(&user2.pubkey()).expect("Failed to get balance from rpc_client");
    println!("after user2 balance: {:?}", new_balance);
    println!("user2: {:?}", new_balance);

    // assert_matches!(rpc_client.send_and_confirm_transaction(&transaction), Ok(_));
}
