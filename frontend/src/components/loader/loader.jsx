import styled from 'styled-components';

const LoaderContainer = ({ className, ...props }) => {

	return (
		<div className={className} {...props}>
			<div className="loader">
				<div className="loader_inner"></div>
			</div>
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	.loader {
		height: 100px;
		width: 100px;
	}

	.loader .loader_inner {
		margin: ${({ margin = '100px'}) => margin};
		animation: animate 1.5s linear infinite;
		clip: rect(0, 80px, 80px, 40px);
		height: 80px;
		width: 80px;
	}

	@keyframes animate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(220deg);
		}
	}

	.loader .loader_inner:after {
		animation: animate2 1.5s ease-in-out infinite;
		clip: rect(0, 80px, 80px, 40px);
		content: '';
		border-radius: 50%;
		height: 80px;
		width: 80px;
		position: absolute;
	}
        
	@keyframes animate2 {
		0% {
			box-shadow: inset #b3dfd8 0 0 0 17px;
			transform: rotate(-140deg);
		}
		50% {
			box-shadow: inset #b3dfd8 0 0 0 2px;
		}
		100% {
			box-shadow: inset #b3dfd8 0 0 0 17px;
			transform: rotate(140deg);
		}
	}
`;
