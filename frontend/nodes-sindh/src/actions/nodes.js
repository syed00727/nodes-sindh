export const UPDATE_NODES = 'UPDATE_NODES'
export const FETCH_NODES = 'FETCH_NODES'

export const fetchNodes = () => ({ type: FETCH_NODES })
export const updateNodes = (nodes = null) => ({ type: UPDATE_NODES, payload: nodes })