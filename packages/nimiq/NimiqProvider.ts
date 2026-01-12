

import { BaseProvider } from '@trustwallet/web3-provider-core';
import type INimiqProvider from './types/NimiqProvider';
import type { INimiqProviderConfig } from './types/NimiqProvider';

export class NimiqProvider
  extends BaseProvider
  implements INimiqProvider
{
  static NETWORK = 'nimiq';

  constructor(config?: INimiqProviderConfig) {
    super();
    // Your constructor logic here for setting config
  }

  getNetwork(): string {
    return NimiqProvider.NETWORK;
  }
}
