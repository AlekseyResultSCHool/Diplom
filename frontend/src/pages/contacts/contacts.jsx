import styled from 'styled-components';

const ContactsContainer = ({ className }) => {

    return (
        <div className={className}>
            <h1>Контакты</h1>
            <h3>Единый номер (по заказам, консультации, наличие товаров и любая другая информация):</h3>
            <h3>+7(999)999-99-99</h3>
            <h3>Email: sportsnutrition@developer.ru</h3>
        </div>
    );
};

export const Contacts = styled(ContactsContainer)`
    padding: 10px;
	margin: 40px 40px;

    h3 {
        font-weight: 500;
    }
`;