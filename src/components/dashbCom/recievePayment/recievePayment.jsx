import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userCOntext } from "../../../context/context";
import { axios } from "../../../utils/axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Web3 from "web3";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import Portis from "@portis/web3";
// import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./recievePayment.css";
import Loader from "../../loader";
import { AiOutlineStop } from "react-icons/ai";

function RecievePayment() {
  const { user, refetchUser } = useContext(userCOntext);
  let { id, title } = useParams();
  let address = JSON.parse(window.localStorage.getItem("userAddress"));
  let infuraId = "a55fe6484cc74df28d02d2cc262c5581";
  let etheriumLink = `https://goerli.infura.io/v3/${infuraId}`;

  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [linkInfo, setLinkInfo] = useState(null);
  const [amount, setAmount] = useState("");

  const formattedLink = title.split("_").join(" ");

  const provider =
    "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";
  let web3 = new Web3(provider);

  const fetchLinkInfo = () => {
    axios
      .post("/verifyLink", { userId: id, title: formattedLink })
      .then((data) => {
        console.log("data ", data.data);
        setLinkInfo(data.data);
      })
      .catch((err) => console.log("error ", err));
  };

  useEffect(() => {
    fetchLinkInfo();
  }, []);

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
      // const accounts = await web3ModalProvider.listAccounts();
      // const network = await web3ModalProvider.getNetwork();
      const accounts = await web3ModalProvider.eth.getAccounts();

      if (accounts) {
        setAccount(accounts[0]);
        console.log("accounts ", accounts);
        window.localStorage.setItem("userAddress", JSON.stringify(accounts[0]));
        setConnected(true);
      }
    } catch (error) {
      console.log("error on connect", error);
    }
  };
  const checkWallets = async () => {
    let address = JSON.parse(window.localStorage.getItem("userAddress"));
    console.log("address", address);
    if (address) {
      console.log("addresses here", address);
      setConnected(true);
      setAccount(address);
    } else {
      console.log("no address");
      setConnected(false);
      setAccount(null);
      // window.localStorage.clear();
      web3Modal.clearCachedProvider();
    }
  };

  async function handleLogout() {
    // window.localStorage.clear();
    web3Modal.clearCachedProvider();
    window.localStorage.removeItem("userAddress");
    setConnected(false);
  }

  useEffect(() => {
    checkWallets();
  }, []);

  const sendTransaction = async () => {
    console.log("web3ModalProvider ", web3Provider);
    if (!address) return;
    if (amount != "") {
      web3Provider.eth
        .sendTransaction({
          from: address,
          to: linkInfo?.address,
          value: web3Provider.utils.toWei(amount, "ether"),
        })
        .then(function (receipt) {
          console.log(receipt);
          axios
            .post("/transactionHistory/saveLinkTransaction", {
              from: receipt.from,
              amount,
              linkId: linkInfo?.linkData?._id,
              userId: id,
              type: "Payment in",
              linkTitle: formattedLink,
              userEmail: linkInfo?.email
            })
            .then((data) => {
              setAmount("");
              console.log(data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log("error on metamask ", err));
    } else {
      alert("please enter amount to send");
    }
  };
  return (
    <>
      {linkInfo && linkInfo?.linkData?.title ? (
        <>
          {linkInfo?.status === "active" ? (
            <div className="container-box">
              <div>
                {/* <h2>Recieve payment {id + " " + title.split("_").join(" ")}</h2> */}
                <h1>{linkInfo && linkInfo?.linkData?.title}</h1>

                {connected && (
                  <button onClick={handleLogout}>disconnect wallet</button>
                )}
                <br />
                <br />
                <div>{address && "Connected wallet: "}</div>
                <div>{address ? ` ${address}` : ""}</div>
                {/* <div>{linkInfo.address}</div> */}
                <div className="body">
                  <div>
                    <div className="transaction-box">
                      Send transaction to {linkInfo?.fullName}
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
                          <button
                            className="transfer-btn"
                            onClick={sendTransaction}
                          >
                            Transfer
                          </button>
                        ) : (
                          <button onClick={connectWallet}>
                            connect wallet
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="link-disabled-box">
              <div>
                <AiOutlineStop size={100} color="indianred" />
                <div>
                  <b>Link Disabled...</b>
                </div>
                <div>
                  <small>please contact link owner...</small>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default RecievePayment;
