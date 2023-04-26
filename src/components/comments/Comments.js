import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import "./comment.css";
import { MdAddLocationAlt } from "react-icons/md";
function Comments() {
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  let token = document.cookie.split("=")[1];
  let name = localStorage.getItem("name");

  const state = location.state;
  const val = name === state.name;
  const [newComments, setNewComments] = useState("");
  const [comments, setComments] = useState([]);
  let url = "https://insta-clone-back-end-gamma.vercel.app/comment";
  function deleteComment(deleteID) {
    fetch(`${url}/${deleteID}`, {
      method: "DELETE",
      headers: {
        token: token,
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
            alert("Comment deleted");
            setFlag(!flag);
            console.log(flag);
          });
        }
      })
      .catch((err) => alert("Unable to Delete"));
  }
  useEffect(() => {
    fetch(`${url}/${state._id}`, {
      method: "GET",
      headers: {
        token: token,
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
            setComments(result.comment);
          });
        }
      })
      .catch((err) => alert("Unable to like"));
  }, [flag]);
  function addComments() {
    fetch(`${url}/${state._id}`, {
      method: "POST",
      headers: {
        token: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: localStorage.getItem("name"),
        comment: newComments,
      }),
    })
      .then((response) => {
        if (response.statusText === "Forbidden") {
          alert("Session over");
          navigate("/");
        } else {
          response.json().then((result) => {
            console.log(result);
            setFlag(!flag);
            setNewComments("");
            alert("Comment added");
          });
        }
      })
      .catch((err) => alert("Unable to add comment"));
  }
  return (
    <>
      {console.log(state)}
      <div className="container detailPage">
        <div className="tagscenter">
          <img src={state.imageUrl} className="right" />
          <div
            className="left"
            style={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "35%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3
                style={{
                  textAlign: "start",
                  width: "100%",
                }}
              >
                {state.name.toUpperCase()}
              </h3>
              <span style={{ width: "100%", textAlign: "start" }}>
                <MdAddLocationAlt /> {state.location}
              </span>
              <h5 style={{ width: "100%", textAlign: "start" }}>
                {state.caption}
              </h5>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  value={newComments}
                  onChange={(e) => setNewComments(e.target.value)}
                  placeholder="Enter Comment"
                  aria-label="Enter Comment"
                  aria-describedby="basic-addon2"
                />
                <span
                  onClick={() => addComments()}
                  class="input-group-text"
                  id="basic-addon2"
                >
                  Comment
                </span>
              </div>
            </div>
            <div
              style={{
                overflow: "auto",
                height: "65%",
                width: "100%",
                textAlign: "justify",
                paddingLeft: "15px",
                marginTop: "15px",
                paddingRight: "15px",
              }}
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-offset="0"
              class="scrollspy-example"
              tabindex="0"
            >
              {comments.length === 0 ? (
                <>
                  <h5>No Comments</h5>
                </>
              ) : (
                <>
                  {comments.map((items) => {
                    return (
                      <div
                        style={{
                          width: "100%",
                          boxShadow:
                            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                          display: "flex",
                          height: "auto",
                          alignItems: "center",
                          justifyContent: "space-around",
                          marginBottom: "10px",
                          padding: "25px 0px",
                        }}
                      >
                        <div
                          style={{
                            width: "70%",
                          }}
                        >
                          <h6>{items.name.toUpperCase()}:</h6>
                          <span style={{ marginLeft: "25px" }}>
                            {items.comment}
                          </span>
                        </div>
                        {(items.name === name || val) && (
                          <>
                            <div
                              style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                onClick={() => deleteComment(items._id)}
                                style={{ fontSize: "0.8rem" }}
                                type="button"
                                class="btn btn-danger"
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
