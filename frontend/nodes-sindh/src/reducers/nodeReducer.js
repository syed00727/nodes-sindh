import { UPDATE_NODES } from "../actions/nodes";

export const nodes = (state = null, action) => {
    switch (action.type) {
        case UPDATE_NODES:
            return action.payload;
        default:
            return state;
    }
}