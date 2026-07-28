# Blockchain Exports

This repository contains blockchain transaction and block data exports:

- ERC-1155 NFT mints from contract `0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b` (April 2024)
- ETH transactions from June 14, 2026 (block 25313676)
- ETH blocks from June 1, 2026

## Verbose Exports

Detailed blockchain data files are included for analysis and auditing purposes. All transaction hashes, addresses, timestamps, and values are preserved in their original form.

See `verbose-exports.md` for full details.

## Stripe Connect Payout

A simple Node.js script to send funds to a connected Stripe account using **Stripe Connect Transfers**.

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file and add your keys:

```bash
cp .env.example .env
```

Edit `.env`:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_CONNECTED_ACCOUNT_ID=acct_...
PAYOUT_AMOUNT_CENTS=1000
PAYOUT_CURRENCY=usd
```

- Get your secret key from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- Create or find a connected account under **Connect** in the dashboard

3. Run a dry-run (no money moves):

```bash
npm run payout:dry
```

4. Run the real payout (test mode if using `sk_test_` key):

```bash
npm run payout
```

### Notes

- Always start with test keys (`sk_test_...`)
- Never commit your real `.env` file (it is ignored by design)
- Secret scanning is enabled on this repository

## Security

- Do not share clone URLs or contents publicly if the repo contains sensitive data
- Secret scanning is enabled
- Use restricted API keys when possible
- Keep `.env` out of version control

## Files

- `verbose-exports.md` – Detailed export documentation
- `nft-mints-0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b.csv` – NFT mint transactions
- `eth-transactions-2026-06-14.csv` – Ethereum transactions
- `eth-blocks-2026-06-01.csv` – Ethereum block data
- `scripts/stripe-payout.js` – Stripe Connect payout script
- `.env.example` – Environment variable template
