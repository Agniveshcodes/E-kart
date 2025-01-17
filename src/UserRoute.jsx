import React from "react";
import { Navigate } from "react-router-dom";
import { withUser } from "./withProvider";



function UserRoute({children , user}) {

    if (!user) {
        return <Navigate to={"/"} />
    }

    return children
}

export default withUser(UserRoute);