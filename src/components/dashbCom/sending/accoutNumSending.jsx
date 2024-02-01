import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
// import Select from "react-dropdown-select";
// import "react-select-search/style.css";
// import SelectSearch from 'react-select-search';
import ReactSelect from "react-select";
import { axios } from "../../../utils/axios";
import { userCOntext } from "../../../context/context";
import ButtonLoader from "../../buttonLoader";
import Web3 from "web3";

const AccountSending = ({}) => {
  const { user, refetchUser } = useContext(userCOntext);
  const [bankList, setBankList] = useState({});
  const [accountNum, setAccountNum] = useState("");
  const [amount, setAmount] = useState(null);
  const [bank, setBank] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [convertedVal, setConvertedVal] = useState(null);
  const [convertRate, setConvertRate] = useState(1000);
  const [btnLoading, setBtnLoading] = useState(false);

  // const provider =
  //   "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";

  const provider = "http://127.0.0.1:7545";

  let web3 = new Web3(provider);

  const pruneState = () => {
    setAccountName("");
    setAmount(null);
    setAccountNum("");
    setConvertedVal(0);
    setBank(null);
  };
  useEffect(() => {
    Axios("https://api.paystack.co/bank")
      .then((data) => {
        setBankList(
          data?.data?.data?.map((val, index, arr) => ({
            value: val,
            label: val.name,
            code: val.code,
          }))
        );
      })
      .catch((err) => console.log("error", err));
  }, []);

  const getAccounInfo = (accountNumber, bankChosen) => {
    if (bankChosen && accountNumber.length > 9) {
      Axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankChosen.code}`,
        {
          headers: {
            Authorization:
              "Bearer sk_test_90f959bf395fd972e7d6ab34de94a2bcfe13e713",
          },
        }
      )
        .then((data) => {
          setAccountName(data?.data?.data?.account_name);
        })
        .catch(console.log);
    }
  };

  const convertValue = (ethVal) => {
    let calulatedVal = ethVal * convertRate;
    calulatedVal === 0
      ? setConvertedVal(null)
      : setConvertedVal(ethVal * convertRate);
  };

  const transferToUser = () => {
    if (bank && amount && accountNum && accountName && user?.user?.privateKey) {
      setBtnLoading(true);

      web3.eth.accounts
        .signTransaction(
          {
            to: "0x841404679261F829875229D25f6f60055502bf38",
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
              .post("/transferToUser", {
                bankCode: bank.code,
                fullName: user?.user?.fullName,
                accountNumber: accountNum,
                amount: convertedVal,
                rceipientEmail: user?.user?.email,
              })
              .then((data) => {
                // console.log(data);
                axios
                  .post("/transactionHistory/saveLinkTransaction", {
                    from: user?.user?.address,
                    amount,
                    userId:user?.user?.userId,
                    type: "Payment out",
                    BankPaymentOut: true,
                    userEmail: user?.user?.email,
                    convertedValue:  convertedVal,
                  })
                  .then((data) => {
                    setAmount("");
                    console.log(data);
                  })
                  .catch((err) => console.log(err));

                if (
                  data?.data?.message === "Transfer requires OTP to continue"
                ) {
                  alert(
                    "Transaction has been successfully initiated, waiting for transfer to complete, this could take 30minutes to drop into your bank account"
                  );
                  pruneState();
                }
                setBtnLoading(false);
              })
              .catch((error) => {
                setBtnLoading(false);
                console.log(error);
              });
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
                <span>
                  conversion rate: 1eth ({convertRate && "N" + convertRate})
                </span>

                <div className="input-col">
                  <div>
                    <span style={{ marginBottom: "2em" }}>Bank Name</span>
                    <ReactSelect
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select your Bank"
                      isClearable={true}
                      isSearchable={true}
                      name="bank-list"
                      options={bankList}
                      onChange={(val) => {
                        console.log(val);
                        setBank(val);
                        getAccounInfo(accountNum, val);
                      }}
                    />
                  </div>
                </div>

                <div className="input-col"></div>

                <div className="input-col">
                  <div>
                    <span>Account Number</span>
                    <input
                      placeholder="account number"
                      className="sending-input"
                      value={accountNum && accountNum}
                      onChange={(e) => {
                        setAccountNum(e.target.value);
                        getAccounInfo(e.target.value, bank);
                      }}
                      maxLength="10"
                    />
                  </div>
                </div>

                <div className="input-col">
                  <div>
                    <span>Account Name</span>
                    <input
                      placeholder="account name"
                      value={accountName && accountName}
                      readOnly
                      className="sending-input readonly"
                      onChange={(e) => {
                        setAccountNum(e.target.value);
                        getAccounInfo(e.target.value, bank);
                      }}
                    />
                  </div>
                </div>

                <div className="input-col">
                  <div>
                    <span>
                      Amount in <b>ETH</b>
                    </span>
                    <input
                      type="number"
                      placeholder="amount"
                      className="sending-input"
                      value={amount && amount}
                      onChange={(e) => {
                        convertValue(e.target.value);
                        setAmount(e.target.value);
                      }}
                      maxLength={2}
                      minLength={0}
                    />
                  </div>
                  <span>{convertedVal && "N" + convertedVal}</span>
                </div>
                <br />
                <div className="input-col">
                  {btnLoading ? (
                    <button className="transfer-btn">
                      <ButtonLoader />
                    </button>
                  ) : (
                    <button className="transfer-btn" onClick={transferToUser}>
                      Payout
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

export default AccountSending;
