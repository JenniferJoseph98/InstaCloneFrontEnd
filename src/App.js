import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Post from "./components/postView/Post";
import Comments from "./components/comments/Comments";
import Add from "./components/addpost/Add";
import Protected from "./Protected";
import MyPost from "./components/mypost/MyPost";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/post"
          element={
            <Protected>
              <Post />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <Add />
            </Protected>
          }
        />
        <Route
          path="/mypost"
          element={
            <Protected>
              <MyPost />
            </Protected>
          }
        />
        <Route
          path="/comment"
          element={
            <Protected>
              <Comments />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
