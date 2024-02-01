import Axios from "axios";
import React, {  useEffect } from "react";
import { Link } from "react-router-dom";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import "./topup.css"
import { BsCashCoin } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";


const TopUp = ({}) => {

  useEffect(() => {
    // pruneState()
  }, []);

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
          <div className="topup-body" style={{ marginTop: "6em" }}>
            <Link to="/dashboard/bank_topup">
              <div className="topup-box box-1">
                <div className="icon-box">
                  <BsCashCoin size={30} color="ghostwhite" />
                </div>
                <div className="topup-text-box">
                  <div className="big-text">Bank Top up</div>
                  <p className="small-text">
                    Top up your bitsan account's address with your bank in few clicks.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/address_topup">
              <div className="topup-box box-2">
                <div className="icon-box">
                  <FaBitcoin size={30} color="ghostwhite" />
                </div>
                <div className="topup-text-box">
                  <div className="big-text">Digital Wallet Top up</div>
                  <p className="small-text">
                    Top up your bitsan account's addresss with your etherium supported wallet
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

export default TopUp;
