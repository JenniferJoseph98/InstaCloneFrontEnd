import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stop from "./Stop";
import { MdAddLocationAlt } from "react-icons/md";

import Reload from "./Reload";
import "./post.css";
import { MdDownload } from "react-icons/md";
import { TfiHeart } from "react-icons/tfi";
import { FaRegComment } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { HiShare } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./Header";
function Post() {
  const [post, setPost] = useState([]);
  let token = document.cookie.split("=")[1];
  let email = localStorage.getItem("email");
  let url = "https://insta-clone-back-end-gamma.vercel.app/post";
  const [hasMore, sethasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  function checkLikes(id) {
    fetch(`${url}/likes/${id}`, {
      method: "PATCH",
      headers: {
        token: token,
        email: email,
        name: localStorage.getItem("name"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.statusText === "Forbidden") {
          alert("Session over");
          navigate("/");
        } else {
          response.json().then((result) => {
            setLoad(!load);
          });
        }
      })
      .catch((err) => alert("Unable to like"));
  }
  function downloadImage(url) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "instaclone.jpg";
      link.click();
    };
  }

  useEffect(() => {
    fetch(`${url}/${skip}`, {
      method: "GET",
      headers: {
        token: token,
        email: email,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.statusText === "Forbidden") {
          alert("Session over");
          navigate("/");
        } else {
          response.json().then((result) => {
            console.log(result);
            setPost(result);
          });
        }
      })
      .catch((err) => navigate("/"));
  }, [load]);

  const fetchData = async () => {
    fetch(`${url}/${skip}`, {
      method: "GET",
      headers: {
        token: token,
        email: email,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.statusText === "Forbidden") {
          alert("Session over");
          navigate("/");
        } else {
          response.json().then((result) => {
            setPost([...post, ...result]);
            if (result.length === 0) sethasMore(false);
            setSkip(skip + 10);
          });
        }
      })
      .catch((err) => navigate("/"));
  };
  return (
    <>
      <Header />

      <div className="postview-body">
        <InfiniteScroll
          dataLength={post.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Reload />}
          endMessage={<Stop />}
        >
          <div className="postcontent container">
            {post.map((items, index) => {
              return (
                <div key={items._id} className="posteach">
                  <div className="postTop">
                    <div className="location">
                      <span
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "bold",
                          fontFamily: "'Judson', serif",
                        }}
                      >
                        {items.name.toUpperCase()}
                      </span>
                      <span
                        style={{
                          width: "100%",
                          textAlign: "start",
                          paddingBottom: "10px",
                        }}
                      >
                        <MdAddLocationAlt /> {items.location}
                      </span>
                    </div>

                    <MdDownload
                      onClick={() => downloadImage(items.imageUrl)}
                      style={{
                        fontSize: "2rem",
                        color: "whitesmoke",
                        fontWeight: "3rem",
                      }}
                    />
                  </div>

                  <img
                    alt="url"
                    src={items.imageUrl}
                    style={{ width: "100%", height: "45%" }}
                  />
                  <div className="postmiddle" style={{ fontSize: "1.2rem" }}>
                    <div className="middleleft">
                      {!items.likes.includes(localStorage.getItem("name")) ? (
                        <>
                          <TfiHeart
                            style={{ fontSize: "1.4rem" }}
                            onClick={() => checkLikes(items._id)}
                          />
                        </>
                      ) : (
                        <>
                          <BsFillHeartFill
                            style={{ fontSize: "1.4rem", color: "red" }}
                            onClick={() => checkLikes(items._id)}
                          />
                        </>
                      )}
                      <FaRegComment
                        onClick={() => {
                          navigate("/comment", { state: items });
                        }}
                      />
                      <HiShare />
                    </div>

                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                      className="middleright"
                    >
                      {items.date.split("T")[0]}
                    </div>
                  </div>
                  <span
                    style={{
                      width: "100%",
                      textAlign: "start",
                      paddingLeft: "15px",
                    }}
                  >
                    {items.likes.length} Likes
                  </span>

                  <p
                    style={{
                      width: "100%",
                      textAlign: "start",
                      padding: "0 15px",
                    }}
                  >
                    {items.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Post;
