import Directory from "../../components/directory";
import { createContext, useContext, useRef, useState } from "react";

function Home() {
	return (
		<>
			<Directory />
			<Save>
				<Header></Header>
				<Body></Body>
				<Content></Content>
				<ContentTwo></ContentTwo>
				<Footer></Footer>
			</Save>
		</>
	);
}

export default Home;

const DataContext = createContext(1);
const SaveDataContext = createContext(1);
const LogDataContext = createContext(1);
const RenderContext = createContext(() => {});
const SetRenderContext = createContext(() => {});
const SetStateContext = createContext(() => {});

const Save = ({ children }) => {
	const [render, setRender] = useState();
	const [otherState, setOtherState] = useState("");
	const data = useRef(1);
	const setData = () => {
		data.current = "321321";
		console.log(3421493269);
	};
	console.log("save re", data);

	const logData = () => {
		console.log(data);
		console.log("loggg");
	};
	return (
		<RenderContext.Provider value={render}>
			<SetRenderContext.Provider value={setRender}>
				<SetStateContext.Provider value={setOtherState}>
					{/* <LogDataContext.Provider value={logData}>
					<DataContext.Provider value={data.current}>
						<SaveDataContext.Provider value={setData}> */}
					{children}
					{/* </SaveDataContext.Provider>
					</DataContext.Provider>
				</LogDataContext.Provider> */}
				</SetStateContext.Provider>
			</SetRenderContext.Provider>
		</RenderContext.Provider>
	);
};

const Header = () => {
	const data = useContext(DataContext);
	console.log("render", data);
	return (
		<button
			onClick={() => {
				console.log(data);
			}}
		>
			11
		</button>
	);
};
const Footer = () => {
	const renderState = useContext(RenderContext);
	console.log("renderState", renderState);
	return <div className="">Footer</div>;
};
const Content = () => {
	const setRender = useContext(SetRenderContext);
	console.log("Content");
	return (
		<div className="">
			<button onClick={() => setRender(Math.random())}>Content</button>
		</div>
	);
};
const ContentTwo = () => {
	const setState = useContext(SetStateContext);
	const setRender = useContext(SetRenderContext);

	console.log("contenttwo");
	return <div className="">contenttwo</div>;
};

const Body = () => {
	const data = useContext(DataContext);
	const setData = useContext(SaveDataContext);
	const logData = useContext(LogDataContext);

	return (
		<>
			<button
				onClick={() => {
					setData();
				}}
			>
				22
			</button>
			<button
				onClick={() => {
					logData();
				}}
			>
				33
			</button>
		</>
	);
};
