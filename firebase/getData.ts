import {getFirestore, collection, getDocs} from "@firebase/firestore";
import {firebaseApp} from "@/firebaseConfig";

const db = getFirestore(firebaseApp)
const dbInstance = collection(db, 'todos');

export default async function getData() {
    return await getDocs(dbInstance)
        .then((fbData) => {
            let data = fbData.docs.map((doc) => ({ ...doc.data() }))

            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}
