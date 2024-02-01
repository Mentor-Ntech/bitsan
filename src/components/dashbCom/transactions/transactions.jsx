import React, { useContext, useEffect, useState } from "react";
import { userCOntext } from "../../../context/context";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import { axios } from "../../../utils/axios";
import { formatDate } from "../../../utils/formatDate";
import Toastify from "../../toastify";

function Transactions() {
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const { user, refetchUser } = useContext(userCOntext);

  const fetchLinkInfo = () => { 
    axios("/transactionHistory/getAllTransactionHistory", {
      params: { userId: user?.user?.userId },
    })
      .then((response) => {
        setHistory(response.data.reverse());
      })
      .catch((error) => console.log("error ", error));
  };

  useEffect(() => {
    user?.user?.userId && 
    fetchLinkInfo();
  }, [user?.user?.userId]);
  const copiedLink = (paymentLink) => {
    setToast([`copied successfully`, "success", "paymentLink"]);
    navigator.clipboard.writeText(paymentLink);
  };
  return (
    <div>
      {toast && <Toastify info={toast} setToast={setToast} />}
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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Sender</th>
                    {/* <th>Amount (usdt)</th> */}
                    <th>
                      Amount (<strong>ETH</strong>)
                    </th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {history.length > 0 &&
                    history.map((data, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data.type}</td>
                        <td>{formatDate(data.date)}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => copiedLink(data.from)}
                        >
                          {data.from.substring(0, 8)}
                          ...
                        </td>
                        <td>{data.amount} eth</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
