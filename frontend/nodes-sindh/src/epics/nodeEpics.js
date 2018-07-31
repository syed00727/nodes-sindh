import { mapTo, mergeMap, map } from "rxjs/operators";
import { updateNodes, FETCH_NODES, FETCH_NODE_DETAIL, updateNodeDetail, commandResponse, SEND_COMMAND } from "../actions/nodes";
import { ofType } from "redux-observable";
import { ajax } from 'rxjs/ajax'


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
                `${HOST}/node/command/${action.payload.command}?id=${action.payload.id}`)
                .pipe(map(res =>
                    commandResponse(res)
                )
                )
    )
    )