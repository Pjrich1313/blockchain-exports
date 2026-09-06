## Documentation Index
> Fetch the complete documentation index at: https://docs.etherscan.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Welcome to the Etherscan API

> The complete onchain data API for the crypto ecosystem

Etherscan is the most used block explorer in crypto, and the [Etherscan API](https://etherscan.io/api) gives you the same reliable data behind it across 60+ EVM chains. It is the reference layer teams trust to verify balances, transfers, internal transactions, and contract activity, with accuracy that holds up in front of users, finance, and compliance.

* [**Onchain data API**](/endpoint-overview): balances, transactions, token transfers, contract source code, logs, gas, and stats through REST endpoints.
* [**Etherscan Metadata**](/metadata/introduction): the identity layer of names, labels, and reputation for addresses, the same as on etherscan.io. Use it alone or alongside the onchain data API.

## Get Started

<Columns cols={2}>
  <Card title="Set Up Your API Key" icon="key" href="/set-up-your-api-key" horizontal>
    Create your Etherscan API key and make your first API call.
  </Card>

  <Card title="Build with AI" icon="robot" href="/build-with-ai/introduction" horizontal>
    Connect agents to live data with MCP, the CLI, and skills.
  </Card>

  <Card title="Supported Chains" icon="circle-nodes" href="/supported-chains" horizontal>
    All 60+ EVM chains under one key. Set `chainid` to choose one.
  </Card>

  <Card title="Rate Limits" icon="gauge-high" href="/rate-limits" horizontal>
    The calls per second and daily limits for each plan.
  </Card>

  <Card title="Endpoint Showcase" icon="diagram-project" href="/endpoint-showcase" horizontal>
    See which endpoints power each page on etherscan.io.
  </Card>
</Columns>

## Use Cases

<Columns cols={2}>
  <Card title="Wallet and Portfolio" icon="wallet" href="/resources/wallet-and-portfolio" horizontal>
    Token balances, transactions, and NFT holdings across every chain. Build with `tokenbalance`, `txlist`, `tokennfttx`.
  </Card>

  <Card title="Tax and Accounting" icon="file-invoice-dollar" href="/resources/tax-and-accounting" horizontal>
    Records for filings and audits: internal transactions, transfers, historical balances, and name tags.
  </Card>

  <Card title="Security and Compliance" icon="shield-halved" href="/resources/security-and-compliance" horizontal>
    Screeners, monitoring, and risk dashboards. Build with `getaddresstag`, `getsourcecode`, `fundedby`.
  </Card>

  <Card title="Onchain Analytics and Research" icon="chart-line" href="/resources/analytics-and-research" horizontal>
    Dashboards from transfers, holders, network stats. Build with `dailytx`, `tokenholderlist`, `getlogs`.
  </Card>
</Columns>
