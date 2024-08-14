
# Crypto Wallet with Moralis API

## Overview

This project is a simple cryptocurrency wallet application built using the Moralis API. It allows users to manage their cryptocurrency assets, view balances, and send or receive tokens. The wallet supports multiple blockchain networks and integrates with popular cryptocurrency tokens.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/) (v14.x or higher)
- npm or [Yarn](https://yarnpkg.com/)
- [Moralis Account](https://moralis.io/) (to obtain your API key)
- [MetaMask](https://metamask.io/) installed in your browser

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/EYOSIYAS7/Wallet
    cd Wallet
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Moralis API key:

    ```plaintext
    REACT_APP_MORALIS_API_KEY=your-moralis-api-key
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the wallet application.

### Viewing Token Balances

- Once connected, the wallet will display your token balances for the selected network.
- You can switch networks using the network dropdown in the wallet.

### Sending Tokens

1. Enter the recipient's wallet address.
2. Specify the token and amount to send.
3. Confirm the transaction in your connected wallet.

### Receiving Tokens

- Provide your wallet address to the sender.
- The incoming tokens will automatically appear in your wallet balance.


## Acknowledgements

- [Moralis API](https://moralis.io/)
