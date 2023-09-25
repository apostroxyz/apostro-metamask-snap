import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { getAccounts, getMessages } from './shared';

export async function getNotifications() {
  const accounts = await getAccounts();
  const result = await Promise.all(
    accounts.map(async (account) => {
      const messages = await getMessages();
      return [
        heading(account),
        divider(),
        messages.comments.map((item) => text(item.body)),
      ];
    }),
  );

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel(result.flat(2)),
    },
  });
}
