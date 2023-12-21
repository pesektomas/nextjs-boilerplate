
import {getFirestore, collection, addDoc} from "firebase/firestore";
import {firebaseApp} from "@/firebaseConfig";

const db = getFirestore(firebaseApp)
const dbInstance = collection(db, 'todos');

export default async function addData(data) {
    let result = null;
    let error = null;

    try {
        await addDoc(dbInstance, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
