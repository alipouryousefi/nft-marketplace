import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";
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

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
  name: string,
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    Promise.reject("Network id is not defined");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  if (Artifact.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi,
      provider
    );
    return contract;
  }else{
    return Promise.reject(`Contract: [${name}] cannot be loaded!`)
  }
};
