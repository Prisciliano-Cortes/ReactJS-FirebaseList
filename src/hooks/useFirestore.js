import { useEffect, useState } from "react"
import { nanoid } from 'nanoid'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { db, auth } from "../../firebase"

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState({})

    const getDataFirebase = async () => {
        try {
            setLoading((prev) => ({ ...prev, getData: true }));

            const datRef = collection(db, 'url')
            const q = query(datRef, where("uid", "==", auth?.currentUser?.uid))
            const querySnapshot = await getDocs(q)

            const dataDB = querySnapshot?.docs.map(doc => doc?.data())

            setData(dataDB)
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, getData: false }));
        }
    }

    const addDataFirestore = async (url) => {
        try {
            setLoading((prev) => ({ ...prev, addData: true }));

            const newDoc = {
                nanoid: nanoid(6),
                enabled: true,
                origin: url,
                uid: auth.currentUser.uid
            }

            const docRef = doc(db, 'url', newDoc.nanoid)

            await setDoc(docRef, newDoc)

            setData([
                ...data,
                newDoc
            ])
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, addData: false }));
        }
    }

    const deleteDataFirebase = async (nanoid) => {
        try {
            setLoading((prev) => ({ ...prev, [nanoid]: true }));

            const docRef = doc(db, 'url', nanoid)

            await deleteDoc(docRef)

            setData(data.filter(item => item.nanoid !== nanoid))
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading((prev) => ({ ...prev, [nanoid]: false }));
        }
    }

    const updateDataFirebase = async (nanoid, origin) => {
        try {
            setLoading((prev) => ({ ...prev, updateData: true }));
            const docRef = doc(db, 'url', nanoid)

            await updateDoc(docRef, { origin })

            setData(data.map(item => item.nanoid === nanoid ? ({ ...item, origin }) : item))
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }));
        }
    }

    const searchData = async (nanoid) => {
        try {
            const docRef = doc(db, "url", nanoid);
            const docSnap = await getDoc(docRef);
            return docSnap;
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        getDataFirebase()
    }, [])

    return {
        data,
        error,
        loading,
        addDataFirestore,
        deleteDataFirebase,
        updateDataFirebase,
        searchData
    }
}