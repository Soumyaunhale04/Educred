import { ethers } from "ethers";
import contractData from "../blockchain-layer/artifacts/contracts/EduCred.sol/EduCred.json"; 

// Paste your deployed contract address here after deployment
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getContract = async () => {
  if (typeof window.ethereum === "undefined") return null;

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};