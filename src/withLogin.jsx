import { useContext } from "react"
import { loginContext } from "./Context"

function withLogin(IncomingComponent) {
    function OutgoingComponent(props) {

        const { user , setUser } = useContext(loginContext)

        return <IncomingComponent {...props} user={user} setUser={setUser} />
    }

    return OutgoingComponent
}

export default withLogin;