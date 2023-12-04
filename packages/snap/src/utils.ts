import {
  copyable,
  divider,
  heading,
  image,
  panel,
  text,
} from '@metamask/snaps-sdk';

import type { InsightContent } from './types';

export function parseContent(value: InsightContent) {
  const { component_type, content } = value;
  switch (component_type) {
    case 'copyable':
      return copyable(replaceMnemonicSymbols(content));
    case 'divider':
      return divider();
    case 'heading':
      return heading(replaceMnemonicSymbols(content));
    case 'image':
      return image(replaceMnemonicSymbols(content));
    case 'text':
      return text(replaceMnemonicSymbols(content));
    default:
      throw Error('Unexpected content type');
  }
}

export function getErrorMessage() {
  const messageContent: InsightContent[] = [
    {
      component_type: 'heading',
      content: '⚠️&nbsp;An error occurred',
    },
    {
      component_type: 'text',
      content: '&nbsp;',
    },
    {
      component_type: 'text',
      content: 'An error occurred on our side - please try again later.',
    },
  ];

  return { content: panel(messageContent.map(parseContent)) };
}

function replaceMnemonicSymbols(value: string) {
  return value.replace('&nbsp;', ' ');
}
