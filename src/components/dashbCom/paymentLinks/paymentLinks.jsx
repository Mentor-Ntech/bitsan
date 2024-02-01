import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { userCOntext } from "../../../context/context";
import { axios } from "../../../utils/axios";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Toastify from "../../toastify";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import DashbHeader from "../../../pages/dashboard/dashbHeader";

function PaymentLinks({ setTab, paymentLinkId, setPaymentLinkId }) {
  const { user, refetchUser } = useContext(userCOntext);
  console.log(user?.user?.userId);
  const [linkInfo, setLinkInfo] = useState([]);
  const [privateCopy, setPrivateCopy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    console.log("yo");
    axios
      .post("/getUserPaymentLink", { userId: user?.user?.userId })
      .then((response) => {
        console.log("response ", response.data.data);
        setLinkInfo(response.data.data.reverse());
      })
      .catch((error) => console.log("error ", error));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPrivateCopy(false);
    }, 10000);
  }, [privateCopy]);

  const copiedLink = (paymentLink) => {
    setToast([`copied successfully`, "success", "signIn"]);
    navigator.clipboard.writeText(paymentLink);
  };

  const navigate = useNavigate();
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
              {toast && <Toastify info={toast} setToast={setToast} />}

              <table onClick={() => console.log(linkInfo)}>
                <>
                  <thead>
                    <tr>
                      <th colSpan="5">Payment Links</th>
                      <th colSpan="2">
                        <button
                          onClick={() =>
                            navigate("/dashboard/create_payment_link")
                          }
                        >
                          Create Link
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Link</th>
                      <th>Status</th>
                      <th>Copy Link</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  {linkInfo.length === 0 ? (
                    <th colSpan="7">No links has been created yet!!</th>
                  ) : (
                    <tbody>
                      {linkInfo &&
                        linkInfo.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description?.substring(0, 25)}...</td>
                            <td>{item?.paymentLink?.substring(0, 18)}...</td>
                            <td
                              style={{
                                color:
                                  item?.status === "active"
                                    ? "green"
                                    : "indianred",
                                fontWeight: "bold",
                                textTransform: "",
                              }}
                            >
                              {item?.status}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => copiedLink(item?.paymentLink)}
                            >
                              copy
                            </td>
                            <NavLink
                              to={`/dashboard/payment_link_view/${item._id}`}
                            >
                              <td style={{ cursor: "pointer" }}>
                                <span style={{ color: "black" }}>view</span>
                              </td>
                            </NavLink>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentLinks;
