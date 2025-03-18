//1 load authenticated user
//2 spinner
//3 if no user redirect to login
//4 if user render app

import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const { isLoading, isAuthenticated } = useUser();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		[isAuthenticated, navigate, isLoading]
	);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
}

export default ProtectedRoute;
