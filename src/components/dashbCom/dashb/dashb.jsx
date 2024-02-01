import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { userCOntext } from "../../../context/context";
import "./dashb.css";

function Dashb() {
  const { user, refetchUser } = useContext(userCOntext);
  const [balance, setBalance] = useState("");
  // const provider =
  //   "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";

  const provider = "http://127.0.0.1:7545";

  let web3 = new Web3(provider);

  const getBalance = () => {
    user?.user?.address &&
      web3.eth.getBalance(user?.user?.address, "latest", (err, balance) => {
        if (err) {
          console.log("err ", err);
          return;
        }
        setBalance(web3.utils.fromWei(balance, "ether"));
      });
  };

  useEffect(() => {
    getBalance();
  }, [user?.user?.address]);

 
  const navigate = useNavigate();
  return (
    <div className="dashb-body">
      <div className="dashb-top">
        <h1 style={{ marginBottom: ".2em" }}>
          Welcome, {user?.user?.fullname.split(" ")[0]}
        </h1>

        <h3 style={{ color: "grey" }}>{user?.user?.businessName}</h3>
      </div>
      <div className="dashb-bottom">
        <div className="dashb-bottom-left">
          <div className="">
            <div className="what-next">
              <div>What to do next...</div>
              <div>x hide all</div>
            </div>
            <div className="upgrade-account">Upagrade your account</div>
            <div className="balance">
              <div className="balance-top">Balance</div>
              <div className="balance-body">
                <div>
                  <div className="balance-amt">
                    {balance && balance}{" "}
                    <small style={{ fontSize: "20px" }}>eth</small>
                  </div>
                  <div className="balance-label">Available balance</div>
                </div>
                <div className="btn_dashb">
                  <NavLink to="/dashboard/topup">
                    <button>Top up</button>
                  </NavLink>
                  <NavLink to="/dashboard/payout">
                    <button>Payout</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="activities">
          <div className="activities-top">Activities</div>
          <div className="activities-body">
            <div>No activities yet</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashb;
