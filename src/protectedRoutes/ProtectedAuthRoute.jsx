import {useContext} from 'react'
import {Navigate} from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function ProtectedAuthRoute({children}) {
    const{userToken}=useContext(authContext)
    const isLoggedIn=!!userToken
  return (
    isLoggedIn? <Navigate to={"/"}/>: children
  )
}
