import { Routes, Route } from 'react-router-dom';
import { Goods } from './pages/catalog';
import { OneGoods } from './pages/catalog/one-goods/one-goods.jsx';
import { NewReviews } from './pages/reviews';
import {
	About,
	Authorization,
	Catalog,
	Contacts,
	Error,
	ErrorBasket,
	Registration,
	Reviews,
	Users,
	Main,
} from './pages';
import { Header, Footer } from './components';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { setUser } from './action';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 1500px;
	min-height: 100%;
	position: relative;
	margin: 0 auto;
	background-color: #fff;
`;

export const App = ({ className }) => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<Container>
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route path="/catalog/:id" element={<Goods />} />
				<Route path="/catalog/:id/:id" element={<OneGoods />} />
				<Route path="/reviews" element={<Reviews />} />
				<Route path="/newReviews" element={<NewReviews />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/about" element={<About />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/users" element={<Users />} />
				<Route path="/errorBasket" element={<ErrorBasket />} />
				<Route path="*" element={<Error />} />
			</Routes>
			<Footer />
		</Container>
	);
};
