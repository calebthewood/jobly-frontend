import { createContext } from "react";
import { IUser } from "../interfaces";

interface UserContextType {
  currentUser: IUser|null;
}

const UserContext = createContext<UserContextType>({currentUser: null});

export default UserContext;