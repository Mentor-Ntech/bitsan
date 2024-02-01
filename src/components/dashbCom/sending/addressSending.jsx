import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { userCOntext } from "../../../context/context";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import { axios } from "../../../utils/axios";
import ButtonLoader from "../../buttonLoader";

const AddressSending = ({ connected = true }) => {
  // const provider =
  //   "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";

  const provider = "http://127.0.0.1:7545";

  let web3 = new Web3(provider);

  const { user, refetchUser } = useContext(userCOntext);
  const [amount, setAmount] = useState(null);
  const [addressTo, setAddressTo] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const pruneState = () => {
    setAddressTo(null);
    btnLoading(false);
  };

  const tranferEth = () => {
    if (addressTo && amount) {
      setBtnLoading(true);
      web3.eth.accounts
        .signTransaction(
          {
            to: addressTo,
            value: web3.utils.toWei(amount, "ether"),
            gas: 2000000,
            gasPrice: "1000000",
          },
          user?.user?.privateKey
        )
        .then((data) => {
          web3.eth.sendSignedTransaction(data.rawTransaction, (error, hash) => {
            if (error) {
              console.log("error on hash", error);
              return;
            }
            axios
              .post("/transactionHistory/saveLinkTransaction", {
                from: user?.user?.address,
                addressTo,
                amount,
                userId: user?.user?.userId,
                type: "Payment out",
                userEmail: user?.user?.email,
                addressPayout: true,
              })
              .then((data) => {
                alert("Pay out transaction completed successfully")
                setAmount("");
                setAddressTo("");
                console.log(data);
                pruneState();
              })
              .catch((err) => console.log(err));
            setBtnLoading(false);
          });
        });
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
          <div className="body" style={{ marginTop: "6em" }}>
            <div>
              <div className="transaction-box">
                <div className="input-col">
                  <div>
                    <span>
                      Amount in <b>ETH</b>
                    </span>
                    <input
                      placeholder="amount"
                      className="input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-col">
                  <div>
                    <span>Recipient Address</span>
                    <input
                      placeholder="address to"
                      onChange={(e) => setAddressTo(e.target.value)}
                      value={addressTo}
                    />
                  </div>
                </div>
                <div className="input-col">
                  {btnLoading ? (
                    <button className="transfer-btn">
                      <ButtonLoader />
                    </button>
                  ) : (
                    <button className="transfer-btn" onClick={tranferEth}>
                      Transfer
                    </button>
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

export default AddressSending;
