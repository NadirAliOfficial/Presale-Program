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
<!-- updated: 2025-12-09-r01 -->

## Description
This repository contains a Solana on‑chain program written in Rust using the Anchor framework that manages a private token sale with whitelist access, multiple sale stages, price configuration, and token vesting. The accompanying Next.js front‑end provides a web interface for users to view the sale, contribute, and read the whitepaper.

## Installation
```bash
npm install
```

## Usage
```bash
npm run dev
```

## Project Structure
- `src/app/[lang]/Presale/Presale.tsx` – Main presale component implementation
- `src/app/[lang]/Presale/page.tsx` – Presale page entry point
- `src/app/[lang]/Whitepaper/page.tsx` – Whitepaper page
- `src/app/[lang]/dictionaries.ts` – Internationalization dictionary loader
- `src/components/` – Reusable React components (Navbar, Footer, Hero, etc.)
- `middleware.js` & `src/middleware.js` – Next.js middleware files
- `next.config.ts`, `next-env.d.ts` – Next.js configuration
- `tailwind.config.ts` – Tailwind CSS configuration
- `package.json` – Project dependencies and scripts
- `LICENSE` – MIT license
