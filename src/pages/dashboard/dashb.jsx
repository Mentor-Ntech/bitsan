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
import DashbLeft from "./dashbLeft";
import DashbHeader from "./dashbHeader";

// import { Accounts } from "web3-eth-accounts";

function Dashboard() {
  const { user, refetchUser } = useContext(userCOntext);
  const [connected, setConnected] = useState(true);

  const [tab, setTab] = useState("/payment_links");
  const [accountInfo, setAccountInfo] = useState(null);
  const [paymentLinkId, setPaymentLinkId] = useState("");
  const provider =
    "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";
  var web3 = new Web3(provider);

  const navigate = useNavigate();

  useEffect(() => {
    // setAccountInfo(web3.eth.accounts.create(web3.utils.randomHex(32)));
    refetchUser();
  }, []);

  console.log(user?.user?.address);
  console.log("user ", user);

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
              <Dashb connected={connected} />
            {/* {tab === "/dashboard" ? (
              <Dashb connected={connected} />
            ) : tab === "/profile" ? (
              <Profile
                address={user?.user?.address}
                accountInfo={accountInfo}
              />
            ) : tab === "/settings" ? (
              tab === "/settings" && <Settings address={user?.user?.address} />
            ) : tab === "/users" ? (
              <GetUsers />
            ) : tab === "/transactions" ? (
              <Transactions />
            ) : tab === "/payout" ? (
              <Sending connected={connected} />
            ) : tab === "/payment_links" ? (
              <PaymentLinks
                connected={connected}
                setTab={setTab}
                paymentLinkId={paymentLinkId}
                setPaymentLinkId={setPaymentLinkId}
              />
            ) : tab === "/create_payment_link" ? (
              <CreatePaymentLink setTab={setTab} />
            ) : (
              tab === "/view_payment_link" && (
                <ViewPaymentLink
                  setTab={setTab}
                  paymentLinkId={paymentLinkId}
                  setPaymentLinkId={setPaymentLinkId}
                />
              )
            )} */}
            {/* ) : tab === "/users" ? <GetUsers /> :  tab === "/transactions" ? <Transactions /> : tab === "/payout" ? <Sending connected={connected} /> : tab === "/create_payment_link" &&   <CreatePaymentLink connected={connected} /> } */}

            {/* <Routes>
              <Route path="view/:id" element={<ViewPaymentLink />} />
              <Route path="dashboard/view/:id" element={<ViewPaymentLink />} />
            </Routes> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
