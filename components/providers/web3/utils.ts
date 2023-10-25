import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { type } from "os";

export type Web3Params = {
  ethereum?: MetaMaskInpageProvider | null;
  provider?: providers.Web3Provider | null;
  contract?: Contract | null;
};

export type Web3State = {
  isLoading: boolean; //true wihile loading web3
} & Web3Params;

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
  };
};

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
