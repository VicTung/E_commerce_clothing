import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signUpStart } from "../../store/user/user.reducer";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase";
import Button, { BUTTON_TYPE_CLASSES } from "../button";
import FormInput from "../form-input";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function SignUpForm() {
	const dispatch = useDispatch();

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	function handleChange(e) {
		const { name, value } = e.target;
		setFormFields((pre) => {
			return { ...pre, [name]: value };
		});
	}

	async function handleSubmiss(event) {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("passwords do not match");
			return;
		}

		try {
			// const { user } = await createAuthUserWithEmailAndPassword(email, password);

			// await createUserDocumentFromAuth(user, { displayName });
			dispatch(signUpStart(email, password, displayName));

			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("email already in use");
			}
		}
	}

	return (
		<SignUpContainer>
			<h2>Don't have an accout?</h2>
			<span>Sign up</span>
			<form action="a" onSubmit={handleSubmiss}>
				<FormInput label="Display name" type="text" onChange={handleChange} name={"displayName"} value={displayName} />
				<FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} />
				<FormInput label="Password" type="password" onChange={handleChange} name={"password"} value={password} />
				<FormInput label="Confirm password" type="password" onChange={handleChange} name={"confirmPassword"} value={confirmPassword} />
				<Button buttonType={BUTTON_TYPE_CLASSES.google} type="submit">
					Sign up
				</Button>
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

export default SignUpForm;
