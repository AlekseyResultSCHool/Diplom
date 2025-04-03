import { CgCloseR } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	selectAddOnGoodsOpen,
	selectBasketOrdersCount,
	selectFlag,
	selectOnGoods,
	selectParamsId,
	selectUserRole,
} from '../../../selectors';
import { actionFlag, addOnGoodsOpen, basketOpen, ordersBasketCount } from '../../../action';
import { ROLE } from '../../../constants';
import { useEffect, useState } from 'react';
import { Button, Input, Loader, Message } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { request } from '../../../utils';
import styled from 'styled-components';

const initialState = {
	title: '',
	imageUrl: '',
	desc: '',
	information: '',
	price: '',
};

const OneGoodsContainer = ({ className }) => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectorAddOnGoodsOpen = useSelector(selectAddOnGoodsOpen);
	const [text, setText] = useState(null);
	const [loader, setLoader] = useState(true);
	const [catalog, setCatalog] = useState([]);
	const [onGoods, setOnGoods] = useState(useSelector(selectOnGoods));
	const orderCount = useSelector(selectBasketOrdersCount);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState(initialState);
	const roleId = useSelector(selectUserRole);
	const paramsId = useSelector(selectParamsId);
	const flag = useSelector(selectFlag);

	setTimeout(() => setLoader(false), 1000);

	useEffect(() => {
		request(`/catalogs`, 'GET').then((responce) => {
			setCatalog(responce.data);
		});
	}, []);

	const addGoodsBasket = () => {
		if (roleId === ROLE.GUEST) {
			setText('Для совершения покупок пройдите авторизацию');
		} else {
			request('/basket', 'POST', {
				id: onGoods.id,
				title: onGoods.title,
				imageUrl: onGoods.imageUrl,
				quantity: 1,
				price: onGoods.price,
			}).then(({ error }) => {
				if (error) {
					setError('Такой товар уже добавлен в корзину');
				} 				
				else if (!error) {
					dispatch(ordersBasketCount(orderCount + 1));
				}				
			});
			dispatch(actionFlag(!flag));
			dispatch(basketOpen(false));			
		}
	};

	const Click = (id) => {
		dispatch(basketOpen(false));
		navigate(`/catalog/${id}`);
		setLoader(true);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		request(`/catalogs/${paramsId}/goods`, 'POST', {
			title: formData.title,
			imageUrl: formData.imageUrl,
			desc: formData.desc,
			information: formData.information,
			price: formData.price,
		});
		setOnGoods(formData);
		dispatch(addOnGoodsOpen(false));
	};

	setTimeout(() => setText(null), 6000);

	return (
		<>
			<div className={className}>
				<div className="goods-table">
					<div className="table-title">
						<h1>Каталог товаров</h1>
					</div>
					{catalog.map(({ id, title }) => (
						<div className="title" key={id} onClick={() => Click(id)}>
							<b>{title}</b>
						</div>
					))}
				</div>

				{loader ? (
					<Loader margin="350px -500px" />
				) : (
					<>
						{text ? (
							<Message className="error-message" text={text} />
						) : (
							<div className="container">
								<div>
									<CgCloseR
										className="onGoods-close"
										onClick={() => navigate(-1)}
									/>
								</div>
								{selectorAddOnGoodsOpen ? (
									<div className="onGoods-add">
										<form className="form" onSubmit={onSubmit}>
											<Input
												className="add-input"
												width="750px"
												type="text"
												name="title"
												value={formData.title}
												required
												placeholder="Заголовок..."
												onChange={({ target }) =>
													setFormData({
														...formData,
														title: target.value,
													})
												}
											/>
											<Input
												className="add-input"
												width="750px"
												type="text"
												name="title"
												value={formData.imageUrl}
												required
												placeholder="Адрес URL..."
												onChange={({ target }) =>
													setFormData({
														...formData,
														imageUrl: target.value,
													})
												}
											/>
											<Input
												className="add-input"
												width="750px"
												type="text"
												name="title"
												value={formData.desc}
												required
												placeholder="Описание..."
												onChange={({ target }) =>
													setFormData({
														...formData,
														desc: target.value,
													})
												}
											/>
											<Input
												className="add-input"
												width="750px"
												type="text"
												name="title"
												value={formData.price}
												required
												placeholder="Цена..."
												onChange={({ target }) =>
													setFormData({
														...formData,
														price: target.value,
													})
												}
											/>
											<textarea
												className="add-textarea"
												value={formData.information}
												placeholder="Информация..."
												onChange={({ target }) =>
													setFormData({
														...formData,
														information: target.value,
													})
												}
											/>
											<Button
												className="add-button"
												width="150px"
												type="submit"
											>
												Добавить
											</Button>
										</form>
									</div>
								) : (
									<>
										<div className="onGoods">
											<img src={onGoods.imageUrl} alt="" />
											<h2>{onGoods.title}</h2>
											<p>{onGoods.desc}</p>
											<b>Цена: {onGoods.price} руб.</b>
										</div>
										<div className="info">
											<h3>{onGoods.information}</h3>
										</div>

										<Button
											className="to-cart"
											onClick={addGoodsBasket}
										>
											купить
										</Button>
									</>
								)}
								<div className="error">{error}</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export const OneGoods = styled(OneGoodsContainer)`
	display: flex;
	flex-wrap: flex;
	justify-content: space-between;
	margin: 50px 20px;

	.container {
		border: 1px solid #000;
		width: 850px;
		height: 700px;
		margin: 75px 100px;
		border-radius: 20px;
		position: relative;
	}

	.error-message {
		margin: 320px 300px;
	}

	.onGoods-close {
		width: 22px;
		height: 22px;
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
	}

	img {
		width: 350px;
		height: 350px;
		float: left;
		margin: -40px 40px 20px 20px;
	}

	.onGoods h2,
	.onGoods p,
	.onGoods b {
		margin: 80px 0px 80px 0px;
		color: #333;
	}

	.onGoods b {
		color: #5fa36a;
	}

	.info {
		border: 1px solid #000;
		border-radius: 20px;
		margin: 150px 50px;
		width: 750px;
		height: 150px;
		text-align: center;
	}

	.to-cart {
		position: absolute;
		right: 20px;
		bottom: 325px;
		background: #ca5252;
		width: 105px;
		height: 35px;
		text-align: center;
		line-height: 32px;
		border-radius: 5%;
		font-weight: 500;
		font-size: 22px;
		color: #333;
		transition: transform 500ms ease;
	}

	.to-cart:hover {
		transform: scale(1.1) translate(-5px);
	}

	.add-input {
		margin: 20px 50px;
	}
	.add-textarea {
		width: 750px;
		height: 100px;
		font-size: 18px;
		margin: 20px 50px;
	}

	.add-button {
		position: absolute;
		right: 42px;
	}

	.error {
		color: red;
		font-size: 22px;
		margin: -130px 200px 0 250px;
	}

	.goods-table {
		border: 1px solid #000;
		width: 350px;
		height: 800px;
		border-radius: 20px;
		margin: 20px 25px;
		text-align: center;
		color: #fff;
		background: url('https://i.pinimg.com/736x/30/48/ab/3048abaf69cf15967fb2abe484256fe4.jpg')
			no-repeat center;
		background-size: cover;
	}

	.table-title {
		margin: 50px 0;
	}

	.title {
		margin: 18px;
		cursor: pointer;
		font-size: 23px;
		transition: color 500ms ease;
	}

	.title:hover {
		color: #777;
	}
`;
