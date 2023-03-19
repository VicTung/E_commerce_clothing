import styled from "styled-components";
// import "./styles.scss";

export const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

function getButton(buttonType = BUTTON_TYPE_CLASSES.base) {
	return {
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPE_CLASSES.inverted]: invertedButton,
	}[buttonType];
}

const Button = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export const BaseButton = styled.button`
	min-width: 165px;
	width: auto;
	height: 50px;
	letter-spacing: 0.5px;
	line-height: 50px;
	padding: 0 35px 0 35px;
	font-size: 15px;
	background-color: black;
	color: white;
	text-transform: uppercase;
	font-family: "Open Sans Condensed";
	font-weight: bolder;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
`;

export const GoogleSignInButton = styled(BaseButton)`
	background-color: #4285f4;
	color: white;

	&:hover {
		background-color: #357ae8;
		border: none;
	}
`;

export const invertedButton = styled(BaseButton)`
	background-color: white;
	color: black;
	border: 1px solid black;

	&:hover {
		background-color: black;
		color: white;
		border: none;
	}
`;

export default Button;
