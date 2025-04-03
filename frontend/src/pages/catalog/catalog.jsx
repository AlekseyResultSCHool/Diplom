import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchPhraseText } from '../../selectors';
import { searchTextPhrase } from '../../action';
import { request } from '../../utils';
import styled from 'styled-components';

const CatalogContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [catalog, setCatalog] = useState([]);
	const [loader, setLoader] = useState(true);
	const searchPhraseText = useSelector(selectSearchPhraseText);

	setTimeout(() => setLoader(false), 1000);

	useEffect(() => {
		request(`/catalogs?search=${searchPhraseText}`, 'GET').then((responce) => {
			setCatalog(responce.data);
		});
	}, [searchPhraseText]);

	const clickGoods = (id) => {
		navigate(id);
		dispatch(searchTextPhrase(''));
	};

	return (
		<>
			<div className={className}>
				{loader ? (
					<Loader margin="370px 700px" />
				) : (
					<>
						{catalog.map(({ id, title, imageUrl }) => (
							<div
								className="catalog"
								key={id}
								onClick={() => clickGoods(id)}
							>
								<img
									src={imageUrl}
									alt=""
								/>
								<b>{title}</b>
							</div>
						))}
					</>
				)}
			</div>
		</>
	);
};

export const Catalog = styled(CatalogContainer)`
	display: flex;
	width: 1460px;
	flex-wrap: wrap;
	margin: 50px 20px;

	.catalog {
		background-color: #dcdcdc;
		margin-bottom: 50px;
		border: 1px solid #fff;
		width: 20%;
		height: 350px;
		border-radius: 10px 10px 0 0;
		overflow: hidden;
		cursor: pointer;
		margin: 15px 35px;
	}

	.catalog img {
		width: 100%;
		height: 290px;
		border-radius: 10px 10px 0 0;
		transition: transform 500ms ease;
	}

	.catalog img:hover {
		transform: scale(1.05);
	}

	b {
		display: flex;
		font-size: 20px;
		margin: 15px;
		text-decoration: none;
		color: #333;
		vertical-align: middle;
		justify-content: center;
	}
`;
