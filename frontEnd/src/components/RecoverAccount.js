import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
const { TextArea } = Input;
function RecoverAccount({ setWallet, setSeedPhrase }) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);
  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  const recoverWallet = () => {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
      console.log(recoveredWallet);
    } catch (err) {
      setNonValid(true);
      console.log(recoveredWallet);
      return;
    }
    setWallet(recoveredWallet.address);
    setSeedPhrase(typedSeed);
    navigate("/yourwallet");
    return;
  };
  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined style={{ fontSize: "20px" }} />
          <div>
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces)
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={4}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />
        <Button
          disabled={
            typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
          }
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>

        {nonValid && <p style={{ color: "red" }}> invalid seedPhrase</p>}
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          <span>Back Home</span>
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
