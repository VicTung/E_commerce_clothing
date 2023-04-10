import { async } from "@firebase/util";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import styled from "styled-components";
import Button, { BUTTON_TYPE_CLASSES } from "../button";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.reducer";

function PaymentForm() {
	// gobal state
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector((state) => state.user.currentUser);

	// local state
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	return (
		<Container>
			<FormContainer
				onSubmit={async (e) => {
					e.preventDefault();
					if (!stripe || !elements) return;

					setIsProcessingPayment(true);

					const response = await fetch("/.netlify/functions/payment", {
						method: "post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ amount: amount * 100 }),
					}).then((res) => res.json());

					console.log(response);
					console.log(response?.paymentIntent?.client_secret);
					const {
						paymentIntent: { client_secret },
					} = response;

					const paymentResult = await stripe.confirmCardPayment(client_secret, {
						payment_method: {
							card: elements.getElement(CardElement),
							billing_details: {
								name: currentUser ? currentUser.displayName : "Guest",
							},
						},
					});
					
					console.log("paymentResult", paymentResult);
					setIsProcessingPayment(false);

					if (paymentResult.error) {
						alert(paymentResult.error);
					} else {
						if (paymentResult.paymentIntent.status === "succeeded") {
							alert("Payment Successful");
						}
					}
				}}
			>
				<h2>Credit Card Payment:</h2>
				<CardElement />
				<PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
					Pay now
				</PaymentButton>
			</FormContainer>
		</Container>
	);
}

export default PaymentForm;

const Container = styled.div`
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const FormContainer = styled.form`
	height: 100px;
	max-width: 500px;
`;

const PaymentButton = styled(Button)`
	margin-left: auto;
	margin-top: 30px;
`;
