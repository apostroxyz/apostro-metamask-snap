import type { TransactionInsightResponse } from './types';

const BASE_URL = 'https://prod.apostro.io';
const TRANSACTION_INFO_URL = 'api/v1/metamask/transaction/info';
// eslint-disable-next-line no-restricted-globals
const VERSION = process.env.VERSION ?? null;

export async function loadInsights({
  fromAddress,
  toAddress,
  value,
  chainId,
  data,
}: {
  fromAddress: string;
  value: string;
  chainId: string;
  data?: string;
  toAddress?: string;
}): Promise<TransactionInsightResponse | null> {
  const params = [
    `snap_version=${VERSION}`,
    `from_address=${fromAddress}`,
    `chain_id=${chainId}`,
    `value=${value}`,
    data ? `data=${data}` : null,
    toAddress ? `to_address=${toAddress}` : null,
  ]
    .filter(Boolean)
    .join('&');

  return fetch(`${BASE_URL}/${TRANSACTION_INFO_URL}?${params}`)
    .then(async (res) => res.json() as Promise<TransactionInsightResponse>)
    .catch(() => null);
}

export async function loadChainId() {
  return ethereum.request<string>({ method: 'eth_chainId' }).catch(() => null);
}
