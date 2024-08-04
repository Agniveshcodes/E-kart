import React, { useState } from "react";
import { alertContext } from "./Context";

function AlertProvider({ children }) {
  const [alert, setAlert] = useState();

  const removeAlert = () => {
    setAlert(undefined);
  };

  return (
    <>
      <alertContext.Provider value={{ alert, setAlert, removeAlert }}>
        {children}
      </alertContext.Provider>
    </>
  );
}

export default AlertProvider;
