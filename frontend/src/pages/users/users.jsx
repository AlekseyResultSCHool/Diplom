import { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { LuUser2 } from 'react-icons/lu';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { request } from '../../utils';

const UsersContainer = ({ className }) => {

	const [users, setUsers] = useState([]);
	const [flagDeleteUser, setFlagDeleteUser] = useState(false);

	useEffect(() => {
		request('/users', 'GET').then((responce) => {
			setUsers(responce.data);
		});
	}, [flagDeleteUser]);

	const clickDeleteUser = (id) => {
		request(`/users/${id}`, 'DELETE');
		setFlagDeleteUser(!flagDeleteUser);
	};
	
	return (
		<div className={className}>
			<h1>Список пользователей</h1>
			<div className="title">
				<b>Имя</b>
				<b>Дата регистрации</b>
				<b>Роль</b>
			</div>
			{users.map(({ id, login, roleId, registed_at }) => (
				<div className="users" key={id} >
					<div className="users-login">
						<LuUser2 className="users-icon" />
						<b>{login}</b>
					</div>
					<p className="users-data">{registed_at
													.slice(0, -14)
													.replace(
														/^(\d+)-(\d+)-(\d+)$/,
														`$3.$2.$1`,
													)}</p>
					<p className="users-role">{roleId === 0 ? ('Администратор') : ('Пользователь')}</p>

					{roleId !== ROLE.ADMIN && (
						<MdDeleteOutline
							className="users-delete"
							title="удалить пользователя"
							onClick={() => clickDeleteUser(id)}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export const Users = styled(UsersContainer)`
	text-align: center;
	margin: 80px auto;
	width: 1000px;
	height: 800px;

	.title {
		display: flex;
		width: 640px;
		height: 30px;
		margin: 90px 190px;
		font-size: 22px;
		justify-content: space-between;
	}

	.users {
		display: flex;
		width: 700px;
		height: 30px;
		margin: 20px auto;
		font-size: 19px;
		justify-content: space-between;
	}

	.users-icon {
		font-size: 22px;
		float: left;
		margin: 3px 10px 0px 10px;
	}

	.users-login {
		width: 100px;
		float: left;
		margin: 0px 5px;
	}

	.users-data {
		margin: 0px 5px;
		width: 150px;
	}

	.users-role {
		float: right;
		margin: 0px -59px 0 0px;
		width: 170px;
	}

	.users-delete {
		margin: 3px -91px;
		font-size: 25px;
		cursor: pointer;
		transition: transform 500ms ease;
	}

	.users-delete:hover {
		transform: scale(1.2) translate(-3px);
	}
`;
