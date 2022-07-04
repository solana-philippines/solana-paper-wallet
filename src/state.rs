use borsh::{BorshSerialize, BorshDeserialize};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Holder {
  pub bump_seed: u8,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Voucher {
  pub bump_seed: u8,
  pub vouder_id: u32
}
