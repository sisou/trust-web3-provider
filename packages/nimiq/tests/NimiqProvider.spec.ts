import { test, expect, jest, afterEach } from 'bun:test';
import { Web3Provider } from '@trustwallet/web3-provider-core';
import { NimiqProvider } from '../NimiqProvider';
import { AdapterStrategy } from '@trustwallet/web3-provider-core/adapter/Adapter';

let Nimiq = new NimiqProvider();
const account = '0x0000000000000000000000000000000000000000';

afterEach(() => {
  Nimiq = new NimiqProvider();
});

// Direct methods
test('Nimiq Awesome test', async () => {
  new Web3Provider({
    strategy: AdapterStrategy.PROMISES,
    handler: (request) => {
      expect(request.name).toBe('requestAccounts'); // Normalized method name
      return Promise.resolve([account])
    },
  }).registerProvider(Nimiq);

  const accounts = await Nimiq.request({ method: 'nim_requestAccounts' });
  expect(accounts).toEqual([account]);
});
