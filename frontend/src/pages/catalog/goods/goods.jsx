//import img from '../../../images/fon.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOnGoodsOpen, basketOpen, paramsId, setOnGoods } from '../../../action';
import { Loader } from '../../../components';
import { selectFlag, selectSearchPhraseText, selectUserRole } from '../../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../../constants';
import { request } from '../../../utils';

const GoodsContainer = ({ className }) => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const flag = useSelector(selectFlag);
	const searchPhraseText = useSelector(selectSearchPhraseText);
	const [catalog, setCatalog] = useState([]);
	const [goods, setGoods] = useState([]);
	const [sort, setSort] = useState(true);
	const [goodsTitle, setGoodsTitle] = useState('');
	const [loader, setLoader] = useState(true);

	setTimeout(() => setLoader(false), 1000);

	useEffect(() => {
		Promise.all([
			request('/catalogs', 'GET'),
			request(`/catalogs/${params.id}`, 'GET'),
		]).then(([catalogRes, goodsRes]) => {
			setCatalog(catalogRes.data);
			setGoods(goodsRes.data);
			setGoodsTitle(goodsRes.title.title);
		});
	}, [params.id, searchPhraseText, flag]);

	const Click = (id) => {
		navigate(`/catalog/${id}`);
		dispatch(basketOpen(false));
		setLoader(true);
	};
	
	const onClick = (id) => {
		goods.forEach((element) => {
			if (element.id === id) {
				dispatch(setOnGoods(element));
			}
		});
		dispatch(paramsId(params.id));
		navigate(`/catalog/${params.id}/${id}`);
	};

	const onClickAdd = () => {
		dispatch(addOnGoodsOpen(true));
		navigate(`/catalog/${params.id}/${params.id}`);
	};

	const onClickSort = () => {
		setSort(!sort);
	};

	if (sort === false) {
		goods.sort(function (a, b) {
			return a.price - b.price;
		});
	}

	if (sort === true) {
		goods.sort(function (a, b) {
			return b.price - a.price;
		});
	}

	return (
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
					<div className="goods-catalog">
						<div className="goods-text">
							<h2>{goodsTitle}</h2>
							<div className="sort">
								{roleId === ROLE.ADMIN && (
									<button onClick={onClickAdd}>Добавить</button>
								)}
								<button onClick={onClickSort}>Сортировать</button>
							</div>
						</div>
						{goods.map(({ id, title, desc, price, imageUrl }) => (
							<div className="goods" key={id}>
								<img src={imageUrl} alt="" onClick={() => onClick(id)} />
								<h3>{title}</h3>
								<p>{desc}</p>
								<b>{price} руб.</b>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export const Goods = styled(GoodsContainer)`
	display: flex;
	flex-wrap: flex;
	justify-content: space-between;
	margin: 50px 20px;

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

	.goods-table img {
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

	.goods-text {
		width: 1000px;
		height: 40px;
		text-align: center;
		line-height: 0;
	}

	.sort {
		margin: 5px 15px;
		float: right;
	}

	.sort button {
		margin: 5px;
		font-size: 15px;
	}

	.goods-catalog {
		display: flex;
		width: 1000px;
		flex-wrap: wrap;
	}

	.goods {
		border: 1px solid #000;
		width: 300px;
		height: 310px;
		margin: 40px 15px 30px 15px;
		background: #f5f5f5;
		position: relative;
		padding-bottom: 20px;
	}

	.goods img {
		margin: 10px 0px 0px 13px;
		width: 270px;
		height: 190px;
		cursor: pointer;
	}

	.goods h3,
	.goods p,
	.goods b {
		margin: 8px 10px;
		color: #333;
	}

	.goods b {
		color: #5fa36a;
	}
`;
