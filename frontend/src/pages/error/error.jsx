import styled from 'styled-components';

const ErrorContainer = ({ className }) => {

	return (
		<div className={className}>
			<h2>Ошибка. Такая страница не существует</h2>
		</div>
	);
};

export const Error = styled(ErrorContainer)`
	text-align: center;
	margin: auto;
`;
