import React, { useContext, useEffect, useState } from "react";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import { PaystackButton } from "react-paystack";
import { userCOntext } from "../../../context/context";
import Web3 from "web3";
import { axios } from "../../../utils/axios";
const BankTopUp = ({}) => {
  const { user, refetchUser } = useContext(userCOntext);
  // const provider =
  //   "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";

  const provider = "http://127.0.0.1:7545";

  let web3 = new Web3(provider);

  const publicKey = "pk_test_e6795c2384cfe6f779438b742e53532a7c1d6564";
  const [amount, setAmount] = useState(null);
  const [convertRate, setConvertedRate] = useState(1000);
  const [convertedValue, setConvertedValue] = useState(null);

  const componentProps = {
    email: user?.user?.email,
    amount: amount * 100,
    metadata: {
      name: user?.user?.fullName,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => successPyment(),
    onClose: () => alert("  Top up transaction cancelled"),
  };

  const convertValue = (val) => {
    setConvertedValue(val / convertRate);
  };

  const pruneState = () => {
    setAmount(null)
    setConvertedValue(null)
  }
  const successPyment = () => {
    web3.eth.accounts
      .signTransaction(
        {
          to: user?.user?.address,
          value: web3.utils.toWei(convertedValue.toString(), "ether"),
          gas: 2000000,
          gasPrice: "1000000",
        },
        "e293475f5f87885674f1dd3d5bb19de45918bc739560209fb1bd571495349369"
      )
      .then((data) => {
        console.log(data);
        web3.eth.sendSignedTransaction(data.rawTransaction, (error, hash) => {
          if (error) {
            console.log("error on hash", error);
            return;
          }
          console.log(hash);
          axios
            .post("/transactionHistory/saveLinkTransaction", {
              from: "0x2aaB963fD7804CaB718fd26EaBF3dB995d3c3179",
              addressTo: user?.user?.address,
              amount: convertedValue,
              userId: user?.user?.userId,
              type: "Top up",
              userEmail: user?.user?.email,
              bankTopUp: true,
            })
            .then((data) => {
              setAmount("");
              alert("Top up transaction completed successfully");
              console.log(data);
              pruneState();
            })
            .catch((err) => console.log(err));
          // setBtnLoading(false);
        }).catch(err => console.log(err)); 
      }).catch(err => console.log(err));
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
              <div className="checkout-form">
                <div className="checkout-field">
                  <label>Amount</label>
                  <input
                    type="number"
                    id="amount"
                    onChange={(e) => {
                      convertValue(e.target.value);
                      setAmount(e.target.value);
                    }}
                    value={amount}
                  />
                </div>

                <div className="checkout-field">
                  <label>Eth equivalence</label>
                  <input
                    type="text"
                    id="name"
                    className="readonly"
                    value={convertedValue}
                    readOnly
                  />
                </div>

                <PaystackButton
                  className="paystack-button"
                  {...componentProps}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTopUp;
