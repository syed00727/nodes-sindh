export const UPDATE_NODES = 'UPDATE_NODES'
export const FETCH_NODES = 'FETCH_NODES'
export const FETCH_NODE_DETAIL = 'FETCH_NODE_DETAIL'
export const UPDATE_NODE_DETAIL = 'UPDATE_NODE_DETAIL'
export const SEND_COMMAND = 'SEND_COMMAND'
export const COMMAND_RES = 'COMMAND_RES'

export const fetchNodes = () => ({ type: FETCH_NODES })
export const updateNodes = (nodes = null) => ({ type: UPDATE_NODES, payload: nodes })
export const fetchNodeDetail = id => ({ type: FETCH_NODE_DETAIL, payload: id })
export const updateNodeDetail = detail => ({ type: UPDATE_NODE_DETAIL, payload: detail })
export const sendCommand = (command, node) => ({ type: SEND_COMMAND, payload: { command, id: node } })
export const commandResponse = response => ({ type: COMMAND_RES, payload: response })

