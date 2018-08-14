import { UPDATE_NODE_HISTORY, ADD_TO_HISTORY } from "../actions/nodes";
import { Map } from 'immutable'

export const history = (state = Map(), action) => {
    switch (action.type) {
        case UPDATE_NODE_HISTORY:
            return state.set(action.payload.id, action.payload.history)
        case ADD_TO_HISTORY:
            return appendToHistory(action.payload, state);
        default:
            return state;
    }
}


const appendToHistory = (payload, state) => {
    const nodeId = payload.Id
    let history = state.get(nodeId)
    // === avoided since it gives false with undefined
    if (history == null) {
        return state.set(nodeId, [payload])
    }
    history.push(payload)
    return state.set(nodeId, history)

}