#!/usr/bin/env bash

# Make sure to build first
cargo build-bpf

# Specific test no msg!() logs
# cargo test test_validator_transaction

# Outputs the msg!() logs
# cargo test --test integration
# cargo test test_validator_transaction -- --nocapture
# cargo test test_check_balance -- --nocapture
# cargo test test_check_balance -- --nocapture

cargo test test_redeem_sol -- --nocapture
