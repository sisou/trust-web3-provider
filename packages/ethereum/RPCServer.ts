import { IRequestArguments } from './types';

export type RpcCallHandler = (rpcUrl: string, payload: object) => Promise<any>;

export interface RPC {
  call<T>(payload: {
    jsonrpc: string;
    method: string;
    params: IRequestArguments['params'];
  }): Promise<T>;
}

export class RPCServer implements RPC {
  #rpcUrl: string;
  #rpcCallHandler?: RpcCallHandler;

  constructor(rpcUrl: string, rpcCallHandler?: RpcCallHandler) {
    this.#rpcUrl = rpcUrl;
    this.#rpcCallHandler = rpcCallHandler;
  }

  async getBlockNumber() {
    const json = await this.call({
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
    });

    return json.result;
  }

  async getBlockByNumber(number: number) {
    const json = await this.call({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [number, false],
    });

    return json.result;
  }

  getFilterLogs(filter: string) {
    return this.call({
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [filter],
    });
  }

  async call(payload: {
    jsonrpc: string;
    method: string;
    params: IRequestArguments['params'];
  }) {
    const fullPayload = {
      id: new Date().getTime() + Math.floor(Math.random() * 1000),
      ...payload,
    };

    console.log('[RPCServer] call() method:', payload.method, 'hasHandler:', !!this.#rpcCallHandler);

    let json: any;

    if (this.#rpcCallHandler) {
      // Use native bridge in order to let the host make the RPC call
      json = await this.#rpcCallHandler(this.#rpcUrl, fullPayload);
    } else {
      // Fallback to direct fetch (may be blocked by CSP)
      const response = await fetch(this.#rpcUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullPayload),
      });

      json = await response.json();
    }

    if (!json.result && json.error) {
      throw new Error(json.error.message || 'rpc error');
    }

    return json.result;
  }
}
