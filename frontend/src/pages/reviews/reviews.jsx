import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { Button, Input, Loader, Message } from '../../components';
import { ROLE } from '../../constants/role';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { MdEditCalendar } from 'react-icons/md';
import { FaRegMessage } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import { countReviews } from '../../action';
import { LuUser2 } from 'react-icons/lu';
import { request } from '../../utils';
import styled from 'styled-components';

const ReviewsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const [text, setText] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [answerInput, setAnswerInput] = useState('');
	const [answer, setAnswer] = useState(false);
	const [flag, setFlag] = useState(false);
	const [loader, setLoader] = useState(true);
	const roleId = useSelector(selectUserRole);
	const navigate = useNavigate();

	setTimeout(() => setLoader(false), 1000);

	useLayoutEffect(() => {
		request('/reviews', 'GET').then((responce) => {			
				setReviews(responce.data);
				setFlag(true);			
		});
		dispatch(countReviews(reviews.length));
	}, [flag, answer, dispatch, reviews.length]);

	const addReviews = () => {
		if (roleId === ROLE.GUEST) {
			setText('чтобы оставить свой отзыв пройдите авторизацию');
		} else {
			navigate('/newReviews');
		}
	};

	setTimeout(() => setText(null), 7000);

	const clickAnswer = (id) => {
		setAnswer(!answer);
	};

	const clickDeleteReviews = (id) => {
		request(`/reviews/${id}`, 'DELETE');
		setFlag(!flag);
	};

	const Answer = (id) => {
		request(`/reviews/${id}`, 'PATCH', { id: id, comments: answerInput });
		setAnswer(!answer);
		setFlag(!flag);
	};

	return (
		<div className={className}>
			{loader ? (
				<Loader margin="370px 500px" />
			) : (
				<>
					{text ? (
						<Message text={text} />
					) : (
						<>
							<h1>Страница с отзывами</h1>
							<div className="container">
								<div className="add-reviews">
									<Button width="180px" onClick={addReviews}>
										добавить отзыв
									</Button>
								</div>
								{reviews.map(
									({
										id,
										login,
										title,
										content,
										registed_at,
										comments,
									}) => (
										<div className="reviews" key={id}>
											<div className="reviews-data">
												<MdEditCalendar className="reviews-data-icon" />
												{registed_at
													.slice(0, -14)
													.replace(
														/^(\d+)-(\d+)-(\d+)$/,
														`$3.$2.$1`,
													)}
											</div>
											<div className="">
												{roleId === ROLE.ADMIN && (
													<MdDeleteOutline
														className="reviews-delete"
														title="удалить отзыв"
														onClick={() =>
															clickDeleteReviews(id)
														}
													/>
												)}
											</div>
											<div className="">
												{roleId === ROLE.ADMIN && (
													<FaRegMessage
														className="reviews-answer-message"
														title="ответить"
														onClick={() => clickAnswer(id)}
													/>
												)}
											</div>
											<div className="reviews-title">
												<LuUser2 className="reviews-title-icon" />
												<b>{login}</b>
												<div className="reviews-title-title">
													{title}
												</div>
											</div>
											<div className="reviews-content">
												<i>{content}</i>
											</div>
											{answer && (
												<>
													<div className="input-answer">
														<Input
															onChange={(event) =>
																setAnswerInput(
																	event.target.value,
																)
															}
														/>
													</div>

													<Button
														className="add-answer"
														width="40px"
														onClick={() => Answer(id)}
													>
														Ok
													</Button>
												</>
											)}

											{comments && (
												<div className="reviews-answer">
													<b>sports nutrition</b>
													<p>... {comments}</p>
												</div>
											)}
										</div>
									),
								)}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export const Reviews = styled(ReviewsContainer)`
	width: 1000px;
	margin: 40px auto;
	font-size: 20px;

	.input-answer {
		position: absolute;
		width: 450px;
		margin: -39px 435px;
		font-size: 20px;
	}

	.add-answer {
		position: absolute;
		right: 290px;
		margin: -37px 0px;
	}

	h1 {
		text-align: center;
		margin: 0px auto;
	}

	.container {
		margin: auto;
		width: 1000px;
		min-height: 550px;
		margin-top: 80px;
		margin-bottom: 160px;
	}

	.reviews {
		border: 1px solid #000;
		margin: 70px 20px;
		background-color: #f0f0f0;
		border-radius: 20px;
	}

	.reviews-title {
		margin: 10px 10px;
	}

	.reviews-title-title {
		margin: 10px 10px;
	}

	.reviews-title-icon {
		margin: 5px 7px -4px;
		font-size: 20px;
	}

	.reviews-data {
		float: right;
		margin: 10px 10px;
	}

	.reviews-data-icon {
		font-size: 20px;
		margin: -3px 7px;
	}

	.reviews-content {
		overflow-wrap: break-word;
		margin: 10px 10px;
		color: #808080;
	}

	.reviews-answer {
		float: right;
		width: 600px;
		height: 30px;
		margin: 10px 5px 10px 10px;
		flex-direction: column;
		background-color: #f0f0f0;
		border-radius: 20px;
		padding: 10px;
	}

	.reviews-answer p {
		float: right;
		margin: 0px 10px;
		color: #808080;
	}

	.reviews-answer-message {
		float: right;
		margin: 15px -180px;
		cursor: pointer;
		transition: transform 500ms ease;
	}

	.reviews-answer-message:hover {
		transform: scale(1.2) translate(-3px);
	}

	.reviews-delete {
		float: right;
		font-size: 20px;
		margin: 72px -185px;
		cursor: pointer;
		width: 30px;
		height: 30px;
		transition: transform 500ms ease;
	}

	.reviews-delete:hover {
		transform: scale(1.2) translate(-3px);
	}

	.add-reviews button {
		float: right;
		margin: -50px 18px;
	}
`;
