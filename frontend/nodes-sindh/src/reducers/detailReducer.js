import { UPDATE_NODE_DETAIL } from "../actions/nodes";
import Immutable, { Map, OrderedMap } from 'immutable'

export const detail = (state = null, action) => {
    switch (action.type) {
        case UPDATE_NODE_DETAIL:
            return action.payload;
        default:
            return state;
    }
}