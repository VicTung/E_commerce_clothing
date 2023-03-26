import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAkBU-_iEGloTXqI2u_BbhYUMcrynP7nHo",
	authDomain: "e-commerce-clothing-db-625cb.firebaseapp.com",
	projectId: "e-commerce-clothing-db-625cb",
	storageBucket: "e-commerce-clothing-db-625cb.appspot.com",
	messagingSenderId: "957511099658",
	appId: "1:957511099658:web:045924271425b3869606f3",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("addCollectionAndDocuments done");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryArray = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

	return categoryArray;
};

export const createUserDocumentFromAuth = async (userAuth, additionInformaion = {}) => {
	if (!userAuth) return;
	const userDocRef = doc(db, "user", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		console.log('userSnapshot not exist')
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionInformaion,
			});
			console.log('setDoc')
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.log("error", error);
	}
};

export const onAuthStateChangedListener = (callback) => {
	return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			() => {
				reject();
			}
		);
	});
};
