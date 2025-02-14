import { createContext, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("userToken") || null
  );

  return (
    <userContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </userContext.Provider>
  );
}
