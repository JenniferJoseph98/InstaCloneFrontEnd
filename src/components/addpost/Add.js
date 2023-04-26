import React, { useState } from "react";
import "./add.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  function addPost() {
    axios
      .post(
        "https://insta-clone-back-end-gamma.vercel.app/post/add",
        {
          name: localStorage.getItem("name"),
          imageUrl: image,
          caption: details.caption,
          location: details.location,
        },
        {
          headers: {
            Authorization: "Bearer <access_token>",
            "Content-Type": "application/json",
            token: document.cookie.split("=")[1],
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("Post added");
        navigate("/post");
      })
      .catch((err) => {
        console.log(err);
        //  alert("Unable to post");
      });
  }
  const [details, setDetails] = useState({
    caption: "",
    location: "",
    imageUrl: "",
  });
  function preViewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      setImage(reader.result);
      //   console.log(image);
    };
  }
  function handleImage(e) {
    const file = e.target.files[0];
    preViewFiles(file);
  }
  const [image, setImage] = useState("");
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="addpopup">
        <h3 style={{ color: "whitesmoke" }}>Add Post</h3>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Caption
          </span>
          <input
            value={details.caption}
            onChange={(e) =>
              setDetails({ ...details, caption: e.target.value })
            }
            type="text"
            class="form-control"
            placeholder="Caption"
            aria-label="Caption"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Location
          </span>
          <input
            type="text"
            value={details.location}
            onChange={(e) =>
              setDetails({ ...details, location: e.target.value })
            }
            class="form-control"
            placeholder="Location"
            aria-label="Location"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Image
          </span>
          <input
            type="file"
            onChange={(e) => handleImage(e)}
            class="form-control"
            placeholder="Image"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <button
          onClick={() => addPost()}
          style={{
            width: "100%",
            backgroundColor: "rgb(247, 61, 92)",
            color: "whitesmoke",
          }}
          class="btn"
          type="button"
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

export default Add;
