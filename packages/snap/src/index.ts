import type {
  OnTransactionHandler,
  OnTransactionResponse,
} from '@metamask/snaps-sdk';
import { panel } from '@metamask/snaps-sdk';
import { hexToBigInt } from '@metamask/utils';

import { loadChainId, loadInsights } from './loadData';
import { getErrorMessage, parseContent } from './utils';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
}): Promise<OnTransactionResponse | null> => {
  const chainId = await loadChainId();

  if (!chainId) {
    return getErrorMessage();
  }

  const insights = await loadInsights({
    chainId: hexToBigInt(chainId).toString(),
    value: hexToBigInt(transaction.value ?? '0x0').toString(),
    fromAddress: transaction.from,
    data: transaction.data,
    toAddress: transaction.to,
  });

  if (!insights || insights.components.length === 0) {
    return getErrorMessage();
  }

  if (insights.severity) {
    return {
      content: panel(insights.components.map(parseContent)),
      severity: insights.severity,
    };
  }

  return {
    content: panel(insights.components.map(parseContent)),
  };
};
