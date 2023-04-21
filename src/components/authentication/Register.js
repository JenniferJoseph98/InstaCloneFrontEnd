import React, { useState } from "react";
import "./login.css";
import Modal from "react-modal";
import { IoMail } from "react-icons/io5";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { GoUnverified } from "react-icons/go";
import { GoVerified } from "react-icons/go";
import { CgUnavailable } from "react-icons/cg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);
  function passwordChange(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (id === "pass") setShowPass(!showPass);
    else setConfrimShowPass(!confrimshowPass);
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function checkFirstStep() {
    if (error.email && error.name) {
      setSlide(slide + 1);
    } else {
      setContent({
        ...content,
        message: "Kindly verify name and email",
        status: false,
      });
      openModal();
    }
  }
  function checkSecStep() {
    if (details.password.length < 8) {
      setContent({
        ...content,
        message: "Password must be 8 characters",
        status: false,
      });
      openModal();
    } else {
      if (details.password === details.confirmPassword) {
        axios
          .post("https://insta-clone-back-end-gamma.vercel.app/users/signup", {
            name: details.name,
            email: details.email,
            password: details.password,
          })
          .then((res) => {
            setContent({
              ...content,
              message: "Register successfully",
              status: true,
            });
            openModal();
            alert("Register Successfully");

            navigate("/");
          })
          .catch((err) => {
            setContent({
              ...content,
              message: "Unable to register",
              status: false,
            });
            openModal();
          });
      } else {
        setContent({
          ...content,
          message: "Password and confirm Password not  Matched",
          status: false,
        });
        openModal();
      }
    }
  }
  function closeModal() {
    setModalIsOpen(false);
    setContent({ ...content, message: "" });
  }
  const [content, setContent] = useState({
    message: "",
    status: false,
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    confirmPassword: "",
    password: "",
    dob: "",
    phoneNumber: "",
  });
  const [details, setDetails] = useState({
    email: "",
    name: "",
    confirmPassword: "",
    password: "",
    dob: "",
    phoneNumber: "",
  });
  const [verify, setVerify] = useState({
    email: true,
    name: true,
  });
  const [slide, setSlide] = useState(1);
  function verifyEmail() {
    var filter =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(details.email)) {
      alert("Please provide a valid email address");
    } else {
      axios
        .get(
          `https://insta-clone-back-end-gamma.vercel.app/users/email/${details.email}`
        )
        .then((res) => {
          setVerify({ ...verify, email: false });
          setContent({
            ...content,
            message: "Email available",
            status: true,
          });
          openModal();
          setError({ ...error, email: true });
        })
        .catch((e) => {
          setContent({
            ...content,
            message: "Registered User, Kindly Login",
            status: false,
          });
          openModal();
        });
    }
  }
  function verifyName() {
    if (details.name.length < 3) {
      alert("Name must be atleast 3 letters");
    } else {
      axios
        .get(
          `https://insta-clone-back-end-gamma.vercel.app/users/name/${details.name}`
        )
        .then((res) => {
          console.log(res);
          setVerify({ ...verify, name: false });
          setContent({
            ...content,
            message: "Name available",
            status: true,
          });
          openModal();
          setError({ ...error, name: true });
        })
        .catch((e) => {
          console.log(e);
          setContent({
            ...content,
            message: "Name not available",
            status: false,
          });
          openModal();
        });
    }
  }
  return (
    <div className="forms">
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h5 style={{ marginBottom: "0px" }}>{content.message}</h5>
        <span
          style={{
            fontSize: "6rem",
          }}
        >
          {content.status ? (
            <>
              <GoVerified />
            </>
          ) : (
            <>
              <CgUnavailable />
            </>
          )}
        </span>
        <button
          onClick={closeModal}
          style={{
            width: "100%",
            color: "#f5576c",
            backgroundColor: "white",

            fontSize: "1rem",
            fontWeight: "bolder",
          }}
          type="button"
          className="btn btn-sm"
        >
          Okay
        </button>
      </Modal>
      <form
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
        {slide === 1 && (
          <>
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
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                className="form-control"
                placeholder="Enter email"
                aria-label="Amount (to the nearest dollar)"
              />
              <span
                style={{
                  color: "#f5576c",
                  fontSize: "1.2rem",
                  fontWeight: "80px",
                }}
                className="input-group-text"
                onClick={() => verifyEmail()}
              >
                {!error.email ? <GoUnverified /> : <GoVerified />}
              </span>
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
                <FaUserCircle />
              </span>
              <input
                type="text"
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                className="form-control"
                placeholder="Enter name"
                aria-label="Amount (to the nearest dollar)"
              />
              <span
                onClick={() => verifyName()}
                style={{
                  color: "#f5576c",
                  fontSize: "1.2rem",
                  fontWeight: "80px",
                }}
                className="input-group-text"
              >
                {!error.name ? <GoUnverified /> : <GoVerified />}
              </span>
            </div>
            <button
              onClick={() => checkFirstStep()}
              style={{
                width: "100%",
                background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bolder",
              }}
              type="button"
              className="btn btn-sm"
            >
              Next
            </button>
          </>
        )}
        {slide === 2 && (
          <>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    height: "100%",
                    color: "#f5576c",
                    fontSize: "1.2rem",
                    fontWeight: "80px",
                  }}
                >
                  <RiLockPasswordFill />
                </span>
              </div>
              <input
                type="password"
                id="pass"
                className="form-control"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
                placeholder="Enter Password"
                aria-label="Email"
                aria-describedby="basic-addon1"
              />

              <span
                onClick={() => passwordChange("pass")}
                className="input-group-text"
                style={{
                  color: "#f5576c",
                  fontSize: "1.2rem",
                  fontWeight: "80px",
                }}
                id="basic-addon1"
              >
                {showPass ? <AiTwotoneEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    height: "100%",
                    color: "#f5576c",
                    fontSize: "1.2rem",
                    fontWeight: "80px",
                  }}
                >
                  <RiLockPasswordFill />
                </span>
              </div>
              <input
                type="password"
                id="confrimpass"
                className="form-control"
                onChange={(e) =>
                  setDetails({ ...details, confirmPassword: e.target.value })
                }
                value={details.confirmPassword}
                placeholder="Confirm Password"
                aria-label="confrim password"
                aria-describedby="basic-addon1"
              />

              <span
                onClick={() => passwordChange("confrimpass")}
                className="input-group-text"
                style={{
                  color: "#f5576c",
                  fontSize: "1.2rem",
                  fontWeight: "80px",
                }}
                id="basic-addon1"
              >
                {showPass ? <AiTwotoneEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <button
              onClick={() => checkSecStep()}
              style={{
                width: "100%",
                background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bolder",
              }}
              type="button"
              className="btn btn-sm"
            >
              Register
            </button>
          </>
        )}
        <Link to="/">Login</Link>
      </form>
    </div>
  );
}

export default Register;
