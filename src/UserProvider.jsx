import React,{useState ,useEffect} from "react";
import { loginContext } from "./Context";
import Loading from "./Loading";
import axios from "axios";

function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [loadingUser, setLoadingUser] = useState(true);

    const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((respnse) => {
          setUser(respnse.data);
          setLoadingUser(false);
        }).catch(() => {
          localStorage.removeItem("token")
          setLoadingUser(false)
        });
    } else {
      setLoadingUser(false);
    }
  }, []);
    
  if (loadingUser) {
    return <Loading />;
  }


    return <>
      <loginContext.Provider value= {{user , setUser}}>
      {children}
    </loginContext.Provider >
    </>
}

export default UserProvider;