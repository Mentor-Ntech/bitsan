import React, { useContext, useState } from "react";
import { userCOntext } from "../../../context/context";
import DashbHeader from "../../../pages/dashboard/dashbHeader";
import DashbLeft from "../../../pages/dashboard/dashbLeft";
import { axios } from "../../../utils/axios";
import ButtonLoader from "../../buttonLoader";
import IdenticonImg from "../../identicon";
import "./settings.css";
const Settings = ({}) => {
  const { user, refetchUser } = useContext(userCOntext);
  const [fullName, setFullName] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const updateFullName = () => {
    if (!fullName) {
      alert("Please enter a full name");
      return;
    }
    axios
      .put("/userUpdate/updateFullName", { fullName, _id: user?.user?.userId })
      .then((data) => {
        refetchUser();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // window.localStorage.setItem('food', 'rice');

  // const localStoragFood = window.localStorage.getItem('food');

  // console.log(localStoragFood);

  const validatePassword = (password, rePassword) => {
    if (password != rePassword) {
      setPasswordErr("Password must match");
    } else {
      setPasswordErr("");
    }
  };
  const updatePassword = () => {
    if (passwordErr) return;
    if (rePassword != "" && password != "" && previousPassword != "") {
      setBtnLoading(true);
      axios
        .put("/userUpdate/updatePassword", {
          previousPassword,
          password,
          _id: user?.user?.userId,
        })
        .then((data) => {
          if (data?.data?.message) {
            alert(data?.data?.message);
            if (data?.data?.message != "Previous password is not valid") {
              setRePassword("");
              setPassword("");
              setPreviousPassword("");
            }
            setBtnLoading(false);
          }
        })
        .catch((err) => {
          setBtnLoading(false);
          console.log(err);
        });
    } else {
      alert("Please fill all the required fields for password");
    }
  };
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
              <div>
                <div className="settings-page">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <br />
                    <div className="section">
                      <span className="section-span">Change Full Name</span>
                      <div className="settings-image">
                        <IdenticonImg />
                      </div>
                      <label htmlFor="profile" className="upload-pPic-btn">
                        Change profile picture
                      </label>

                      <input
                        type="file"
                        id="profile"
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="section">
                    <span className="section-span">Change Full Name</span>
                    <div className="address-box">
                      <label className="label">
                        Full Name <br />
                        <input
                          type="text"
                          className="input"
                          placeholder="Full Name"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </label>
                      <button className="form-btn" onClick={updateFullName}>
                        Change FullName
                      </button>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <span className="section-span">Change Password</span>
                  <div className="private-key-box">
                    <div>
                      <label className="label">
                        Present Password
                        <br />
                        <input
                          className="input"
                          placeholder="input previous password"
                          value={previousPassword}
                          onChange={(e) => setPreviousPassword(e.target.value)}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="label">
                        New Password
                        <br />
                        <input
                          className="input"
                          placeholder="input previous password"
                          value={password}
                          onChange={(e) => {
                            validatePassword(e.target.value, rePassword);
                            setPassword(e.target.value);
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="label">
                        Re-Enter New Password
                        <br />
                        <input
                          className="input"
                          placeholder="input new password"
                          value={rePassword}
                          onChange={(e) => {
                            validatePassword(password, e.target.value);
                            setRePassword(e.target.value);
                          }}
                        />
                        <div>
                          <b>{passwordErr && passwordErr}</b>
                        </div>
                      </label>
                    </div>

                    <div>
                      {btnLoading ? (
                        <button className="form-btn">
                          <ButtonLoader />
                        </button>
                      ) : (
                        <button className="form-btn" onClick={updatePassword}>
                          Change Password
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
