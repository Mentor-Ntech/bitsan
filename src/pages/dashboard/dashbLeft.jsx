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

function DashbLeft() {
  const { user, refetchUser } = useContext(userCOntext);
  const [connected, setConnected] = useState(true);

  const [tab, setTab] = useState("/payment_links");
  const [accountInfo, setAccountInfo] = useState(null);
  const [paymentLinkId, setPaymentLinkId] = useState("");

  const navigate = useNavigate();
  return (
    <div classN ame="dashboard-left">
      <div className="sidebar">
        <div className="slideContent">
          <div className="sidebar-top">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: ".7em",
              }}
            >
              <div className="profile-img">
                <IdenticonImg />
              </div>
              &nbsp; &nbsp;
              <h3 style={{ fontSize: "20px" }}>{user?.user?.fullname}</h3>
            </div>
            <h4>
              {user?.user?.address && user?.user?.address.substring(0, 20)}
              ...
            </h4>
          </div>

          <div className="sidebar-bottom">
            <ul>
              {slideItems.map((items, i) => (
                <NavLink
                  to={items.path}
                  className={({ isActive }) => (isActive ? "activeTab" : "")}
                  end
                >
                  <li key={i} style={{ cursor: "pointer" }}>
                    {items.icon}&nbsp;&nbsp;{items.title}
                  </li>
                </NavLink>
              ))}
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("bitsanAccessToken");
                  localStorage.removeItem("bitsanRefreshToken");

                  const bitsanAccessToken =
                    localStorage.getItem("bitsanAccessToken");
                  const bitsanRefreshToken =
                    localStorage.getItem("bitsanRefreshToken");

                  refetchUser();
                  setTimeout(() => {
                    navigate("/signin", { replace: true });
                  }, 100);
                }}
              >
                <FiLogOut /> &nbsp;&nbsp;Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbLeft;
