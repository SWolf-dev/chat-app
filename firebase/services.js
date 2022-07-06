
import {doc, setDoc} from 'firebase/firestore';
import {db} from "./config";

export const setDocument = async(collection,uid,data)=>{
    await setDoc(doc(db, collection,uid), data);
}