import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.reducer";
import { createUserDocumentFromAuth, signInAuthWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase";
import Button, { BUTTON_TYPE_CLASSES } from "../button";
import FormInput from "../form-input";

const defaultFormFields = {
	email: "",
	password: "",
};

function SignInForm() {
	const dispatch = useDispatch();

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	async function signInWithGoogle() {
		dispatch(googleSignInStart());
		// await signInWithGooglePopup();
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setFormFields((pre) => {
			return { ...pre, [name]: value };
		});
	}

	async function handleSubmiss(event) {
		event.preventDefault();
		try {
			// await signInAuthWithEmailAndPassword(email, password);
			dispatch(emailSignInStart(email, password));
		} catch (error) {
			if (error.code === "auth/wrong-password") {
				alert("wrong password or email");
			} else if (error.code === "auth/user-not-found") {
				alert("this user not found");
			}
		}
		setFormFields(defaultFormFields);
	}

	return (
		<SignUpContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form action="a" onSubmit={handleSubmiss}>
				<FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} />
				<FormInput label="Password" type="password" onChange={handleChange} name={"password"} value={password} />
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignUpContainer>
	);
}

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 380px;

	h2 {
		margin: 10px 0;
	}
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default SignInForm;
