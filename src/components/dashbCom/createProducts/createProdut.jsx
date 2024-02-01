import React, { useContext, useState, useCallback, useEffect } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { IoHappySharp } from "react-icons//io5";
import { userCOntext } from "../../../context/context";
import { axios } from "../../../utils/axios";
import "./createProduct.css";
import Modal from "react-modal";
import { BsClipboard, BsFillBasketFill, BsUpload } from "react-icons/bs";
import Loader from "../../loader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import { MdOpenInNew } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { useDropzone } from "react-dropzone";
import logo from "../../../image/logo.jpg";
import Axios from "axios";

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

function CreateProduct({ setTab }) {
  const [confirmType, setConfirmationType] = useState("display-payment-page");
  const [prodName, setProdName] = useState("prod 1");
  const [description, setDescription] = useState("just describing");
  const [confirmationText, setConfirmationText] = useState(
    "thanks for your payment"
  );
  const [redirectUrl, setRedirectUrl] = useState("");
  const { user, refetchUser } = useContext(userCOntext);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null);
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
    setProdName("");
    setDescription("");
    setRedirectUrl("");
  };

  console.log(user?.user?.userId)

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 300,
    height: 300,
    padding: 4,
    boxSizing: "border-box",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // formdata for product image upload

  const uploadProduct = async () => {
    console.log(files[0]);
    let productData = new FormData();
    let productLink =
      "localhost:3000/product_link/" +
      user?.user?.userId +
      "/" +
      prodName.split(" ").join("_");

    productData.append("redirectUrl", redirectUrl);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("prodName", prodName);
    productData.append("userId", user?.user?.userId);
    productData.append("productLink", productLink);
    productData.append("image", files[0]);

    axios
      .post("/products/uploadProduct", productData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    console.log(description, prodName, price, redirectUrl);
  };

  const thumbs = files.map((file, i) => (
    <div style={thumb} key={i}>
      <span style={{ cursor: "pointer" }} onClick={() => setFiles([])}>
        <GiCancel size={30} color="#000" />
      </span>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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
                <div
                  className="create-link-container"
                  style={{ width: "100%" }}
                >
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
                  {/* <input type="file" onChange={e=>console.log(e.target.files[0])}/> */}
                  <div className="link-pay-container">
                    <div className="link-payment-header">
                      <div className="link-icon">
                        <BsFillBasketFill size={25} color="palevioletred" />
                      </div>
                      <div className="">
                        <h1>Product Information</h1>
                        {/* <p>Tell us what your payment link is about</p> */}
                      </div>
                    </div>
                    <div className="link-form-parent">
                      <div className="link-form">
                        <label>
                          <span className="link-title">Product name</span>
                          <br />
                          <input
                            type="text"
                            placeholder="Enter desired link name"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
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
                            Product description
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
                      <h1>Upload poduct image</h1>
                    </div>
                    <div className="confirmation-page-content drag-drop">
                      <>
                        <div
                          {...getRootProps({ className: "dropzone dnd-box" })}
                        >
                          <div className="upload-icon">
                            <BsUpload color="#fff" size={25} />
                          </div>
                          &nbsp; &nbsp;
                          <input {...getInputProps()} />
                          <div className="dnd-box-text">
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p>
                                Drag and drop some files here, or click to
                                select files
                              </p>
                            )}
                          </div>
                        </div>
                        <aside
                          style={thumbsContainer}
                          onClick={() => console.log(files)}
                        >
                          {thumbs}
                        </aside>
                      </>
                    </div>
                  </div>

                  <div className="confirmation-page">
                    <div className="confirmation-page-header">
                      <h1>Product price</h1>
                    </div>
                    <div className="confirmation-page-content price-box">
                      <div className="price-input-group">
                        <div className="currency-box">ETH</div>
                        <input
                          type="number"
                          className="price-input"
                          min={0}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="btn-container">
                    <button className="btnPay" onClick={uploadProduct}>
                      Upload Product
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

export default CreateProduct;
