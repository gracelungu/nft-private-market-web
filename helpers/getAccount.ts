import { ethers } from "ethers";

const getAccount = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
};

export default getAccount;
