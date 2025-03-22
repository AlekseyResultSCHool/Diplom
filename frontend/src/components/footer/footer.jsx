import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>sportsnutrition@developer.ru</div>
			<div></div>Все права защещины &#169;
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	align-items: center;
	width: 1420px;
	height: 7px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0px 2px 17px #000000;
	font-weight: 300;
`;
