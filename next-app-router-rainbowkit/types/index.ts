export interface Event {
    event: string;
    data: Record<string, any>;
    metadata: Record<string, any>;
}

export type EASChainConfig = {
    chainId: number;
    chainName: string;
    version: string;
    contractAddress: string;
    schemaRegistryAddress: string;
    etherscanURL: string;
    /** Must contain a trailing dot (unless mainnet). */
    subdomain: string;
    contractStartBlock: number;
    rpcProvider: string;
  };