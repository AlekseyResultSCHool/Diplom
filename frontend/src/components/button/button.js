import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
    return (
        <button className={className}  {...props} >{children}</button>
    );
}

export const Button = styled(ButtonContainer)`
    width: ${({ width = '100%' }) => width};
    height: 30px;
    font-size: 18px;
    cursor: pointer;
    transition: opacity 500ms ease;
    
	&:hover {
		opacity: 0.5;
	}
`;

