import { CgCloseR } from 'react-icons/cg';
import {
	selectBasketOpen,
	selectBasketOrdersCount,
	selectFlag,
	selectUserRole,
} from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useLayoutEffect, useState } from 'react';
import { actionFlag, basketOpen, ordersBasketCount } from '../../action';
import { Button } from '../../components';
import { request } from '../../utils';
import styled from 'styled-components';

const BasketContainer = ({ className }) => {
	let summa = 0;
	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);
	const [buy, setBuy] = useState(true);
	const isBasketOpen = useSelector(selectBasketOpen);
	const flag = useSelector(selectFlag);
	const [updateFlag, setUpdateFlag] = useState(false);
	const orderCount = useSelector(selectBasketOrdersCount);
	const roleId = useSelector(selectUserRole);

	useLayoutEffect(() => {
		async function fetchData() {
			await request('/basket', 'GET').then((responce, error) => {
				if (!error) {
					setOrders(responce.data);
					setUpdateFlag(true);
				}
			});
		}
		fetchData();
		dispatch(ordersBasketCount(orders.length));
	}, [flag, dispatch, orders.length, updateFlag, roleId, orderCount, isBasketOpen]);

	const Change = ({ target }) => {
		request(`/basket/${target.getAttribute('data')}`, 'PATCH', {
			quantity: target.value,
		});
		setUpdateFlag(!updateFlag);
		dispatch(actionFlag(!flag));
	};

	const deleteOrder = (id) => {
		request(`/basket/${id}`, 'DELETE');
		setUpdateFlag(!updateFlag);
		dispatch(actionFlag(!flag));
		dispatch(ordersBasketCount(orderCount - 1));
	};

	const Buy = () => {
		setBuy(false);
		request('/basket', 'DELETE');
		dispatch(ordersBasketCount(0));
		setUpdateFlag(!updateFlag);
	};

	if (orderCount === 0) {
		setTimeout(() => dispatch(basketOpen(false)), 6000);
		setTimeout(() => setBuy(true), 2000);
	}

	summa = (items) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

	return (
		<>
			<div className={className}>
				{isBasketOpen && (
					<>
						{orderCount === 0 ? (
							<div className="basket-empty">
								{buy === true
									? 'ваша корзина пуста'
									: 'спасибо за покупку, ждём вас снова'}
							</div>
						) : (
							<div className="basket">
								<CgCloseR
									className="basket-close"
									onClick={() => dispatch(basketOpen(!isBasketOpen))}
								/>
								<div className="basket-title">
									<b className="basket-title-product">Товар</b>
									<b className="basket-title-quantity">Кол-во</b>
									<b className="basket-title-price">Цена</b>
								</div>

								<div className="basket-goods">
									{orders.map(
										({ id, title, price, quantity, imageUrl }) => (
											<div className="orders" key={id}>
												<img src={imageUrl} alt="" />
												<b>{title}</b>
												<select
													className="orders-select"
													data={id}
													value={quantity}
													onChange={Change}
												>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
												</select>
												<p>
													{new Intl.NumberFormat().format(
														+price * +quantity,
													)}{' '}
													руб.
												</p>
												<div className="orders-delete">
													<RiDeleteBinLine
														onClick={() => deleteOrder(id)}
													/>
												</div>
											</div>
										),
									)}
								</div>
								<div className="orders-result">
									<div>
										Итого:{' '}
										{new Intl.NumberFormat().format(summa(orders))}{' '}
										руб.
									</div>
									<Button width="100px" onClick={Buy}>
										Купить
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export const Basket = styled(BasketContainer)`
	.basket-empty {
		position: absolute;
		background-color: #fafafa;
		width: 700px;
		height: 300px;
		top: 170px;
		right: 36px;
		box-shadow: 4px 5px 15px -7px #606060;
		z-index: 1000;
		font-size: 25px;
		text-align: center;
		line-height: 250px;
	}

	.basket {
		position: absolute;
		background-color: #fafafa;
		width: 700px;
		top: 170px;
		right: 36px;
		-webkit-box-shadow: 4px 5px 15px -7px #606060;
		box-shadow: 4px 5px 15px -7px #606060;
		z-index: 1000;
	}

	.basket-title {
		display: flex;
		padding: 5px 70px;
		margin: 30px 20px 45px;
		font-size: 22px;
		font-weight: 500;
		justify-content: space-between;
	}

	.basket-title-product {
		font-weight: 500;
		margin: 0px 80px;
	}

	.basket-title-quantity {
		font-weight: 500;
		margin: 0 0 0 50px;
	}

	.basket-title-price {
		font-weight: 500;
		margin: 0 20px 0 0px;
	}

	.basket-goods {
		display: flex;
		margin: -10px 10px 15px;
		width: 670px;
		height: 50px;
		align-items: center;
		font-size: 20px;
		font-weight: 400;
		display: inline-block;
		align-items: center;
	}

	.orders {
		display: flex;
		margin: 23px -5px;
		justify-content: space-between;
	}

	.orders p {
		width: 110px;
		color: #5fa36a;
		margin: 5px 0px;
	}

	.orders b {
		font-weight: 400;
		margin: 7px -35px 0 0;
		width: 320px;
	}

	.orders-select {
		width: 60px;
		height: 30px;
		font-size: 18px;
		margin: 5px 0px;
	}

	.orders-delete {
		cursor: pointer;
		margin: 5px 0px;
		transition:
			color,
			transform 500ms ease;
	}

	.orders-delete:hover {
		color: #888;
		transform: scale(1.5);
	}

	.basket-close {
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
		color: #000;
		transition: color 500ms ease;
	}

	.basket-close:hover {
		color: #333;
	}

	img {
		width: 40px;
		height: 40px;
		float: left;
		margin: -50px 40px 20px 20px;
	}

	.orders-result {
		display: flex;
		padding: 20px 20px;
		width: 640px;
		height: 40px;
		align-items: center;
		justify-content: space-between;
	}
`;
