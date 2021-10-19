import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router";

export function RedirectAuthUser(Component, path) {
  return function RedirectComponent(props){
    const [user, isLoadingUser] = useAuth();
    if (!isLoadingUser){
      return null
    }
    if (user){
      return <Redirect to={path}/>
    }
    return <Component {...props}/>
  } 
}