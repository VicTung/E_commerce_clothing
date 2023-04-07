import { async } from "@firebase/util";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import styled from "styled-components";
import Button, { BUTTON_TYPE_CLASSES } from "../button";

function PaymentForm() {
	const stripe = useStripe();
	const elements = useElements();

	return (
		<Container>
			<FormContainer
				onSubmit={async (e) => {
					e.preventDefault();
					// if (stripe || elements) return;

					const response = await fetch("/.netlify/functions/payment", {
						method: "post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ amount: 10000 }),
					}).then((res) => res.json());
					
					console.log(response);
					console.log(response?.paymentIntent?.client_secret);
					const {
						paymentIntent: { client_secret },
					} = response;

					console.log(client_secret);

					const paymentResult = await stripe.confirmCardPayment(client_secret, {
						payment_method: {
							card: elements.getElement(CardElement),
							billing_details: {
								name: "testName",
							},
						},
					});

					console.log("paymentResult", paymentResult);

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
				<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
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
