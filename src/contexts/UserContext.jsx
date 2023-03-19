import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase";
import { createUserDocumentFromAuth } from "../utils/firebase";

export const UserContext = createContext(null);
export const SetCurrentUserContext = createContext(() => null);

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubcribe = onAuthStateChangedListener((user) => {
			if (user) createUserDocumentFromAuth(user);
			setCurrentUser(user);
		});

		return unsubcribe;
	}, []);

	return (
		<UserContext.Provider value={currentUser}>
			<SetCurrentUserContext.Provider value={setCurrentUser}>{children}</SetCurrentUserContext.Provider>
		</UserContext.Provider>
	);
};
