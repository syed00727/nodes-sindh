export const UPDATE_NODES = 'UPDATE_NODES'
export const FETCH_NODES = 'FETCH_NODES'
export const FETCH_NODE_DETAIL = 'FETCH_NODE_DETAIL'
export const UPDATE_NODE_DETAIL = 'UPDATE_NODE_DETAIL'
export const SEND_COMMAND = 'SEND_COMMAND'
export const COMMAND_RES = 'COMMAND_RES'
export const FETCH_ALL_NODE_DETAILS = 'FETCH_ALL_NODE_DETAILS'
export const UPDATE_ALL_NODE_DETAILS = 'UPDATE_ALL_NODE_DETAILS'
export const FETCH_NODE_HISTORY = 'FETCH_NODE_HISTORY'
export const UPDATE_NODE_HISTORY = 'UPDATE_NODE_HISTORY'

export const fetchNodes = () => ({ type: FETCH_NODES })
export const updateNodes = (nodes = null) => ({ type: UPDATE_NODES, payload: nodes })
export const fetchNodeDetail = id => ({ type: FETCH_NODE_DETAIL, payload: id })
export const updateNodeDetail = detail => ({ type: UPDATE_NODE_DETAIL, payload: detail })
export const sendCommand = (command, node) => ({ type: SEND_COMMAND, payload: { command, id: node } })
export const commandResponse = response => ({ type: COMMAND_RES, payload: response })
export const fetchAllNodeDetails = () => ({ type: FETCH_ALL_NODE_DETAILS })
export const updateAllNodeDetails = response => ({ type: UPDATE_ALL_NODE_DETAILS, payload: response })
export const fetchNodeHistory = id => ({ type: FETCH_NODE_HISTORY, payload: id })
export const updateNodeHistory = (id, history) => ({ type: UPDATE_NODE_HISTORY, payload: { id, history } })

