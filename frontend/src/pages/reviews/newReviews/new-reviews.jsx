import styled from 'styled-components';
import { BsSendArrowUp } from 'react-icons/bs';
import { useState } from 'react';
import { selectUserLogin } from '../../../selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components';
import { request } from '../../../utils';

const NewReviewsContainer = ({ className, setIsOpenNewReviews }) => {
	const [messageTextArea, setMessageTextArea] = useState('');
	const [messageInput, setMessageInput] = useState('');
	const [title, setTitle] = useState('Заголовок...');
	const [text, setText] = useState('Отзыв...');
	const userLogin = useSelector(selectUserLogin);
	const navigate = useNavigate();

	const sendMessage = () => {
		if (messageInput === '') {
			setTitle('Введите заголовок вашего отзыва');
		}		
		else if (messageTextArea === '') {
			setText('Введите текс вашего отзыва')
		}
		else {
			request('/reviews', 'POST', { title: messageInput, content: messageTextArea, login: userLogin, comments: '' });
		navigate('/reviews');
		}		
	};

	return (
		<div className={className}>
			<div className="container">
				<label>Добавить отзыв:</label>
				
					<div>
						<Input
							className="newReviews-title"
							width="640px"
							type="text"
							placeholder={title}
							onChange={(event) => setMessageInput(event.target.value)}
						/>
					</div>
					<div>
						<textarea
							className="newReviews-text"
							type="text"
							placeholder={text}
							onChange={(event) => setMessageTextArea(event.target.value)}
						></textarea>
						<BsSendArrowUp
							className="newReviews-send-message"
							title="Отправить сообщение"
							
							onClick={sendMessage}
						/>
					</div>
				
			</div>
		</div>
	);
};

export const NewReviews = styled(NewReviewsContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 80px auto;

	label {
		float: left;
		font-size: 22px;
		font-weight: 500;
	}

	.container {
		width: 700px;
		padding: 10px;
	}

	.newReviews-title {
		float: left;
		margin: 20px 0;
	}

	.newReviews-text {
		float: left;
		width: 640px;
		height: 240px;
		font-size: 18px;
		font-size: 18px;
	}

	.newReviews-send-message {
		float: right;
		font-size: 30px;
		font-weight: 200;
		cursor: pointer;
		transition: transform 500ms ease;
	}

	.newReviews-send-message:hover {
		transform: scale(1.2) translate(-3px);
	}
`;
