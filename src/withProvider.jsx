import { useContext } from "react"
import { alertContext, loginContext } from "./Context"

function withProvider(provider) {
   function providerHOC(IncomingComponent) {
        function OutgoingComponent(props) {

            const contextData = useContext(provider)

            return <IncomingComponent {...props} {...contextData} />
        }

        return OutgoingComponent
    }

    return providerHOC
}

export default withProvider;

export const withAlert = withProvider(alertContext)
export const withUser = withProvider(loginContext)
