import { ofType } from "redux-observable";
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from "rxjs/operators";
import { commandResponse, fetchNodeDetail, FETCH_ALL_NODE_DETAILS, FETCH_NODES, FETCH_NODE_DETAIL, SEND_COMMAND, updateNodeDetail, updateNodes, updateAllNodeDetails } from "../actions/nodes";


const HOST = `https://nodes-sindh.herokuapp.com`

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
            ajax.getJSON(`${HOST}/api/node/${action.payload}`)
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
                ), map(() => fetchNodeDetail(action.payload.id))
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