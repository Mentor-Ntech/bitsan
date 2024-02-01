import React from "react";
import "./reciept.css";
import { useLocation } from "react-router-dom";

function Reciept() {
  const location = useLocation();

  let {
    receipientAddress,
    receipientFullname,
    amountSent,
    image,
    contentType,
    productName,
  } = location.state;

  const base64String = btoa(
    new Uint8Array(image).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );

  return (
    <div className="flex-reciept">
      <div>
        {receipientAddress ? (
          <table style={{height:"95vh"}}>
            <thead>
              <tr>
                <th colSpan="4">Bitsan confirmation reciept</th>
              </tr>
              <tr>
                <th>Recipient Name</th>
                <th>Recipient address</th>
                <th>Amount sent</th>
                <th>Product bought</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{receipientFullname}</td>
                <td>{receipientAddress}</td>
                <td>
                  {amountSent} <b>ETH</b>
                </td>
                <td>{productName}</td>
              </tr>
              <tr>
                <th colSpan="4">Product</th>
              </tr>
              <tr>
                <td colSpan="4">
                  <center>
                    {
                      <img
                        src={`data:${contentType};base64,${base64String}`}
                        alt="product-img"
                        style={{ width: "10%" }}
                      />
                    }
                  </center>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <button style={{ width: "100%" }} onClick={()=> window.print()}>Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h1>Error Please go back</h1>
        )}
      </div>
    </div>
  );
}

export default Reciept;
