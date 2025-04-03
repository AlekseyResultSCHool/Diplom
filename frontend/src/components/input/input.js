import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
    return <input className={className}  {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
    width: ${({ width = '100%' }) => width};
    height: 30px;
    font-size: 18px;
`;