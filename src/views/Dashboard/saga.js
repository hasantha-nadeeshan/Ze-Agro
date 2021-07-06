import { put, call, takeEvery, take} from "redux-saga/effects";
import {
    GET_CARDS,
    GET_CARDS_SUCCESS,

} from "./action";
import {eventChannel} from "redux-saga";
import {firestore} from "../../config/Firebase";

function* callGetAllCardsSagas() {
    const ref= firestore.collection('Devices').orderBy("created","desc");;
    const channel = eventChannel((emit)=>ref.onSnapshot(emit));
    while(true){
        try {
            const res = yield take(channel);
            const data = res.docs.map(doc=>{
                return doc.data()
            })
            yield put({type: GET_CARDS_SUCCESS, data: data});    
        } catch (error) {
            console.log(error);
        }
    }

}
export function* watchGetAllCards() {
    yield takeEvery(GET_CARDS, callGetAllCardsSagas);
}

