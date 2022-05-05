import {useContext} from "react"
import UserContext from "./UserContext";
import {useNavigate} from "react-router-dom"

function Logout() {
  const { removeCurrentUser } = useContext(UserContext);
  removeCurrentUser();
  const navigate = useNavigate();
  return navigate("/");
}

export default Logout;