#!/usr/bin/env bash
cargo build-bpf
solana program deploy /home/kirby/kquirapas/projects/solana/solana-paper-wallet/target/deploy/solana_paper_wallet.so
