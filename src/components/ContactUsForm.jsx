import React, { useState } from "react";
import { axios } from "../utils/axios";

export const ContactUsForm = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && message && subject) {
      axios
        .post("/sendContactMail", { from: email, message, subject })
        .then((data)=>{
          alert("Thanks for contacting us, we will get back to you soon.")
          console.log(data)
          setEmail("")
          setMessage("")
          setSubject("")
        })
        .catch(console.log);
    } else {
      alert("Please fill in all required fields below");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Contact</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          value={subject}
          placeholder="Subject"
          id="subject"
          name="subject"
          onChange={(e) => setSubject(e.target.value)}
        />

        <label htmlFor="email">Your Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="yourmail@gmail.com"
          id="email"
          name="email"
        />

        <label htmlFor="password">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="info"
          name="info"
          style={{ height: "200px", marginBottom: "2em", padding: "1em" }}
          placeholder="type in messages"
        ></textarea>
        <button type="submit">Send Mail</button>
      </form>
      {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an Account? Register here.</button> */}
    </div>
  );
};
