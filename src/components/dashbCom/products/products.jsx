import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { userCOntext } from "../../../context/context";
import { axios } from "../../../utils/axios";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Toastify from "../../toastify";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import logo from "../../../image/logo.jpg";

function Products({ setTab, paymentLinkId, setPaymentLinkId }) {
  const { user, refetchUser } = useContext(userCOntext);
  // console.log(user?.user?.userId);
  const [productInfo, setProductInfo] = useState([]);
  const [privateCopy, setPrivateCopy] = useState(false);
  const [toast, setToast] = useState(null);

  const getProducts = () => {
    axios("/products/getAllProducts")
      .then((data) => {
        setProductInfo(data.data);
        console.log("data all prod ", data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProducts();
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

              <table onClick={() => console.log(productInfo)}>
                <>
                  <thead>
                    <tr>
                      <th colSpan="5">Products</th>
                      <th colSpan="2">
                        <button
                          onClick={() => navigate("/dashboard/create_product")}
                        >
                          Add Product
                        </button>
                      </th>
                    </tr>
                    <tr onClick={() => console.log(productInfo)}>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Link</th>
                      <th>Status</th>
                      {/* <th>Copy Link</th> */}
                      <th>View</th>
                    </tr>
                  </thead>
                  {productInfo.length === 0 ? (
                    <th colSpan="7">No products has been created yet!!</th>
                  ) : (
                    <tbody>
                      {productInfo &&
                        productInfo.map((item, i) => {
                          const base64String = btoa(
                            new Uint8Array(item.img.data.data).reduce(function (
                              data,
                              byte
                            ) {
                              return data + String.fromCharCode(byte);
                            },
                            "")
                          );
                          return (
                            <tr>
                              <td
                                onClick={() =>
                                  console.log(item.img.contentType)
                                }
                              >
                                {i + 1}
                              </td>
                              <td>
                                {" "}
                                <img
                                  src={`data:${item.img.contentType};base64,${base64String}`}
                                  alt="product-img"
                                />
                              </td>
                              <td>{item?.productName}</td>
                              <td>{item?.description?.substring(0, 25)}...</td>
                              <td>{item?.productLink?.substring(0, 18)}...</td>
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
                              <NavLink
                                to={`/dashboard/product_view/${item._id}`}
                              >
                                <td style={{ cursor: "pointer" }}>
                                  <span style={{ color: "black" }}>view</span>
                                </td>
                              </NavLink>
                            </tr>
                          );
                        })}
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

export default Products;
