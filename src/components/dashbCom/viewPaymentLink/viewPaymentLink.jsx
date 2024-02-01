import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { axios } from "../../../utils/axios";
import Toastify from "../../toastify";
import "./viewPaymentLink.css";
import { IoCopySharp, IoQrCode } from "react-icons//io5";
import { MdOpenInNew } from "react-icons/md";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import { formatDate } from "../../../utils/formatDate";
import QRCode from "react-qr-code";
import Modal from "react-modal";


function ViewPaymentLink({}) {
  const { id } = useParams();
  const [toast, setToast] = useState(null);
  const [linkInfo, setLinkInfo] = useState(null);
  let [totalAmt, setTotalAmt] = useState(0);
  const [linkTransaction, setLinkTransaction] = useState([]);
  const navigate = useNavigate();
  const fetchLinkInfo = () => {
    axios
      .post("/getUserPaymentLink/single", { id })
      .then((response) => {
        console.log("response ", response.data.data);
        setLinkInfo(response.data.data);
      })
      .catch((error) => console.log("error ", error));

    axios
      .get("/transactionHistory/getLinkTransactions", {
        params: { linkId: id },
      })
      .then((data) => {
        setLinkTransaction(data.data.reverse());
        console.log("DATA OO ", data);
        let sum = 0;
        for (const value of data.data) {
          setTotalAmt((totalAmt += value.amount));
        }
      })
      .catch((err) => {
        setLinkTransaction([]);
        console.log("ERR OO ", err);
      });
  };

  useEffect(() => {
    fetchLinkInfo();
  }, []);

  const copiedLink = (paymentLink) => {
    setToast([`copied successfully`, "success", "paymentLink"]);
    navigator.clipboard.writeText(paymentLink);
  };

  const disableLink = () => {
    axios
      .put("/getUserPaymentLink/disable_payment_links", { id })
      .then((data) => {
        setToast([`Link Disabled`, "success", "link-disabled"]);
        fetchLinkInfo();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const enableLink = () => {
    axios
      .put("/getUserPaymentLink/enable_payment_links", { id })
      .then((data) => {
        setToast([`Link Enabled`, "success", "link-enabled"]);
        fetchLinkInfo();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteLink = () => {
    let askForDel = window.confirm("Are you sure you want to delete this link");
    if (!askForDel) return;
    axios
      .delete("/getUserPaymentLink/deleteLink", { params: { id } })
      .then((data) => {
        alert("link deleted successfully");
        navigate("/dashboard/payment_links");
      })
      .catch((err) => console.log(err));
  };

  // modal setup

  const customStyles = {
    content: {
      top: "28%",
      left: "37%",
      right: "auto",
      bottom: "auto",
      // background:"red",
      // transform: "translate(-31%, -28%)",
      height: "auto",
      width: "fit-content",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  Modal.setAppElement("#root");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
            <div style={{ width: "100%" }}>
              {toast && <Toastify info={toast} setToast={setToast} />}

              <div className="top-box">
                <div className="amount-gen-box">
                  <b>Bitsans</b> for {totalAmt} ethers
                </div>
                {/* <td style={{ color: item?.status === "active" ? "lightgreen" : "indianred", fontWeight: "bold" }}>Active</td> */}

                <div>
                  Share the link with your customers to start accepting payments
                </div>

                {/* qr code modal */}

                <div>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    {linkInfo?.paymentLink && (
                      <div
                        style={{
                          height: "auto",
                          margin: "0 auto",
                          maxWidth: 64,
                          width: "100%",
                        }}
                      >
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={linkInfo?.paymentLink}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    )}
                  </Modal>
                </div>

                {/* qr code modal ends */}
                <div className="flex copy-link">
                  <div>{linkInfo?.paymentLink}</div> &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <div className="flex">
                    <div
                      className="flex"
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        background: "green",
                        color: "#fff",
                        borderRadius: "5px",
                      }}
                      onClick={() => copiedLink(linkInfo?.paymentLink)}
                    >
                      <IoCopySharp /> &nbsp;copy{" "}
                    </div>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <div
                      className="flex"
                      style={{
                        cursor: "pointer",
                        padding: "5px 7px",
                        background: "#262e28",
                        color: "#fff",
                        borderRadius: "5px",
                      }}
                      onClick={() =>openModal()}
                    >
                      <IoQrCode /> &nbsp;QR{" "}
                    </div>
                    &nbsp; &nbsp; &nbsp;
                    <div
                      className="flex"
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <a
                        target="_blank"
                        href={linkInfo?.paymentLink}
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        <MdOpenInNew color="#000" size={25} />
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className="flex"
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    background:
                      linkInfo?.status === "disabled" ? "green" : "indianred",
                    color: "#fff",
                    borderRadius: "5px",
                    display: "block",
                    width: "fit-content",
                  }}
                  onClick={
                    linkInfo?.status === "active" ? disableLink : enableLink
                  }
                >
                  {linkInfo?.status === "active" ? "Disable" : "Enable"} link
                </div>
              </div>

              <div>
                <div className="heading-box">
                  <h3>Link Details</h3>
                </div>
                <div className="view-body">
                  <div>
                    <div>Created</div>
                    <div>November 13, 2022</div>
                  </div>

                  <div>
                    <div>Status</div>
                    <strong style={{ textTransform: "capitalize" }}>
                      {linkInfo?.status}
                    </strong>
                  </div>
                  <div>
                    <div>Title</div>
                    <div>{linkInfo?.title}</div>
                  </div>
                  <div>
                    <div>Description</div>
                    <div>{linkInfo?.description}</div>
                  </div>
                  <div>
                    <div
                      className="flex"
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        background: "indianred",
                        color: "#fff",
                        borderRadius: "5px",
                        display: "block",
                        width: "fit-content",
                      }}
                      onClick={deleteLink}
                    >
                      Delete Link
                    </div>
                  </div>
                </div>
                <div className="view-table">
                  <center>
                    <table style={{ textAlign: "center" }}>
                      {linkTransaction.length > 0 && (
                        <thead>
                          <tr>
                            <th>ID</th>

                            <th>Date</th>
                            <th>From / To</th>
                            {/* <th>Amount (usdt)</th> */}
                            <th>
                              Amount (<strong>ETH</strong>)
                            </th>
                          </tr>
                        </thead>
                      )}
                      {linkTransaction.length > 0 ? (
                        linkTransaction.map((data, i) => (
                          <tbody key={i}>
                            <tr>
                              <td>{i + 1}</td>
                              <td>{formatDate(data.date)}</td>
                              <td
                                style={{ cursor: "pointer" }}
                                onClick={() => copiedLink(data.from)}
                              >
                                {data.from.substring(0, 8)}
                                ...
                              </td>
                              <td>{data.amount} ether</td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <th>No transaction for this payment link</th>
                      )}
                    </table>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPaymentLink;
