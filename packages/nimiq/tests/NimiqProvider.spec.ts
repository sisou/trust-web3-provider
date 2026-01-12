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
    handler: () => Promise.resolve([account]),
  }).registerProvider(Nimiq);

  const accounts = await Nimiq.request({ method: 'test_method' });
  expect(accounts).toEqual([account]);
});
