import { db } from "../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { Status } from "../model/form";
import { query, where, getDocs, collection } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateForm = async (formStatus: Status, id: any) => {
  try {
    const res = await getIdByTime(id);
    if (res) {
      const docRef = doc(db, "forms", res);
      await updateDoc(docRef, {
        status: formStatus,
      });
    } else {
      console.log("Document not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const getIdByTime = async (time: string) => {
  try {
    const formsRef = collection(db, "forms");
    const q = query(formsRef, where("time", "==", time));
    const querySnapshot = await getDocs(q);
    let documentId = null;
    querySnapshot.forEach((doc) => {
      documentId = doc.id;
    });
    return documentId;
  } catch (error) {
    console.log(error);
    return null;
  }
};
