import React, { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import "./login.css";
import { IoMail } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [showPass, setShowPass] = useState(false);
  function passwordChange() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    setShowPass(!showPass);
  }
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onsubmits() {
    axios
      .post("https://insta-clone-back-end-gamma.vercel.app/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        document.cookie = `token=${res.data.token}`;
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        alert("Login Successfully");
        navigate("/post");
      })
      .catch((e) => alert("Enter valid credentials or Register"));
  }
  return (
    <div className="forms">
      <div
        className="container formtag"
        style={{
          width: "350px",
          maxWidth: "80%",
          maxHeight: "60%",
          padding: "25px",
        }}
      >
        <img
          alt="insta"
          style={{ width: "45px", height: "45px" }}
          src="https://images.squarespace-cdn.com/content/v1/5494e83ae4b08be712d1dc65/1631037922788-VJVQJ189Z5VRI9Q8YUJG/instagram+icon.png"
        />
        <div className="input-group mb-3">
          <span
            style={{
              color: "#f5576c",
              fontSize: "1.2rem",
              fontWeight: "80px",
            }}
            className="input-group-text"
          >
            <IoMail />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Amount (to the nearest dollar)"
          />
        </div>
        <div className="input-group mb-3">
          <span
            style={{
              color: "#f5576c",
              fontSize: "1.2rem",
              fontWeight: "80px",
            }}
            className="input-group-text"
          >
            <RiLockPasswordFill />
          </span>
          <input
            id="myInput"
            type="text"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Amount (to the nearest dollar)"
          />
          <span
            style={{
              color: "#f5576c",
              fontSize: "1.2rem",
              fontWeight: "80px",
            }}
            onClick={() => passwordChange()}
            className="input-group-text"
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        <button
          onClick={() => onsubmits()}
          style={{
            width: "100%",
            background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bolder",
          }}
          type="submit"
          className="btn btn-sm"
        >
          Login
        </button>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Link to="/register">Signup</Link>
          <Link to="/forgot">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
