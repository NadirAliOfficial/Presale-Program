# Solana Private Sale Program

A Solana program written in Rust with Anchor framework — handles staged token private sale with vesting.

## Features
- Whitelist-based private sale
- Configurable sale stages and prices
- Token vesting schedule enforcement
- On-chain authority controls

## Requirements
- Rust + Anchor CLI
- Solana CLI
- Node.js (for client scripts)

## Build & Deploy
```bash
anchor build
anchor deploy --provider.cluster devnet
```

## License
MIT
<!-- updated: 2023-10-12-r01 -->
