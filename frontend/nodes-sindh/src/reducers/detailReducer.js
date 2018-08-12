import { UPDATE_NODE_DETAIL, UPDATE_ALL_NODE_DETAILS } from "../actions/nodes";
import Immutable, { Map, OrderedMap } from 'immutable'

export const detail = (state = Map(), action) => {
    switch (action.type) {
        case UPDATE_NODE_DETAIL:
            return state.set(action.payload.Id, action.payload);
        case UPDATE_ALL_NODE_DETAILS:
            return state.merge(generateMap(action.payload))
        default:
            return state;

    }
}

const generateMap = lst => {

    let map = Map();
    lst.forEach(obj => {
        map = map.set(obj.Id, obj)
    });

    return map;
}