import { MetaMaskInpageProvider } from '@metamask/providers';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

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
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
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

// eslint-disable-next-line consistent-return
async function getAccount() {
  const accounts = await window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });

  if (accounts) {
    return accounts[0];
  }
}

export const ADDRESSES = {
  USER: '0xde5ce4c3f4164994a7794f6ad787a2628b4d4085',
  PROTOCOL: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2', // Aave v3 pool
  BAD_RATING_PROTOCOL: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // cDai contract
  UNKNOWN_PROTOCOL: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5', // cEther contract
};
export async function sendTransactionToUser() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.USER,
          value: '1000000',
          from: account,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function sendTransactionToProtocol() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.PROTOCOL,
          data: '0xe8eda9df000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000ef63e22c7b41d99cfa57592bf23722ffc092dae00000000000000000000000000000000000000000000000000000000000000000',
          value: '1000000',
          from: account,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function sendTransactionToBadRatingProtocol() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.BAD_RATING_PROTOCOL,
          value: '100000',
          data: '0x3e94101000000000000000000000000000000000000000000000000000000000000186a0',
          from: account,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function sendTransactionToUnknownProtocol() {
  try {
    const account = await getAccount();
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESSES.UNKNOWN_PROTOCOL,
          value: '1000',
          data: '0xc5ebeaec00000000000000000000000000000000000000000000000000000000000003e8',
          from: account,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
