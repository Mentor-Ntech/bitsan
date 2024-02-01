import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { userCOntext } from "../../../context/context";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import { axios } from "../../../utils/axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import Portis from "@portis/web3";
// import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ButtonLoader from "../../buttonLoader";

const AddressTopUp = ({}) => {
  // const provider =
  //   "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";

  const provider = "http://127.0.0.1:7545";
  let web3 = new Web3(provider);
  const { user, refetchUser } = useContext(userCOntext);
  let infuraId = "a55fe6484cc74df28d02d2cc262c5581";
  let etheriumLink = `https://goerli.infura.io/v3/${infuraId}`;

  const [amount, setAmount] = useState(null);
  const [addressTo, setAddressTo] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [account, setAccount] = useState(false);
  const [connected, setConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);

  const pruneState = () => {
    setAddressTo(null);
    btnLoading(false);
    setConnected(false);
    setWeb3Provider(false);
    setAmount(null);
  };

  const providerOptions = {
    // coinbasewallet: {
    //   package: CoinbaseWalletSDK,
    //   options: {
    //     appName: "Web 3 Modal Demo",
    //     infuraId: process.env.INFURA_KEY
    //   }
    // },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Bitsan",
        infuraId: {
          3: etheriumLink,
        },
      },
    },
    portis: {
      package: Portis,
      options: {
        appName: "Bitsan",
        infuraId: {
          3: etheriumLink,
        },
      },
    },
    binancechainwallet: {
      package: true,
      options: {
        appName: "Bitsan",
        anyNetwork: true,
      },
    },
    // fortmatic: {
    //   package: Fortmatic, // required
    //   options: {
    //     key: "FORTMATIC_KEY", // required
    //     network: customNetworkOptions, // if we don't pass it, it will default to localhost:8454
    //   },
    // },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        appName: "Bitsan",
        infuraId: "a55fe6484cc74df28d02d2cc262c5581",
      },
    },
  };

  let web3ModalProvider;

  let web3Modal = new Web3Modal({
    providerOptions,
  });

  const connectWallet = async () => {
    try {
      const web3ModalInstance = await web3Modal.connect();

      web3ModalProvider = new Web3(web3ModalInstance);

      setWeb3Provider(web3ModalProvider);

      if (!web3ModalProvider) return;
      const accounts = await web3ModalProvider.eth.getAccounts();
      if (accounts) {
        setAccount(accounts[0]);
        console.log("accounts ", accounts);
        // window.localStorage.setItem("userAddress", JSON.stringify(accounts[0]));
        setConnected(true);
      }
    } catch (error) {
      console.log("error on connect", error);
    }
  };

  //   const checkWallets = async () => {
  //     let address = JSON.parse(window.localStorage.getItem("userAddress"));
  //     console.log("address", address);
  //     if (address) {
  //       console.log("addresses here", address);
  //       setConnected(true);
  //       setAccount(address);
  //     } else {
  //       console.log("no address");
  //       setConnected(false);
  //       setAccount(null);
  //       // window.localStorage.clear();
  //       web3Modal.clearCachedProvider();
  //     }
  //   };

  async function handleLogout() {
    // window.localStorage.clear();
    web3Modal.clearCachedProvider();
    // window.localStorage.removeItem("userAddress");
    setConnected(false);
  }

  useEffect(() => {
    // pruneState()
  }, []);

  const sendTransaction = async () => {
    console.log("web3ModalProvider ", web3Provider);
    if (!account) return;
    if (account && amount) {
      web3Provider.eth
        .sendTransaction({
          from: account,
          to: user?.user?.address,
          value: web3Provider.utils.toWei(amount, "ether"),
        })
        .then(function (receipt) {
          console.log(receipt);
          axios
            .post("/transactionHistory/saveLinkTransaction", {
              from: account,
              amount,
              userId: user?.user?.userId,
              type: "Top up",
              userEmail: user?.user?.email,
            })
            .then((data) => {
              setAmount("");
              console.log(data);
              alert("Top up completed successfully");
              pruneState();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log("error on metamask ", err));
    } else {
      alert("Please fill all the fields in the form below");
    }
  };

  return (
    <div>
      <div className="dashboard-container">
        <div>
          <DashbLeft />
        </div>
        <div className="dashboard-right">
          <div>
            <DashbHeader />
          </div>
          <div className="body" style={{ marginTop: "10em" }}>
            <div>
              {connected && (
                <button onClick={handleLogout}>disconnect wallet</button>
              )}
              <br />
              <br />
              <div>{account && "Connected wallet: "}</div>
              <div>{account ? ` ${account}` : ""}</div>

              <div className="transaction-box" style={{ marginTop: "-.1em" }}>
                {/* Send transaction to: <br /> {account} */}
                <div className="input-col">
                  <div>
                    <span>
                      Amount in <b>ETH</b>
                    </span>
                    <input
                      type="number"
                      placeholder="amount"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                </div>
                <div className="input-col">
                  {connected ? (
                    <>
                      {btnLoading ? (
                        <button
                          className="transfer-btn"
                        >
                          <ButtonLoader />
                        </button>
                      ) : (
                        <button
                          className="transfer-btn"
                          onClick={sendTransaction}
                        >
                          Top up
                        </button>
                      )}
                    </>
                  ) : (
                    <button onClick={connectWallet}>connect wallet</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressTopUp;
