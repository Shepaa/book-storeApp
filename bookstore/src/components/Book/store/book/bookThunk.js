import * as action from "./bookReducer"
import {allBooksAPI} from "../../../../API/server";

export const actionGetBookList = () => {
    return (dispatch) => {
        dispatch(action.getListLoading())
        allBooksAPI.getList()
            .then((newList) => {
                dispatch(action.getListSuccessfully(newList.content))
            })
            .catch((error) => dispatch(action.reducer(error.message)));
    }
}