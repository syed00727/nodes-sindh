import { ofType } from "redux-observable";
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from "rxjs/operators";
import { commandResponse, fetchNodeDetail, FETCH_ALL_NODE_DETAILS, FETCH_NODES, FETCH_NODE_DETAIL, SEND_COMMAND, updateNodeDetail, updateNodes, updateAllNodeDetails, FETCH_NODE_HISTORY, updateNodeHistory,fetchAllNodeDetails ,UPDATE_NODE_DETAIL, addToHistory } from "../actions/nodes";


const HOST = `https://syed-app-512.herokuapp.com`

export const fetchNodesEpic = (action$, store) =>
    action$
        .pipe(ofType(FETCH_NODES),
            mergeMap(action =>
                ajax.getJSON(`${HOST}/api/nodes/`)
                    .pipe(map(res =>
                        updateNodes(res)
                    )
                    )
            )
        )

export const fetchNodeDetailEpic = action$ =>
    action$.pipe(ofType(FETCH_NODE_DETAIL),
        mergeMap(action =>
            ajax.getJSON(`${HOST}/api/node/status/${action.payload}`)
                .pipe(map(res =>
                    updateNodeDetail(res)
                )
                )
        )
    )

export const sendCommandEpic = action$ =>
    action$.pipe(ofType(SEND_COMMAND), mergeMap(
        action =>
            ajax.post(
                `${HOST}/api/node/command/${action.payload.command}?id=${action.payload.id}`)
                .pipe(map(res =>
                    commandResponse(res)
                ), map(() => fetchAllNodeDetails())
                )
    )
    )

export const fetchAllNodeDetailsEpic = action$ =>
    action$.pipe(ofType(FETCH_ALL_NODE_DETAILS), mergeMap(
        action => ajax.getJSON(
            `${HOST}/api/nodes/all`).pipe(
                map(res => updateAllNodeDetails(res))
            )
    )
    )

export const fetchNodeHistoryEpic = action$ =>
    action$.pipe(ofType(FETCH_NODE_HISTORY), mergeMap(
        action => ajax.getJSON(
            `${HOST}/api/node/history/${action.payload}`).pipe(
                map(res => updateNodeHistory(action.payload, res))
            )
    )
    )

// export const updateNodeHistoryEpic = action$ =>
//     action$.pipe(ofType(UPDATE_NODE_DETAIL), map(action => addToHistory(action.payload)))
