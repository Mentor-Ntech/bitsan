// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../utils/axios";
import image from "../../image/cover-bg.png";
import logo from "../../image/logo.jpg";
import "./signin.css";
import Web3 from "web3";
import Toastify from "../../components/toastify";
import Loader from "../../components/loader";
import { userCOntext } from "../../context/context";

function SignIn() {
  const [active, setActive] = useState("signup");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refetchUser } = useContext(userCOntext);

  const provider =
    "https://goerli.infura.io/v3/a55fe6484cc74df28d02d2cc262c5581";
  let web3 = new Web3(provider);
  // setAccountInfo(web3.eth.accounts.create(web3.utils.randomHex(32)));

  useEffect(() => {
    setAccountInfo(web3.eth.accounts.create(web3.utils.randomHex(32)));
  }, []);

  const clearState = () => {
    setEmail("");
    setPassword("");
    setCountry("");
    setBusinessName("");
    setFullname("");
  };

  const signUp = (e) => {
    const { address, privateKey } = accountInfo;
    e.preventDefault();
    if (email && password && country && businessName && fullName) {
      setLoading(true);
      axios
        .post("/signup", {
          email,
          password,
          country,
          businessName,
          address,
          privateKey,
          fullName,
        })
        .then((resp) => {
          console.log(resp);
          setToast(["Registration Successful", "success", "signIn"]);
          clearState();
          
          localStorage.setItem("bitsanAccessToken", resp.data.accessToken);
          localStorage.setItem("bitsanRefreshToken", resp.data.refreshToken);

          refetchUser(resp.data.accessToken, resp.data.refreshToken)
          
          setTimeout(() => {
            refetchUser()

            setLoading(false);
            console.log(resp.data)
            navigate("/dashboard", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          clearState();
          if (err.code === "ERR_NETWORK") {
            setToast(["Network error", "error", "signIn"]);
            setLoading(false);
            return;
          }
          setToast([err?.response?.data?.message, "error", "signIn"]);
          console.log(err?.response?.data?.message);
          refetchUser();
          setLoading(false);
        });
    } else {
      setToast(["Please fill in all fields", "error", "input-incomplete"]);
    }
  };

  const login = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      axios
        .post("login", { password, email })
        .then((resp) => {
          console.log(resp);
          setToast(["Login Successful", "success", "login"]);
          clearState();

          localStorage.setItem("bitsanAccessToken", resp.data.accessToken);
          localStorage.setItem("bitsanRefreshToken", resp.data.refreshToken);

          refetchUser();


          setTimeout(() => {
           
            setLoading(false);
            console.log("login ", resp.data.user);
            navigate("/dashboard", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          clearState();
          if (err.code === "ERR_NETWORK") {
            setToast(["Network error", "error", "signIn"]);
            setLoading(false);
            return;
          }
          setToast([err?.response?.data?.message, "error", "signIn"]);
          console.log(err?.response?.data?.message);
          setLoading(false);
        });
    } else {
      setToast(["Please fill in all fields", "error", "input-incomplete"]);
    }
  };
  return (
    <div>
      {toast && <Toastify info={toast} setToast={setToast} />}
      {loading ? (
        <Loader />
      ) : (
        <div className="signup-container">
          <div className="signup-left">
            <div className="signup-left-top">
              <div className="logo">
                <Link to="/">
                  <img src={logo} />
                </Link>
              </div>
              <div className="text-left" onClick={()=>{
            navigate("/dashboard", { replace: true });
              }}>
                Start receiving{" "}
                <span style={{ color: "lightgreen" }}>payments</span> in less
                than 20 minutes
              </div>
            </div>
            <div className="signup-left-bottom">
              <img src={image} />
            </div>
          </div>
          <div className="signup-right">
            <div className="form">
              <div className="signup-form">
                <div className="signup-header">
                  <div className="signup-header-left">
                    <span className="signup-header-txt">
                      {active === "signup" ? "Create Account" : "Login"}
                    </span>
                    <span className="signup-sub-header-txt">
                      {active === "signup"
                        ? "Let's get you started! Create account to begin"
                        : "Let's get you back in"}
                    </span>
                  </div>
                  <div className="signup-header-right">
                    {active === "signup" ? (
                      <button
                        className="login-button"
                        onClick={() => setActive("login")}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="login-button"
                        onClick={() => setActive("signup")}
                      >
                        SignUp
                      </button>
                    )}
                  </div>
                </div>

                <form>
                  {active === "signup" ? (
                    <>
                      <div className="input-label">
                        <label>
                          <span>Full Name</span>
                          <input
                            type="text"
                            className="signup-input"
                            placeholder="Full Name"
                            name="fullName"
                            required
                            onChange={(e) => setFullname(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="input-label">
                        <label>
                          <span>Email</span>
                          <input
                            type="text"
                            className="signup-input"
                            placeholder="Email"
                            name="eamil"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="input-label">
                        <label>
                          <span>Country</span>
                          <input
                            type="text"
                            className="signup-input"
                            placeholder="Country"
                            name="country"
                            required
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="input-label">
                        <label>
                          <span>Business Name</span>
                          <input
                            type="text"
                            className="signup-input"
                            placeholder="Business Name"
                            name="bName"
                            required
                            onChange={(e) => setBusinessName(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="input-label">
                        <label>
                          <span>Password</span>
                          <input
                            type="password"
                            className="signup-input"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="terms-cond">
                        By creating an account you agree to the terms and
                        conditions an privacy policy
                      </div>
                      <button className="form-button" onClick={signUp}>
                        Create Account
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="input-label">
                        <label>
                          <span>Email</span>
                          <input
                            type="text"
                            className="signup-input"
                            placeholder="Email"
                            name="eamil"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </label>
                      </div>

                      <div className="input-label">
                        <label>
                          <span>Password</span>
                          <input
                            type="password"
                            className="signup-input"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </label>
                      </div>

                      <div className="terms-cond">
                        By clicking on login, you agree to the terms and
                        conditions an privacy policy
                      </div>
                      <button className="form-button" onClick={login}>
                        Login
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
