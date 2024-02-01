import React, { useState, useEffect } from "react";
import "./dashb.css";
import { slideItems } from "../../data";
import { NavLink, useNavigate } from "react-router-dom";
import Sending from "../../components/dashbCom/sending/Sending";
import Profile from "../../components/dashbCom/profile/Profile";
import Settings from "../../components/dashbCom/settings/Settings";
import IdenticonImg from "../../components/identicon";
import { FiLogOut } from "react-icons/fi";
import Web3 from "web3";
import { useContext } from "react";
import { userCOntext } from "../../context/context";
import GetUsers from "../../components/dashbCom/users/users";
import Transactions from "../../components/dashbCom/transactions/transactions";
import CreatePaymentLink from "../../components/dashbCom/createPayment/createPayment";
import Dashb from "../../components/dashbCom/dashb/dashb";
import PaymentLinks from "../../components/dashbCom/paymentLinks/paymentLinks";
import ViewPaymentLink from "../../components/dashbCom/viewPaymentLink/viewPaymentLink";
import { Routes, Route } from "react-router-dom";

function DashbHeader() {
  return (
    <div>
        <div className="dashboard-header">
            <div className="header-right">
            Header
            </div>
            <div className="header-left">
              {/* <button
                className="connect-wallet"
                onClick={() => setConnected(!connected)}
              >
                {!user?.user?.address ? "Connect wallet" : "Disconnect wallet"}
              </button> */}
            </div>
          </div>
    </div>
  )
}

export default DashbHeader