import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { query, where, orderBy, collection, onSnapshot, doc } from "firebase/firestore";

function useFireStore(collect, condition) {
    let [documents,setDocuments] = useState([]);
    useEffect(()=>{
        // let collectionRef = collection(db,'user','Phạm Tới_xEFYywOs1EXteYdAaIltCRac8P32');
        // const citiesRef = collection(db, "cities");
        console.log(collection(db,'rooms'))
        if(!condition || !condition.compareValue || !condition.compareValue.length){
            return;
        }
        // const q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue),orderBy("createdAt"));
        // console.log(q,collectionRef)
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     const documents = querySnapshot.docs.map(doc=>({
        //         ...doc.data(),
        //         id: doc.id
        //     }));
        //     setDocuments(documents);
        // });
        // return unsubscribe;
    },[collection, condition]);
    return documents;
}

export default useFireStore;