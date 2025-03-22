import styled from 'styled-components';

const AboutContainer = ({ className }) => {

    return (
        <div className={className}>
            <h1>О нас</h1>
            <h3>Интернет магазин <b>sports nutrition</b> предлагает все виды спортивного питания, БАДЫ, витамины, и все для занятий спорта и активного отдыха.</h3>
            <h3>На сайте представлен большой выбор товаров, как российских так и импортных производителей.</h3>
        </div>
    );
};

export const About = styled(AboutContainer)`
    padding: 10px;
	margin: 40px 40px;

    h3 {
        font-weight: 500;
    }
`;