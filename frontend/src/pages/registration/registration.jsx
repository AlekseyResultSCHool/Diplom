import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import { request } from '../../utils'; 
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetForm } from '../../hooks';
import { selectUserRole } from '../../selectors';
import { setUser } from '../../action';
import { Input, Button } from '../../components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w+#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(20, 'Неверно заполнен пароль. Максимум 20 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/catalog" />;
	}

	return (
		<div className={className}>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Повтор пароля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<div className="error-message">{errorMessage && errorMessage}</div>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 60px 0;

	& > form {
		display: flex;
		flex-direction: column;
		width: 400px;
		margin: 40px 0;
	}

	input {
		margin: 0px 0px 5px;
	}

	& a {
		font-size: 21px;
		text-align: center;
		color: #222;
		transition: opacity 500ms ease;
	}

	& a:hover {
		opacity: 0.5;
	}

	button {
		margin: 0 0 30px;
		transition: opacity 500ms ease;
	}

	& button:hover {
		opacity: 0.5;
	}

	.error-message {
		width: 406px;
		height: 50px;
		font-size: 18px;
		text-align: center;
		color: #E80000;
		margin: 0px 0px 5px;
	}
`;
