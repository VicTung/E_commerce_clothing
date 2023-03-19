// import { signInWithGoogleRedirect } from "../../utils/firebase";
import styled from "styled-components";
import SignInForm from "../../components/signInForm";
import SignUpForm from "../../components/singUpForm";

function Authentication() {
	// useEffect(() => {
	// 	(async () => {
	// 		const response = await getRedirectResult(auth);
	// 		if (response) await createUserDocumentFromAuth(response.user);
	// 		console.log(response?.user);
	// 	})();
	// }, []);

	return (
		<Container>
			{/* <div onClick={signInWithGoogleRedirect}>redirect</div> */}
			<SignInForm />
			<SignUpForm />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	width: 900px;
	justify-content: space-between;
	margin: 30px auto;
`;

export default Authentication;
