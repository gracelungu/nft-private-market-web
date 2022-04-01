import { ethers } from "ethers";

const authenticate = async () => {
  window.ethereum.request({ method: "eth_requestAccounts" });
};

export default authenticate;
