

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

  async request(args: { method: string; params?: any[] }): Promise<any> {
    // Normalize method names (these are the names sent to the native app)
    switch (args.method) {
      case 'nim_requestAccounts':
        args.method = 'requestAccounts';
        break;
      case 'nim_isConsensusEstablished':
        args.method = 'isConsensusEstablished';
        break;
      // Add more method normalizations if needed
      default:
        throw new Error(`Unsupported method: ${args.method}`);
    }

    return super.request(args);
  }
}
