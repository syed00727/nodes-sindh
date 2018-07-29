export const UPDATE_NODES = 'UPDATE_NODES'
export const FETCH_NODES = 'FETCH_NODES'
export const FETCH_NODE_DETAIL = 'FETCH_NODE_DETAIL'
export const UPDATE_NODE_DETAIL = 'UPDATE_NODE_DETAIL'

export const fetchNodes = () => ({ type: FETCH_NODES })
export const updateNodes = (nodes = null) => ({ type: UPDATE_NODES, payload: nodes })
export const fetchNodeDetail = id => ({ type: FETCH_NODE_DETAIL, payload: id })
export const updateNodeDetail = detail => ({ type: UPDATE_NODE_DETAIL, payload: detail })