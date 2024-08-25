import Web3 from 'web3';

let web3;

// Initialize Web3 
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.log("MetaMask is not installed");
}

export default web3;
