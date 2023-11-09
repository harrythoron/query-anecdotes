import { createContext, useReducer, useContext } from "react";

export const notifiReducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "NOTIFY":
            return action.payload
        case "HIDE":
            return ''
        default:
            return state
    }
}

const NotifiContext = createContext()

export const NotifiContextProvider = (props) => {
    const [notifyMsg, notifyMsgDispatch] = useReducer(notifiReducer, '')

    return (
        <NotifiContext.Provider value={[notifyMsg, notifyMsgDispatch]}>
            {props.children}
        </NotifiContext.Provider>
    )
}

export const useNotifiValue = () => {
    const notifiValAndDispatch = useContext(NotifiContext)
    return notifiValAndDispatch[0]
}

export const useNotifiDispatch = () => {
    const notifiValAndDispatch = useContext(NotifiContext)
    return notifiValAndDispatch[1]
}

export default NotifiContext