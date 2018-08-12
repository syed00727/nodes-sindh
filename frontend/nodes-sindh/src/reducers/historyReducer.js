import { UPDATE_NODE_HISTORY } from "../actions/nodes";


export const history = (state = null, action) => {
    switch (action.type) {
        case UPDATE_NODE_HISTORY:
            return action.payload.history
        default:
            return state;
    }
}