import React, { useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png";
import axios from "axios";
import { CHAINS_CONFIG } from "../chains";
import { ethers } from "ethers";
// const tokens = [
//   {
//     symbol: "ETH",
//     name: "Ethereum",
//     balance: 100000000000,
//     decimals: 18,
//   },
//   {
//     symbol: "LINK",
//     name: "Chainlink",
//     balance: 100000000000,
//     decimals: 18,
//   },
//   {
//     symbol: "UNI",
//     name: "Uniswap",
//     balance: 100000000000,
//     decimals: 18,
//   },
//   {
//     symbol: "MATIC",
//     name: "Polygon",
//     balance: 100000000000,
//     decimals: 18,
//   },
// ];

// const nfts = [
//   "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xd774557b647330c91bf44cfeab205095f7e6c367/0xfb76f9ef3adabc27d77c615959f9e22dea24ac7d6a10af3458b3481e5f5e0f10/high.png",
//   ,
//   "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0x749f5ddf5ab4c1f26f74560a78300563c34b417d/0x90cae88ffc909feab8e4df76abd0652dee98b7bffab29597d898260d91c20aa1/high.jpeg",
// ];

function WalletView({
  wallet,
  seedPhrase,
  setWallet,
  setSeedPhrase,
  selectedChain,
}) {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);

  function logout() {
    setSeedPhrase(null);
    setSeedPhrase(null);
    navigate("/");
  }
  async function sendTransaction(to, amount) {
    const chain = CHAINS_CONFIG[selectedChain];
    console.log("chain", chain);
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
    console.log("rpcUrl", chain.rpcUrl);
    console.log("rpcUrl", provider);
    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProcessing(true);
    try {
      const transaction = await wallet.sendTransaction(tx);

      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log("transaction failed");
      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);
    }
  }

  async function getAccountTokens() {
    setFetching(true);

    const res = await axios.get(`http://localhost:3001/getTokens`, {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      },
    });

    const response = res.data;
    console.log(response);

    if (response.tokens !== null) {
      setTokens(response.tokens);
    }

    if (response.nfts !== null) {
      setNfts(response.nfts);
    }

    setBalance(response.balance);
    console.log(response.balance);

    setFetching(false);
  }
  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, []);

  useEffect(() => {
    if (!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, [selectedChain]);
  const items = [
    {
      key: "3",
      label: `Tokens`,
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                className="textColor"
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item style={{ textAlign: "left" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo || logo} />}
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(
                        Number(item.balance) /
                        10 ** Number(item.decimals)
                      ).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <p className="textColor">"you dont have any tokens yet"</p>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: `NFTs`,
      children: (
        <>
          {nfts ? (
            <>
              {nfts.map((e, i) => {
                return (
                  <>
                    {e && (
                      <img
                        key={i}
                        className="nftImage"
                        alt="nftImage"
                        src={e}
                      />
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <span>You seem to not have any NFTs yet</span>
              <p className="frontPageBottom textColor">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "1",
      label: `Transfer`,
      children: (
        <>
          {/* <h1>
            {" "}
            {console.log(selectedChain)}
            {balance.toFixed(2)} {CHAINS_CONFIG[selectedChain].ticker}
          </h1> */}
          <h3 className="textColor">Native Balance </h3>
          <h1 className="textColor">
            {balance.toFixed(3)} {CHAINS_CONFIG[selectedChain].ticker}
          </h1>
          <div className="sendRow">
            <p
              className="textColor"
              style={{ width: "90px", textAlign: "left" }}
            >
              {" "}
              To:
            </p>
            <Input
              value={sendToAddress}
              onChange={(e) => setSendToAddress(e.target.value)}
              placeholder="0x..."
            />
          </div>
          <div className="sendRow">
            <p
              className="textColor"
              style={{ width: "90px", textAlign: "left" }}
            >
              {" "}
              Amount:
            </p>
            <Input
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              placeholder="Native tokens you wish to send..."
            />
          </div>
          <Button
            className="textColor"
            style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
            type="primary"
            onClick={() => sendTransaction(sendToAddress, amountToSend)}
          >
            Send Tokens
          </Button>
          {processing && (
            <>
              <Spin />
              {hash && (
                <Tooltip title={hash}>
                  <p>Hover For Tx Hash</p>
                </Tooltip>
              )}
            </>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <div className="content textColor">
        <div className="logoutButton" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName">Wallet</div>
        {/* the Tooltip is gonna show the full a public address when u hover over it  */}
        <Tooltip title={wallet}>
          <div>
            {wallet.slice(0, 4)}...{wallet.slice(38)}
          </div>
        </Tooltip>
        <Divider className="textColor" />
        {fetching ? (
          <Spin />
        ) : (
          <div className="textColor">
            <Tabs defaultActiveKey="3" items={items} className="walletView" />
          </div>
        )}
      </div>
    </>
  );
}

export default WalletView;
