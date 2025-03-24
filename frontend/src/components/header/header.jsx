import logo from '../../images/logo.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PiUsersFill } from 'react-icons/pi';
import { IoIosSearch } from 'react-icons/io';
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Basket } from '../../pages';
import { LuLogOut } from 'react-icons/lu';
import {
	selectUserLogin,
	selectUserRole,
	selectBasketOpen,
	selectBasketOrdersCount,
	selectFlag,
} from '../../selectors';
import {
	actionFlag,
	basketOpen,
	logout,
	ordersBasketCount,
	searchTextPhrase,
} from '../../action';
import { ROLE } from '../../constants/role';
import styled from 'styled-components';
import { useLayoutEffect, useState } from 'react';
import { request } from '../../utils';
import { selectCountReviews } from '../../selectors/select-count-reviews';

const HeaderContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const countReviews = useSelector(selectCountReviews);
	const [reviews, setReviews] = useState([]);
	const flag = useSelector(selectFlag);
	const orderCount = useSelector(selectBasketOrdersCount);
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const isBasketOpen = useSelector(selectBasketOpen);
	const [searchPhrase, setSearchPhrase] = useState('');

	useLayoutEffect(() => {
		if (roleId === ROLE.GUEST) {
			dispatch(ordersBasketCount(0));
		}
		request('/reviews', 'GET').then((responce) => {
			setReviews(responce.data);
		});
	}, [countReviews, roleId, dispatch]);

	const openBasket = () => {
		if (roleId === ROLE.GUEST) {
			navigate('/errorBasket');
		} else {
			dispatch(basketOpen(!isBasketOpen));
		}
	};

	const clickSearch = () => {
		navigate('/catalog');
		setSearchPhrase('');
		dispatch(searchTextPhrase(searchPhrase));
	};

	const onLogout = () => {
		dispatch(logout());
		request('/basket', 'DELETE');
		dispatch(actionFlag(!flag));
		dispatch(ordersBasketCount(0));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<div className="header">
				<div className="header-text">
					<div className="header-number">+7(999)999-99-99</div>
					{roleId === ROLE.ADMIN ? (
						<PiUsersFill
							className="header-icons-users"
							onClick={() => navigate('/users')}
						/>
					) : null}
					{roleId === ROLE.GUEST ? (
						<Link to="/login">Войти/Регистрация</Link>
					) : (
						<div className="header-login">
							{login}
							<LuLogOut
								className="header-icons-logout"
								onClick={onLogout}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="header-logo">
				<img src={logo} alt="logo" width={110} height={90} />
				<h1>sports nutrition</h1>
				<div className="header-search">
					<input
						placeholder="Поиск товара..."
						value={searchPhrase}
						onChange={({ target }) => setSearchPhrase(target.value)}
					/>
					<IoIosSearch className="header-search-icons" onClick={clickSearch} />
				</div>
				<FaCartShopping className="header-basket-icons" onClick={openBasket} />
				<Basket />
				<div className={`header-basket-text ${orderCount > 0 && 'active'}`}>
					{orderCount}
				</div>
			</div>
			<div className="header-nav">
				<IoMdArrowRoundBack
					className="header-arrow"
					onClick={() => navigate(-1)}
				/>
				<Link to="/">Главная</Link>
				<Link to="/catalog">Каталог товаров</Link>
				<Link to="/reviews">
					Отзывы
					<div className="countReviews">{reviews.length}</div>
				</Link>
				<Link to="/about">О нас</Link>
				<Link to="/contacts">Контакты</Link>
			</div>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	position: relative;
	width: 100%;
	padding: 10px;
	align-items: center right;

	.header {
		display: flex;
		width: 1470px;
		height: 60px;
		align-items: center;
		font-size: 20px;
		font-weight: 500;
		color: #red;
	}

	.header-icons-users {
		margin: 0 10px 0 0;
		width: 30px;
		height: 30px;
		cursor: pointer;
		transition: color 500ms ease;
	}

	.header-icons-users:hover {
		color: #555;
	}

	.header-text {
		display: flex;
		align-items: center;
		text-decoration: none;
		margin: 0 10px 0 auto;
	}

	.header-number {
		margin: 40px;
	}

	.header-icons-logout {
		font-size: 25px;
		margin: 0px 10px -6px 10px;
		cursor: pointer;
		transition: color 500ms ease;
	}

	.header-icons-logout:hover {
		color: #555;
	}

	.header-login {
		font-size: 22px;
		font-weight: 500;
		margin: 0px 0px 5px;
	}

	.header-logo {
		display: flex;
		justify-content: space-between;
		width: 1470px;
		height: 100px;
		align-items: center;
		font-size: 20px;
		font-weight: 500;
	}

	.header-logo img {
		margin: 0 6px 0 10px;
	}

	.header-search input {
		display: flex;
		justify-content: space-between;
		width: 700px;
		height: 35px;
		align-items: center;
		margin: 9px 81px -34px;
		font-size: 20px;
		font-weight: 200;
		padding: 0px 35px 0px 15px;
	}

	.header-search-icons {
		width: 30px;
		height: 30px;
		cursor: pointer;
		float: right;
		margin: 0 85px 0;
	}

	.header-basket {
		display: flex;
		font-size: 22px;
		font-weight: bold;
		margin: 5px 0 0 20px;
	}

	.header-basket-icons {
		width: 35px;
		height: 35px;
		cursor: pointer;
		float: right;
		margin: 25px -70px 10px;
		transition: color 500ms ease;
	}

	.header-basket-icons:hover {
		color: #555;
	}

	.header-basket-text {
		display: flex;
		width: 35px;
		height: 35px;
		border: 0.5px solid #000;
		align-items: center;
		border-radius: 50%;
		margin: 15px 10px -1px;
		font-weight: 500;
		justify-content: center;
	}

	.header-basket-text.active {
		border: 3px solid #0000ff;
	}

	.header-nav {
		display: flex;
		border: 1px solid #000;
		width: 1470px;
		height: 60px;
		align-items: center;
		background-color: #000;
		column-gap: 65px;
		font-size: 23px;
		color: #fff;
		font-weight: 400;
		justify-content: space-between;
		transition: opacity 500ms ease;
	}

	.header-nav a:hover {
		opacity: 0.5;
	}

	a {
		color: #333;
		text-decoration: none;
	}

	.header-arrow {
		width: 70px;
		height: 40px;
		cursor: pointer;
		transition: opacity 500ms ease;
	}

	.header-arrow:hover {
		opacity: 0.5;
	}

	.header-nav a {
		color: #fff;
		margin: 0 75px 0 40px;
	}

	.countReviews {
		display: flex;
		border: 1px solid #fff;
		border-radius: 50%;
		width: 23px;
		height: 20px;
		align-items: center;
		margin: -35px -30px 17px 86px;
		justify-content: center;
		font-size: 18px;
	}
`;
