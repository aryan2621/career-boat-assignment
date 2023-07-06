import { db } from "../firebase/firebase";
import { FormClass } from "../model/form";
import { setDoc, getDocs } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";

export const addForm = async (form: FormClass) => {
  try {
    const docRef = await setDoc(doc(collection(db, "forms"), form.time), form);
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getForms = async () => {
  try {
    const forms: FormClass[] = [];
    const querySnapshot = await getDocs(collection(db, "forms"));
    querySnapshot.forEach((doc) => {
      forms.push(doc.data() as FormClass);
    });
    return forms;
  } catch (e) {
    console.error("Error retrieving forms: ", e);
    return [];
  }
};
