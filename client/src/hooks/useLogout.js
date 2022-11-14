import { useContext } from "react";
import { CredentialsContext } from "../contexts/CredentialsContext";

export default function useLogout() {

  const { dispatch } = useContext(CredentialsContext);

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}