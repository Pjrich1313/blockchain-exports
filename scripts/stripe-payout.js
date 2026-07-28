#!/usr/bin/env node
/**
 * Stripe Connect Payout Script
 *
 * Creates a transfer (payout) to a connected Stripe account.
 * Uses Stripe Connect Transfers API.
 *
 * Usage:
 *   1. Copy .env.example to .env and fill in your keys
 *   2. npm install
 *   3. npm run payout          # live (test mode if using sk_test_)
 *   4. npm run payout:dry      # dry-run (no API call)
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY
 *   STRIPE_CONNECTED_ACCOUNT_ID
 *
 * Optional:
 *   PAYOUT_AMOUNT_CENTS  (default 1000 = $10.00)
 *   PAYOUT_CURRENCY      (default usd)
 */

require('dotenv').config();
const Stripe = require('stripe');

const DRY_RUN = process.argv.includes('--dry-run');

const secretKey = process.env.STRIPE_SECRET_KEY;
const connectedAccountId = process.env.STRIPE_CONNECTED_ACCOUNT_ID;
const amountCents = parseInt(process.env.PAYOUT_AMOUNT_CENTS || '1000', 10);
const currency = (process.env.PAYOUT_CURRENCY || 'usd').toLowerCase();

function fail(msg) {
  console.error('\n❌ Error:', msg);
  process.exit(1);
}

async function main() {
  console.log('========================================');
  console.log('  Stripe Connect Payout');
  console.log('========================================\n');

  if (!secretKey) {
    fail('STRIPE_SECRET_KEY is missing. Copy .env.example to .env and set your key.');
  }
  if (!connectedAccountId) {
    fail('STRIPE_CONNECTED_ACCOUNT_ID is missing. Set the connected account ID (acct_...).');
  }
  if (!connectedAccountId.startsWith('acct_')) {
    fail('STRIPE_CONNECTED_ACCOUNT_ID should start with "acct_".');
  }
  if (isNaN(amountCents) || amountCents < 1) {
    fail('PAYOUT_AMOUNT_CENTS must be a positive integer (cents).');
  }

  const mode = secretKey.startsWith('sk_live_') ? 'LIVE' : 'TEST';
  console.log(`Mode:              ${mode}`);
  console.log(`Connected account: ${connectedAccountId}`);
  console.log(`Amount:            ${(amountCents / 100).toFixed(2)} ${currency.toUpperCase()}`);
  console.log(`Dry-run:           ${DRY_RUN ? 'YES (no money moved)' : 'NO'}\n`);

  if (DRY_RUN) {
    console.log('✅ Dry-run complete. No API call was made.');
    console.log('   Remove --dry-run (or use npm run payout) to execute for real.\n');
    return;
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia',
  });

  try {
    // Create a transfer to the connected account (Stripe Connect)
    const transfer = await stripe.transfers.create({
      amount: amountCents,
      currency: currency,
      destination: connectedAccountId,
      description: 'Payout from blockchain-exports',
      metadata: {
        source: 'blockchain-exports',
        script: 'stripe-payout.js',
        timestamp: new Date().toISOString(),
      },
    });

    console.log('✅ Transfer created successfully!');
    console.log('----------------------------------------');
    console.log(`Transfer ID:  ${transfer.id}`);
    console.log(`Amount:       ${(transfer.amount / 100).toFixed(2)} ${transfer.currency.toUpperCase()}`);
    console.log(`Destination:  ${transfer.destination}`);
    console.log(`Status:       ${transfer.reversed ? 'reversed' : 'created'}`);
    console.log(`Created:      ${new Date(transfer.created * 1000).toISOString()}`);
    console.log('----------------------------------------\n');
  } catch (err) {
    console.error('\n❌ Stripe API error:');
    console.error(`   Type:    ${err.type || 'unknown'}`);
    console.error(`   Code:    ${err.code || 'n/a'}`);
    console.error(`   Message: ${err.message}`);
    if (err.raw && err.raw.message) {
      console.error(`   Detail:  ${err.raw.message}`);
    }
    process.exit(1);
  }
}

main();
