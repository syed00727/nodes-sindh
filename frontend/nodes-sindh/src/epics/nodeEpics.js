import { mapTo, mergeMap, map } from "rxjs/operators";
import { updateNodes, FETCH_NODES, FETCH_NODE_DETAIL, updateNodeDetail } from "../actions/nodes";
import { ofType } from "redux-observable";
import { ajax } from 'rxjs/ajax'

export const fetchNodesEpic = (action$, store) =>
    action$
        .pipe(ofType(FETCH_NODES),
            mergeMap(action =>
                ajax.getJSON('https://nodes-sindh.herokuapp.com/api/nodes/')
                    .pipe(map(res =>
                        updateNodes(res)
                    )
                    )
            )
        )

export const fetchNodeDetailEpic = action$ =>
    action$.pipe(ofType(FETCH_NODE_DETAIL),
        mergeMap(action =>
            ajax.getJSON(`https://nodes-sindh.herokuapp.com/api/node/${action.payload}`)
                .pipe(map(res =>
                    updateNodeDetail(res)
                )
                )
        )
    )