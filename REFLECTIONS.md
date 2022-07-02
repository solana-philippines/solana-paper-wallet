

# How transactions go with integration testing using solana_sdk

```
// You get a transaction
let mut transaction = transfer(&payer, &user2.pubkey(), 1000000, blockhash);

// You sign transaction
transaction.sign(&[&payer], blockhash);

// You send transaction and wait for confirmation
// with the RPC
rpc_client.send_and_confirm_transaction(&transaction);
```

# You transfer lamports with a program / PDA via this

```
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
```

# Solana confirms that despite transfer of lamports with PDAs via addition the overall state of the entire transaction is verified by comparing it with the state before the transaction happened

`**to_account.try_borrow_mut_lamports()? += amount_of_lamports;`

This allows the program to determine if someone cheated with the lamports and if the transaction is valid.
