import React from "react";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import { BsBank2 } from "react-icons/bs";
import { RiCoinsFill } from "react-icons/ri";
import "./sending.css";
import { Link } from "react-router-dom";
const Sending = ({ connected = true }) => {
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
          <div className="sending-body" style={{ marginTop: "6em" }}>
            <Link to="/dashboard/bank-payout">
              <div className="payout-box box-1">
                <div className="icon-box">
                  <BsBank2 size={30} color="ghostwhite" />
                </div>
                <div className="sending-text-box">
                  <div className="big-text">Bank Payout</div>
                  <p className="small-text">
                    Withdraw your money into your preferred bank account in just
                    few clicks.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/wallet-payout">
              <div className="payout-box box-2">
                <div className="icon-box">
                  <RiCoinsFill size={30} color="ghostwhite" />
                </div>
                <div className="sending-text-box">
                  <div className="big-text">Digital Wallet Payout</div>
                  <p className="small-text">
                    Withdraw your money into your etherium supported wallet
                    address.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sending;