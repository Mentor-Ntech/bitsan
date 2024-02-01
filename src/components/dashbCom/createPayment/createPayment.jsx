import React, { useContext, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { IoHappySharp } from "react-icons//io5";
import { MdOpenInNew } from "react-icons/md";
import { userCOntext } from "../../../context/context";
import { axios } from "../../../utils/axios";
import "./createPaymentLink.css";
import Modal from "react-modal";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";
import Loader from "../../loader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import DashbHeader from "../../../pages/dashboard/dashbHeader";

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

function CreatePaymentLink({ setTab }) {
  const [confirmType, setConfirmationType] = useState("display-payment-page");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const { user, refetchUser } = useContext(userCOntext);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

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

  const pruneState = () => {
    setConfirmationText("");
    setConfirmationType("display-payment-page");
    setTitle("");
    setDescription("");
    setRedirectUrl("");
  };
  const createLink = () => {
    setLoading(true);

    axios
      .post("/createPaymentLink", {
        email: user?.user?.email,
        userId: user?.user?.userId,
        description,
        title,
        confirmationType: confirmType,
        redirectUrl,
        confirmationText,
        paymentLink:
          "http://localhost:3000/payment_gateway/" +
          user?.user?.userId +
          "/" +
          title.split(" ").join("_"),
      })
      .then((data) => {
        setLoading(false);
        if (data.data.err_message) {
          alert(data.data.err_message);
        } else {
          setLink(
            "http://localhost:3000/payment_gateway/" +
              user?.user?.userId +
              "/" +
              title.split(" ").join("_")
          );
          openModal();
          pruneState();
        }
      })
      .catch((err) => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                <div className="create-link-container" style={{width:"100%"}}>
                  <div>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <IoHappySharp size={100} color="lightgreen" />
                      <h1>Link Created Successfully</h1>
                      <br />
                      <div
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setIsOpen(false);
                          pruneState();
                          navigator.clipboard.writeText(link);
                        }}
                      >
                        {link} &nbsp; &nbsp; <BsClipboard /> &nbsp; &nbsp;{" "}
                        <a
                          target="_blank"
                          href={link}
                          style={{ color: "#000", textDecoration: "none" }}
                        >
                          <MdOpenInNew />
                        </a>
                      </div>
                    </Modal>
                  </div>

                  <div className="link-pay-container">
                    <div className="link-payment-header">
                      <div className="link-icon">
                        <BsLink45Deg size={25} color="palevioletred" />
                      </div>
                      <div className="">
                        <h1>Link Information</h1>
                        <p>Tell us what your payment link is about</p>
                      </div>
                    </div>
                    <div className="link-form-parent">
                      <div className="link-form">
                        <label>
                          <span className="link-title">
                            Payment link title*
                          </span>
                          <br />
                          <input
                            type="text"
                            placeholder="Enter desired link name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </label>
                        <span>
                          <p className="link-para-text">
                            e.g Hair, eBook, London vacation
                          </p>
                        </span>
                      </div>

                      <div className="link-form">
                        <label>
                          <span className="link-title">
                            Payment link description
                          </span>
                          <br />
                          <textarea
                            className="text-box"
                            value={description}
                            placeholder="Enter desired payment link description"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          ></textarea>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="confirmation-page">
                    <div className="confirmation-page-header">
                      <h1>Confirmation</h1>
                    </div>
                    <div className="confirmation-page-content">
                      <div>
                        <label className="confirmation-type">
                          <input
                            type="Radio"
                            name="confirm-type"
                            defaultValue="display-payment-page"
                            defaultChecked
                            onClick={(e) => {
                              setRedirectUrl("");
                              setConfirmationType(e.target.value);
                            }}
                          />
                          <span>Display confirmation page after payment</span>
                        </label>
                        {confirmType === "display-payment-page" && (
                          <div>
                            <textarea
                              className="text-box"
                              value={confirmationText}
                              onChange={(e) =>
                                setConfirmationText(e.target.value)
                              }
                            ></textarea>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="confirmation-type">
                          <input
                            type="Radio"
                            name="confirm-type"
                            defaultValue="redirect-page"
                            onClick={(e) => {
                              setConfirmationText("");
                              setConfirmationType(e.target.value);
                            }}
                          />
                          <span>Redirect to website after payment</span>
                        </label>
                        {confirmType === "redirect-page" && (
                          <div>
                            <input
                              type="text"
                              placeholder="https://yourwebsite.com/"
                              value={redirectUrl}
                              onChange={(e) => setRedirectUrl(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="btn-container">
                    <button className="btnPay" onClick={createLink}>
                      Create link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePaymentLink;
