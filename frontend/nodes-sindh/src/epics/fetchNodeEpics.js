import { mapTo, mergeMap, map } from "rxjs/operators";
import { updateNodes, FETCH_NODES } from "../actions/nodes";
import { ofType } from "redux-observable";
import { ajax } from 'rxjs/ajax'

export const fetchNodesEpics = (action$, store) =>
    action$
        .pipe(ofType(FETCH_NODES),
            mergeMap(action =>
                ajax.getJSON('http://nodes-sindh.herokuapp.com/api/nodes')
                    .pipe(map(res =>
                        updateNodes(res)
                    )
                    )
            )
        )
