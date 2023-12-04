import type { MetaMaskInpageProvider } from '@metamask/providers';

import { defaultSnapOrigin } from '../config';
import type { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @param provider - The MetaMask inpage provider.
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (
  provider?: MetaMaskInpageProvider,
): Promise<GetSnapsResponse> =>
  (await (provider ?? window.ethereum).request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (error) {
    console.log('Failed to obtain installed snap', error);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const sendHello = async () => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'hello' } },
  });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

// eslint-disable-next-line consistent-return
export async function getAccount() {
  const accounts = await window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });

  if (accounts) {
    return accounts[0];
  }
}

export const ADDRESSES = {
  USER: '0x0000000000000000000000000000000000000000',
  AAVE_V3: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
  IRON_BANK: '0x41c84c0e2EE0b740Cf0d31F63f3B6F627DC6b393',
  UNSUPPORTED_PROTOCOL: '0x0000000000000000000000000000000000000000',
};
export async function sendTransactionToUser() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.USER,
          value: '0x29a2241af62c0000',
          from: account,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendTransactionToAaveV3() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.AAVE_V3,
          data: '0xe8eda9df000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000ef63e22c7b41d99cfa57592bf23722ffc092dae00000000000000000000000000000000000000000000000000000000000000000',
          from: account,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendTransactionToIronBank() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.IRON_BANK,
          data: '0x3e94101000000000000000000000000000000000000000000000000000000000000186a0',
          from: account,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendTransactionToUnsupportedProtocol() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.UNSUPPORTED_PROTOCOL,
          data: '0xc5ebeaec00000000000000000000000000000000000000000000000000000000000003e8',
          from: account,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}
