#!/usr/bin/env bash

# Make sure to build first
cargo build-bpf

# Specific test no println!() logs
# cargo test test_validator_transaction

# Specific test with println!() logs
# cargo test test_redeem_sol -- --nocapture

# Test all
cargo test
