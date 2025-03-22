import img from '../../images/fon.jpg';
import { Loader } from '../../components';
import styled from 'styled-components';
import { useState } from 'react';

const MainContainer = ({ className }) => {
	const [loader, setLoader] = useState(true);	

	setTimeout(() => setLoader(false), 1000);

	return (
		<div className={className}>
			{loader ? (
				<Loader margin="370px 700px" />
			) : (
				<>
					<h1>sports nutrition</h1>
					<div className="main-fon">
						<img src={img} alt="" />
					</div>
				</>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	padding: 10px;
	color: #777;
	margin: 20px;
	//padding-bottom: 100px;

	h1 {
		margin: 22px 0px 34px 1162px;
	}

	.main-fon {
		width: 100%;
		height: 100%;
		//border: 1px solid #000;
		background-size: cover;
		//background-color: #bcbcbc;
		background-blend-mode: multiply;
		position: relative;
		//padding-bottom: 100px;
	}

	.main-fon img {
		width: 100%;
		height: 100%;
		//padding: 300px;
		//margin-bottom: 100px;
	}

	.main-fon::after {
		color: #fff;
		content: 'Лучшие товары для спорта и отдыха';
		position: absolute;
		top: 40px;
		left: 40px;
		font-size: 40px;
		font-weight: 600;
	}

	.main-fon::before {
		color: #fff;
		content: 'по низким ценам';
		position: absolute;
		top: 100px;
		left: 40px;
		width: 300px;
		font-size: 15px;
		font-weight: 300;
	}
`;
