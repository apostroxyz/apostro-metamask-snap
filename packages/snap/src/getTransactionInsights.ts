import { Json } from '@metamask/snaps-types';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { ADDRESSES, getMessages } from './shared';

export async function getTransactionInsights(transaction: {
  [key: string]: Json;
}) {
  const info = await getMessages();
  const messages = info.comments.map((item) => text(item.body));

  // TODO: need to check the transaction to the user's account.
  if (typeof transaction.data === 'undefined') {
    return {
      content: panel([
        text(
          'This snap only provides transaction insights for interactions with contracts.',
        ),
      ]),
    };
  }

  if (transaction.to === ADDRESSES.PROTOCOL) {
    return {
      content: panel(
        [
          heading('Protocol Name'),
          divider(),
          text('Some text about protocol'),
          copyable('link to explorer'),
        ].concat(messages),
      ),
    };
  }

  if (transaction.to === ADDRESSES.BAD_RATING_PROTOCOL) {
    return {
      content: panel([
        heading('Protocol Name'),
        text('Some text about protocol'),
        copyable('Link to explorer'),
      ]),
    };
  }

  if (transaction.to === ADDRESSES.UNKNOWN_PROTOCOL) {
    return {
      content: panel([
        heading('Protocol not found'),
        text('You can see other protocols on our website.'),
        copyable('Link to explorer/protocols'),
      ]),
    };
  }

  return { content: null };
}
