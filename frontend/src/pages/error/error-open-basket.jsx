import styled from 'styled-components';

const ErrorBasketContainer = ({ className }) => {

	return (
		<div className={className}>
			<h2>для совершения покупок пройдите авторизацию</h2>
		</div>
	);
};

export const ErrorBasket = styled(ErrorBasketContainer)`
	text-align: center;
	margin: auto;
	font-size: 20px;
`;
