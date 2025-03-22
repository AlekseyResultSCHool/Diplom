import styled from 'styled-components';

const MessageContainer = ({ className, text }) => {
	return (
		<div>
			{text && (
				<div className={className}>
					<h2>{text}</h2>
				</div>
			)}
		</div>
	);
};

export const Message = styled(MessageContainer)`
	text-align: center;
	margin: 40% auto;
	font-size: 20px;
`;
