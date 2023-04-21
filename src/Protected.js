import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  let name = localStorage.getItem("name");
  if (name === null) {
    name = "";
  }
  return <div>{name.length ? children : <Navigate to="/" />}</div>;
};
export default Protected;
