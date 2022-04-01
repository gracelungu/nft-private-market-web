import { ethers } from "ethers";

export const isMetamaskConnected = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};
