/* eslint-disable @typescript-eslint/no-unused-vars */
import { rpcErrors } from '@metamask/rpc-errors';
import {
  OnCronjobHandler,
  OnTransactionHandler,
  OnTransactionResponse,
} from '@metamask/snaps-types';
import { getNotifications } from './getNotifications';
import { getTransactionInsights } from './getTransactionInsights';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}): Promise<OnTransactionResponse> => {
  return getTransactionInsights(transaction);
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'execute':
      return getNotifications();
    default:
      throw rpcErrors.methodNotFound({
        data: {
          method: request.method,
        },
      });
  }
};
