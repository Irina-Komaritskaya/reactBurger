import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router";
import { useHistory } from "react-router";

export function RedirectAuthUser(Component, path) {
  return function RedirectComponent(props){
    const history = useHistory();

    const [user, isLoadingUser] = useAuth();
    if (!isLoadingUser){
      return null
    }
    console.log(history.length)
    if (user){
      if(history.length === 1){
       return <Redirect to={{path}}/>
      }

      history.goBack();
      return null;
    }
    return <Component {...props}/>
  } 
}