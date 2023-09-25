export const ADDRESSES = {
  USER: '0xde5ce4c3f4164994a7794f6ad787a2628b4d4085',
  PROTOCOL: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2', // Aave v3 pool
  BAD_RATING_PROTOCOL: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // cDai contract
  UNKNOWN_PROTOCOL: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5', // cEther contract
};

type CommentsResponse = {
  comments: [
    {
      id: number;
      body: string;
      postId: number;
      user: {
        id: number;
        username: string;
      };
    },
  ];
};

export async function getMessages(): Promise<CommentsResponse> {
  return fetch('https://dummyjson.com/comments?limit=3').then(
    (res) => res.json() as Promise<CommentsResponse>,
  );
}

export async function getAccounts(): Promise<string[]> {
  return ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      if (accounts) {
        return accounts;
      }
    })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}
