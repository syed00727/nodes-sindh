import { UPDATE_NODE_DETAIL } from "../actions/nodes";

export const detail = (state = null, action) => {
    switch (action.type) {
        case UPDATE_NODE_DETAIL:
            return action.payload;
        default:
            return state;
    }
}