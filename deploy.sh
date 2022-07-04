#!/usr/bin/env bash
cargo build-bpf
solana program deploy ./target/deploy/solana_paper_wallet.so
