const Ethereum = {
  hex: "0x1",
  name: "Ethereum",
  rpcUrl: "",
  ticker: "ETH",
};

const MumbaiTestnet = {
  hex: "0x13881",
  name: "Mumbai Testnet",
  rpcUrl: "",
  ticker: "MATIC",
};

const Sepolia = {
  hex: "11155111",
  name: "Sepolia Testnet",
  rpcUrl:
    "https://arbitrum-sepolia.infura.io/v3/e9770a6babcd4ff48e1349d8f808703e",
  ticker: "Sepolia",
};

export const CHAINS_CONFIG = {
  "0x1": Ethereum,
  "0x13881": MumbaiTestnet,
  11155111: Sepolia,
};
